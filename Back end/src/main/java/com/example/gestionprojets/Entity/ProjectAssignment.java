package com.example.gestionprojets.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table
@Setter
@Getter

public class ProjectAssignment {

    @EmbeddedId
    private ProjectAssignmentId id;

    @ManyToOne
    @MapsId("employeeId")
    @JoinColumn(name = "employee_id")
    @JsonIgnoreProperties("projectAssignments")
    private Employee employee;

    @ManyToOne
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    @JsonIgnoreProperties("projectAssignments")
    private Project project;

    @Enumerated(EnumType.STRING)
    private AssignmentType assignmentType;

    public void setProjectId(Long projectId) {
    }

    public void setEmployeeId(Long employeeId) {
    }

    public void setAssignmentType(Employee.AssignmentType assignmentType) {
    }

    public void setAssignmentType(AssignmentType assignmentType) {
    }

    public enum AssignmentType {
        FULL_TIME,
        PART_TIME
    }

    
}