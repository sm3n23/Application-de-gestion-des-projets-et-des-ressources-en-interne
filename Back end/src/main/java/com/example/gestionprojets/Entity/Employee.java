package com.example.gestionprojets.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    private int absences;





    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Tache> taches = new ArrayList<>();;



    public enum AssignmentType {
        FULL_TIME,
        PART_TIME
    }

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProjectAssignment> projectAssignments = new HashSet<>();




}