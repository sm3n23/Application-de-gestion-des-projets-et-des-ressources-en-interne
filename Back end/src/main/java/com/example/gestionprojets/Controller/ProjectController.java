package com.example.gestionprojets.Controller;

import com.example.gestionprojets.Dto.BudgetConsumptionDto;
import com.example.gestionprojets.Dto.ProjectAssignmentDto;
import com.example.gestionprojets.Dto.ProjectDto;
import com.example.gestionprojets.Entity.BudgetConsumption;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Entity.ProjectAssignment;
import com.example.gestionprojets.Service.EmployeeService;
import com.example.gestionprojets.Service.ProjectAssignmentService;
import com.example.gestionprojets.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping()
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ProjectAssignmentService projectAssignmentService;

    @Autowired
    public ProjectController(ProjectService projectService){
        this.projectService = projectService;
    }

    @GetMapping("/allprojects")
    //@PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<List<Project>> getProjects(){
        List<Project> projects = projectService.findProjects();
        for (Project project : projects) {
            List<ProjectAssignment> assignments = projectAssignmentService.findByProjectId(project.getId());
            project.setProjectAssignments((Set<ProjectAssignment>) assignments);
        }
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id){
        Project project = projectService.findProjectById(id);
        if (project != null) {
            List<ProjectAssignment> assignments = projectAssignmentService.findByProjectId(id);
            project.setProjectAssignments((Set<ProjectAssignment>) assignments);
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getMyProjects(@RequestParam String username) {
        Employee employee = employeeService.findbyUsername(username);
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        List<Project> projects = projectService.getProjectsByCreator(employee);
        for (Project project : projects) {
            List<ProjectAssignment> assignments = projectAssignmentService.findByProjectId(project.getId());
            project.setProjectAssignments((Set<ProjectAssignment>) assignments);
        }
        return ResponseEntity.ok(projects);
    }

    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody ProjectDto projectDto, @RequestParam String username) {
        Employee employee = employeeService.findbyUsername(username);
        projectDto.setCreatedBy(username);
        Project createdProject = projectService.createProject(projectDto);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDto) {
        Project updatedProject = projectService.updateProject(id, projectDto);
        if (updatedProject != null) {
            return ResponseEntity.ok(updatedProject);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("projects/{projectId}/budget-consumption")
    public Project addBudgetConsumption(@PathVariable Long projectId, @RequestBody BudgetConsumptionDto budgetConsumptionDto) {
        BudgetConsumption budgetConsumption = new BudgetConsumption();
        budgetConsumption.setAmount(budgetConsumptionDto.getAmount());
        budgetConsumption.setComment(budgetConsumptionDto.getComment());
        budgetConsumption.setDate(LocalDate.now());

        return projectService.addBudgetConsumption(projectId, budgetConsumption);
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted");
    }

    @PostMapping("/project-assignments")
    public ResponseEntity<ProjectAssignment> createProjectAssignment(@RequestBody ProjectAssignmentDto projectAssignmentDto) {
        ProjectAssignment projectAssignment = new ProjectAssignment();
        projectAssignment.setProjectId(projectAssignmentDto.getProjectId());
        projectAssignment.setEmployeeId(projectAssignmentDto.getEmployeeId());
        projectAssignment.setAssignmentType(projectAssignmentDto.getAssignmentType());
        ProjectAssignment createdAssignment = projectAssignmentService.createProjectAssignment(projectAssignment);
        return new ResponseEntity<>(createdAssignment, HttpStatus.CREATED);
    }

    @DeleteMapping("/project-assignments")
    public ResponseEntity<Void> deleteProjectAssignment(@RequestParam Long projectId, @RequestParam Long employeeId) {
        projectAssignmentService.deleteByProjectIdAndEmployeeId(projectId, employeeId);
        return ResponseEntity.ok().build();
    }
}
