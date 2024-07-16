package com.example.gestionprojets.Dto;

import lombok.Data;

@Data
public class EmployeeProjectStatusDto {
    private Long employeeId;
    private String employeeName;
    private String employeePicture;
    private String employeeEmail;
    private String status;

    // Add a constructor with arguments
    public EmployeeProjectStatusDto(Long employeeId, String employeeName, String employeePicture, String employeeEmail, String status) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.employeePicture = employeePicture;
        this.employeeEmail = employeeEmail;
        this.status = status;
    }

    // Default constructor
    public EmployeeProjectStatusDto() {}
}
