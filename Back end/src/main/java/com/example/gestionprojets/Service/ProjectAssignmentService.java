package com.example.gestionprojets.Service;
import com.example.gestionprojets.Dto.ProjectAssignmentDto;
import com.example.gestionprojets.Entity.ProjectAssignment;
import com.example.gestionprojets.Repositories.ProjectAssignmentRepository;
import com.example.gestionprojets.Service.ProjectAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectAssignmentService {
    @Autowired
    private ProjectAssignmentRepository projectAssignmentRepository;

    public List<ProjectAssignment> findByProjectId(Long projectId) {
        return projectAssignmentRepository.findByProjectId(projectId);
    }

    public ProjectAssignment createProjectAssignment(ProjectAssignment projectAssignment) {
        return projectAssignmentRepository.save(projectAssignment);
    }

    public void deleteByProjectIdAndEmployeeId(Long projectId, Long employeeId) {
        projectAssignmentRepository.deleteByProjectIdAndEmployeeId(projectId, employeeId);
    }
}
