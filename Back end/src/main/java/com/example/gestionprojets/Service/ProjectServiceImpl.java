package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.*;
import com.example.gestionprojets.Entity.*;
import com.example.gestionprojets.Repositories.*;
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



        if (projectDto.getTachesIds() != null) {
            List<Tache> taches = tacheRepository.findAllById(projectDto.getTachesIds());
            project.setTaches(new HashSet<>(taches));
        }

        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Long projectId, ProjectDto projectDto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found"));

        project.setName(projectDto.getName());
        project.setStatus(projectDto.getStatus());
        project.setStartDate(projectDto.getStartDate());
        project.setFinishDate(projectDto.getFinishDate());
        project.setBudget(projectDto.getBudget());
        project.setDescription(projectDto.getDescription());

        // Clear existing assignments
        if (project.getProjectAssignments() != null) {
            project.getProjectAssignments().clear();
        } else {
            project.setProjectAssignments(new HashSet<>());
        }

        // Add new assignments
        for (EmployeeAssignmentDto assignmentDto : projectDto.getEmployeeAssignments()) {
            Employee employee = employeeRepository.findById(assignmentDto.getEmployeeId())
                    .orElseThrow(() -> new NotFoundException("Employee not found"));
            ProjectAssignment assignment = new ProjectAssignment();
            assignment.setId(new ProjectAssignmentId(employee.getId(), project.getId()));
            assignment.setEmployee(employee);
            assignment.setProject(project);
            assignment.setAssignmentType(ProjectAssignment.AssignmentType.valueOf(assignmentDto.getAssignmentType()));
            project.getProjectAssignments().add(assignment);
        }

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








    @Override
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Project not found"));



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
