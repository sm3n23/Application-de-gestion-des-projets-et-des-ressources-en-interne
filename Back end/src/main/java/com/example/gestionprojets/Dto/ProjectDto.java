package com.example.gestionprojets.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Setter@Getter
public class ProjectDto {

    private String name;

    private LocalDate startDate;
    private LocalDate finishDate;

    private Set<Long> employeesIds;
}
