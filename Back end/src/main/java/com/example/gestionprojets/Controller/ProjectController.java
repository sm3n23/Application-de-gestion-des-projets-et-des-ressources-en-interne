package com.example.gestionprojets.Controller;

import com.example.gestionprojets.Dto.ProjectDto;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping("/project")
    public ResponseEntity<Project> createProject(@RequestBody ProjectDto projectDto){
        Project createdProject = projectService.createProject(projectDto);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PutMapping("/project/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id,@RequestBody ProjectDto projectDto){
        Project updatedProject = projectService.updateProject(id, projectDto);
        if(updatedProject!= null){
            return ResponseEntity.ok(updatedProject);

        }else{

            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/project/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id){
        projectService.deleteProject(id);

        return ResponseEntity.ok("Project deleted");
    }
}
