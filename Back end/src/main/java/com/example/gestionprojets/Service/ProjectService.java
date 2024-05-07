package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.ProjectDto;
import com.example.gestionprojets.Entity.Project;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


public interface ProjectService {
    List<Project> findProjects();

    Project findProjectById(Long id);

    Project createProject(ProjectDto projectDto);

    Project updateProject(Long id, ProjectDto projectDto);

    void deleteProject(Long id);

    List<Project> searchProjects(String name, Date startDate, Date finishDate);
    List<Project> findFinishedProjectsBetween(Date startPeriod, Date endPeriod);
}
