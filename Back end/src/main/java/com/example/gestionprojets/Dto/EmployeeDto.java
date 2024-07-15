package com.example.gestionprojets.Dto;

import com.example.gestionprojets.Entity.Role;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class EmployeeDto {
    private String name;
    private String username;
    private Role role;
    private String title;
    private List<String> skills;
    private String description;
    private LocalDate birthDate;
    private int experience;
    private int phoneNumber;
    private String email;
    private String location;
    private String picture;

    private boolean isFullTime;
    private int absences;
    private Set<Long> projectIds;
    private Set<Long> tachesIds;
}
