package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.ProjectDto;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Repositories.EmployeeRepository;
import com.example.gestionprojets.Repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;
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
    public Project createProject(ProjectDto projectDto) {
        Project project = new Project();
        project.setName(projectDto.getName());

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
        return projectRepository.save(project);
    }

    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);

    }
}
