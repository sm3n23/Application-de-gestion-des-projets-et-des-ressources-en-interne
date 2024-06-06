package com.example.gestionprojets.Entity;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
public class Employee {
    @Id
    @Column(name = "username", updatable = false, nullable = false)
    private String username;

    private String name;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String title;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> skills;
    private String description;
    private LocalDate birthDate;
    private int experience;
    private int phoneNumber;
    private String email;
    private String location;
    private String picture;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "employee_projects",
            joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private Set<Project> projects = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Tache> taches;
}