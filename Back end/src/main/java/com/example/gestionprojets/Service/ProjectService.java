package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.ProjectDto;
import com.example.gestionprojets.Entity.Project;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ProjectService {
    List<Project> findProjects();

    Project createProject(ProjectDto projectDto);

    Project updateProject(Long id, ProjectDto projectDto);

    void deleteProject(Long id);
}
