package com.example.gestionprojets.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Table
@Setter@Getter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(
            name = "employee_project",
            joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private Set<Project> projects = new HashSet<>();



    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Tache tache;

    /*@ManyToOne(cascade = CascadeType.ALL)
    private SousTache sousTache;*/


    /*@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Address" , referencedColumnName = "id")
    private Address address;*/
}
