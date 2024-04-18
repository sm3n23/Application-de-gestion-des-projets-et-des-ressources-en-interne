package com.example.gestionprojets.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import java.time.LocalDate;
import java.util.*;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Table
@Setter@Getter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDate startDate;

    private LocalDate finishDate;

    @OneToMany(mappedBy = "project")
    private Set<Employee> employees = new HashSet<>();

    @OneToMany(mappedBy = "project")
    private Set<Tache> taches = new HashSet<>();

    /*@OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RisqueProject> risqueProjects = new HashSet<>();


    @OneToMany
    private Set<Rapport> rapports = new HashSet<>();*/

}
