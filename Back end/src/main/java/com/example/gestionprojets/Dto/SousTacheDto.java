package com.example.gestionprojets.Dto;

import lombok.Data;

import java.util.Set;

@Data
public class SousTacheDto {


    private String name;

    private Set<Long> employeesIds;

    private Long tacheId;

    private Long projectId;
}
