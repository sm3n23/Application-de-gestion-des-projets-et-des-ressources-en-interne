package com.example.gestionprojets.Entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;


@Entity
@Table
@Setter@Getter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name= "project_id")
    private Project project;



    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Tache> taches;




    /*@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Address" , referencedColumnName = "id")
    private Address address;*/
}
