package com.example.gestionprojets.Controller;

import com.example.gestionprojets.Dto.ProjectDto;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping()
public class ProjectController {

    private ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService){
        this.projectService= projectService;
    }


    @GetMapping("/projects")
    //@PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<List<Project>> getProjects(){
        List<Project> projects = projectService.findProjects();
        return ResponseEntity.ok(projects);
    }


    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody ProjectDto projectDto){
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
