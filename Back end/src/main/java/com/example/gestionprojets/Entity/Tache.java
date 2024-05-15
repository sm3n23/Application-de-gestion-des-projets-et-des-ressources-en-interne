package com.example.gestionprojets.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
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



    @ManyToMany
    @JoinTable(
            name = "task_employee",
            joinColumns = @JoinColumn(name = "tache_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private Set<Employee> employees = new HashSet<>();


    @OneToMany(mappedBy = "tache",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Set<SousTache> sousTache =new HashSet<>();

    @ManyToOne
    @JoinColumn(name= "project_id")
    private Project project;

    /*@OneToMany
    private Set<ChargeTravail> chargeTravail = new HashSet<>();


    @OneToMany
    private Set<Document> documents =new HashSet<>();*/
}
