package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.ProjectDto;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Repositories.EmployeeRepository;
import com.example.gestionprojets.Repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    private EmployeeRepository employeeRepository;

    @Override
    public List<Project> findProjects() {
        List<Project> projects =  projectRepository.findAll();
        return projects;
    }

    @Override
    public Project findProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(()->new NotFoundException("project not found"));
        return project;
    }


    @Override
    public Project createProject(ProjectDto projectDto) {
        Project project = new Project();
        project.setName(projectDto.getName());
        project.setStatus(projectDto.getStatus());
        project.setStartDate(projectDto.getStartDate());
        project.setFinishDate(projectDto.getFinishDate());
        /*Set<Employee> employees = projectDto.getEmployeesIds().stream()
                .map(id -> employeeRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("Employee not found with id: " + id)))
                .collect(Collectors.toSet());

        project.setEmployees(employees);
        // Set the project reference in each employee
        employees.forEach(employee -> employee.setProject(project));*/

        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Long projectId, ProjectDto projectDto) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(()->new NotFoundException("project not found"));

        project.setName(project.getName());
        project.setStartDate(projectDto.getStartDate());
        project.setFinishDate(projectDto.getFinishDate());
        return projectRepository.save(project);
    }

    @Override
    public void deleteProject(Long id) {
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
