package com.example.gestionprojets.Dto;

import lombok.Data;

import java.util.Set;

@Data
public class TacheDto {


    private String name;

    private Set<Long> employeesIds;

    private Long projectId;
}
