package com.example.gestionprojets.Repositories;

import com.example.gestionprojets.Entity.ProjectAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectAssignmentRepository extends JpaRepository<ProjectAssignment, Long> {
    List<ProjectAssignment> findByProjectId(Long projectId);
    void deleteByProjectIdAndEmployeeId(Long projectId, Long employeeId);
}
