package com.example.gestionprojets.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
@Getter@Setter
public class Tache {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;



    @OneToMany(mappedBy = "tache",fetch = FetchType.EAGER)
    private Set<Employee> employees= new HashSet<>();

    @OneToMany(mappedBy = "tache",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Set<SousTache> sousTache =new HashSet<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name= "project_id")
    private Project project;

    /*@OneToMany
    private Set<ChargeTravail> chargeTravail = new HashSet<>();


    @OneToMany
    private Set<Document> documents =new HashSet<>();*/
}
