package com.example.gestionprojets.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;



@Entity
@Table
@Setter@Getter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name= "project_id")
    private Project project;



    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Tache tache;

    @ManyToOne(cascade = CascadeType.ALL)
    private SousTache sousTache;


    /*@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Address" , referencedColumnName = "id")
    private Address address;*/
}
