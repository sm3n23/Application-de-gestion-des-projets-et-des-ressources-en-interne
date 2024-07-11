package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.EmployeeProjectDto;
import com.example.gestionprojets.Dto.ProjectDto;
import com.example.gestionprojets.Dto.TacheDto;
import com.example.gestionprojets.Entity.BudgetConsumption;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Entity.Tache;
import com.example.gestionprojets.Repositories.BudgetConsumptionRepository;
import com.example.gestionprojets.Repositories.EmployeeRepository;
import com.example.gestionprojets.Repositories.ProjectRepository;
import com.example.gestionprojets.Repositories.TacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TacheRepository tacheRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private BudgetConsumptionRepository budgetConsumptionRepository;

    /*@Autowired
    private ProjectEmployeeRepository projectEmployeeRepository;*/

    @Override
    public List<Project> findProjects() {
        return projectRepository.findAllWithAssociations();
    }

    @Override
    public Project findProjectById(Long id) {
        return projectRepository.findByIdWithAssociations(id);
    }

    @Override
    public List<Project> getProjectsByCreator(Employee creator) {
        return projectRepository.findByCreatedBy(creator.getUsername());
    }

    @Override
    public Project createProject(ProjectDto projectDto) {
        Project project = new Project();
        project.setName(projectDto.getName());
        project.setStatus(projectDto.getStatus());
        project.setStartDate(projectDto.getStartDate());
        project.setFinishDate(projectDto.getFinishDate());
        project.setBudget(projectDto.getBudget());
        project.setDescription(projectDto.getDescription());
        if (projectDto.getCreatedBy() != null) {
            project.setCreatedBy(projectDto.getCreatedBy());
        }

        if (projectDto.getEmployeesIds() != null) {
            List<Employee> employees = employeeRepository.findAllById(projectDto.getEmployeesIds());
            project.setEmployees(new HashSet<>(employees));
        }

        if (projectDto.getTachesIds() != null) {
            List<Tache> taches = tacheRepository.findAllById(projectDto.getTachesIds());
            project.setTaches(new HashSet<>(taches));
        }

        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Long projectId, ProjectDto projectDto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("project not found"));

        project.setName(projectDto.getName());
        project.setStatus(projectDto.getStatus());
        project.setStartDate(projectDto.getStartDate());
        project.setFinishDate(projectDto.getFinishDate());
        project.setBudget(projectDto.getBudget());
        project.setDescription(projectDto.getDescription());

        Set<Employee> employees = new HashSet<>(employeeRepository.findAllById(projectDto.getEmployeesIds()));
        project.setEmployees(employees);

        return projectRepository.save(project);
    }

    @Override
    public Project addBudgetConsumption(Long projectId, BudgetConsumption budgetConsumption) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found"));

        project.setConsumedBudget(project.getConsumedBudget() + budgetConsumption.getAmount());
        budgetConsumption.setProject(project);
        budgetConsumption.setDate(LocalDate.now());

        budgetConsumptionRepository.save(budgetConsumption);

        return projectRepository.save(project);
    }

    /*@Override
    public Project updateProject(Long projectId, ProjectDto projectDto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found"));

        project.setName(projectDto.getName());
        project.setStatus(projectDto.getStatus());
        project.setStartDate(projectDto.getStartDate());
        project.setFinishDate(projectDto.getFinishDate());
        project.setBudget(projectDto.getBudget());
        project.setDescription(projectDto.getDescription());

        Set<ProjectEmployee> projectEmployees = new HashSet<>();
        for (Long employeeId : projectDto.getEmployeesIds()) {
            Employee employee = employeeRepository.findById(employeeId)
                    .orElseThrow(() -> new NotFoundException("Employee not found"));

            boolean isFullTime = projectDto.getEmployeeFullTimeStatus().get(employeeId);

            // If the employee is set to be full-time on this project, make them part-time on any other project
            if (isFullTime) {
                for (ProjectEmployee pe : employee.getProjectEmployees()) {
                    if (pe.isFullTime()) {
                        pe.setFullTime(false);
                        projectEmployeeRepository.save(pe);
                    }
                }
            }

            ProjectEmployee projectEmployee = new ProjectEmployee(employee, project, isFullTime);
            projectEmployees.add(projectEmployee);
        }

        project.setProjectEmployees(projectEmployees);

        return projectRepository.save(project);
    }*/

    /*@Transactional
    public Employee assignEmployeeToProject(Long employeeId, Long projectId, boolean isFullTime) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Check if the employee is already assigned to the project
        for (ProjectEmployee pe : employee.getProjectEmployees()) {
            if (pe.getProject().getId().equals(projectId)) {
                throw new RuntimeException("Employee is already assigned to this project");
            }
        }

        // Ensure the employee can only have one full-time project
        if (isFullTime) {
            Set<ProjectEmployee> currentFullTimeProjects = employee.getProjectEmployees().stream()
                    .filter(ProjectEmployee::isFullTime)
                    .collect(Collectors.toSet());

            for (ProjectEmployee currentProjectEmployee : currentFullTimeProjects) {
                currentProjectEmployee.setFullTime(false);
                projectEmployeeRepository.save(currentProjectEmployee);
            }
        }

        // Assign the employee to the new project
        ProjectEmployee projectEmployee = new ProjectEmployee();
        projectEmployee.setEmployee(employee);
        projectEmployee.setProject(project);
        projectEmployee.setFullTime(isFullTime);

        employee.getProjectEmployees().add(projectEmployee);
        project.getProjectEmployees().add(projectEmployee);

        projectEmployeeRepository.save(projectEmployee);

        return employeeRepository.save(employee);
    }*/



    @Override
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Project not found"));

        // Disassociate employees from the project
        for (Employee employee : project.getEmployees()) {
            employee.getProjects().remove(project);
            employeeRepository.save(employee);
        }

        projectRepository.deleteById(id);
    }


    public List<Project> searchProjects(String name, Date startDate, Date finishDate) {
        List<Project> projects = new ArrayList<>();

        if (name != null) projects.addAll(projectRepository.findByNameContainingIgnoreCase(name));
        if (startDate != null) projects.addAll(projectRepository.findByStartDate(startDate));
        if (finishDate != null) projects.addAll(projectRepository.findByFinishDate(finishDate));

        // Remove duplicates if any exist when multiple params are used
        return projects.stream().distinct().collect(Collectors.toList());
    }

    public List<Project> findFinishedProjectsBetween(Date startPeriod, Date endPeriod) {
        return projectRepository.findByFinishDateBetween(startPeriod, endPeriod);
    }
}
