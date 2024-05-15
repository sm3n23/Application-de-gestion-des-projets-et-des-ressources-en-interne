package com.example.gestionprojets.Entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name= "project_id")
    private Project project;



    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Tache> taches;

    @ManyToOne(cascade = CascadeType.ALL)
    private SousTache sousTache;


    /*@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Address" , referencedColumnName = "id")
    private Address address;*/
}
