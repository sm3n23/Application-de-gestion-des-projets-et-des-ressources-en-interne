package com.example.gestionprojets.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter@Getter
public class ProjectDto {

    private String name;



    private Set<Long> employeesIds;
}
