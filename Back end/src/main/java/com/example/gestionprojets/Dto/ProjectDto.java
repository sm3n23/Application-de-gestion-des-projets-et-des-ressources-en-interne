package com.example.gestionprojets.Dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
public class ProjectDto {


    private String name;
    private String status;
    private LocalDate startDate;
    private LocalDate finishDate;
    private int budget;
    private String description;

    private Map<Long, Boolean> employeeFullTimeStatus;
    private Set<Long> employeesIds; 
    private Set<Long> tachesIds;

    private String createdBy;
}
