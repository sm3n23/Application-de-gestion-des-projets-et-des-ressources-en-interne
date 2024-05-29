package com.example.gestionprojets.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
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

    private String description;
    private LocalDate startDate;

    private LocalDate finishDate;
    private int advancement;



    @ManyToMany
    @JoinTable(
            name = "task_employee",
            joinColumns = @JoinColumn(name = "tache_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private Set<Employee> employees = new HashSet<>();


    @JsonManagedReference
    @OneToMany(mappedBy = "tache",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Set<SousTache> sousTaches =new HashSet<>();

    @ManyToOne
    @JoinColumn(name= "project_id")
    private Project project;

    /*@OneToMany
    private Set<ChargeTravail> chargeTravail = new HashSet<>();


    @OneToMany
    private Set<Document> documents =new HashSet<>();*/
}
