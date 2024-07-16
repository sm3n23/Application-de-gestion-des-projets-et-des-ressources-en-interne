package com.example.gestionprojets.Dto;

import com.example.gestionprojets.Entity.Employee;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data

public class ProjectAssignmentDto {
    private Long employeeId;
    private Long projectId;
    private Employee.AssignmentType assignmentType;

    // getters and setters
}
