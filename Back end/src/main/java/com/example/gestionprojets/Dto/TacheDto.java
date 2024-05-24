package com.example.gestionprojets.Dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class TacheDto {

    private Long id;

    private String name;
    private String description;
    private LocalDate startDate;

    private LocalDate finishDate;
    private int advancement;
    private String status;

    private Set<Long> employeesIds;

    private Long projectId;
}
