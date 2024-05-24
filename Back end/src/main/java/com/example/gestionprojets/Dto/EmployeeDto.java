package com.example.gestionprojets.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter@Setter
public class EmployeeDto {

    private String name;

    private String title;
    private List<String> skills;
    private String description;
    private LocalDate birthDate;
    private int experience;
    private int phoneNumber;
    private String email;
    private String location;

    private Long projectId;

    private Set<Long> tachesIds;

}
