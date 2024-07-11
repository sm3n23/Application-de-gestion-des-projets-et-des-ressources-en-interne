package com.example.gestionprojets.Dto;

import lombok.Data;

@Data
public class NotificationCreateDto {
    private String message;
    private Long employeeId;

}