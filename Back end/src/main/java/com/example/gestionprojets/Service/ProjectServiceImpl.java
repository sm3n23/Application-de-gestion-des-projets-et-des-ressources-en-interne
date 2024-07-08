package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.ProjectDto;
import com.example.gestionprojets.Dto.TacheDto;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Entity.Tache;
import com.example.gestionprojets.Repositories.EmployeeRepository;
import com.example.gestionprojets.Repositories.ProjectRepository;
import com.example.gestionprojets.Repositories.TacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
