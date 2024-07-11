package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.ProjectDto;
import com.example.gestionprojets.Entity.BudgetConsumption;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;


public interface ProjectService {
    List<Project> findProjects();

    Project findProjectById(Long id);

    List<Project> getProjectsByCreator(Employee employee);
    Project createProject(ProjectDto projectDto);

    Project updateProject(Long id, ProjectDto projectDto);

    Project addBudgetConsumption(Long projectId, BudgetConsumption budgetConsumption);

    /*Employee assignEmployeeToProject(Long employeeId, Long projectId, boolean isFullTime);*/

    void deleteProject(Long id);

    List<Project> searchProjects(String name, Date startDate, Date finishDate);
    List<Project> findFinishedProjectsBetween(Date startPeriod, Date endPeriod);
}
