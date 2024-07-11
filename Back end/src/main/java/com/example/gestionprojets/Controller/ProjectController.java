package com.example.gestionprojets.Controller;

import com.example.gestionprojets.Dto.BudgetConsumptionDto;
import com.example.gestionprojets.Dto.EmployeeProjectDto;
import com.example.gestionprojets.Dto.ProjectDto;
import com.example.gestionprojets.Entity.BudgetConsumption;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Service.EmployeeService;
import com.example.gestionprojets.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping()
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    public ProjectController(ProjectService projectService){
        this.projectService= projectService;
    }


    @GetMapping("/allprojects")
    //@PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<List<Project>> getProjects(){
        List<Project> projects = projectService.findProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id){
        Project project = projectService.findProjectById(id);
        if(project!=null){
            return ResponseEntity.ok(project);
        }
        else {
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
        return ResponseEntity.ok(projects);
    }

    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody ProjectDto projectDto, @RequestParam String username){
        Employee employee = employeeService.findbyUsername(username);
        projectDto.setCreatedBy(username);
        Project createdProject = projectService.createProject(projectDto);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id,@RequestBody ProjectDto projectDto){
        Project updatedProject = projectService.updateProject(id, projectDto);
        if(updatedProject!= null){
            return ResponseEntity.ok(updatedProject);

        }else{

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
    public ResponseEntity<String> deleteProject(@PathVariable Long id){
        projectService.deleteProject(id);

        return ResponseEntity.ok("Project deleted");
    }

    @GetMapping("/projects/search")
    public List<Project> searchProjects(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date finishDate) {
        return projectService.searchProjects(name, startDate, finishDate);
    }

    @GetMapping("/projects/finished")
    public List<Project> findFinishedProjectsBetween(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startPeriod,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endPeriod) {
        return projectService.findFinishedProjectsBetween(startPeriod, endPeriod);
    }
}
