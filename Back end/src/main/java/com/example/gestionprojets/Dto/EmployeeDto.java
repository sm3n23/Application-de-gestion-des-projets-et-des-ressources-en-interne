package com.example.gestionprojets.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter@Setter
public class EmployeeDto {

    private String name;

    private Long projectId;
    private String role;
    private Set<Long> tachesIds;

}
