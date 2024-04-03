package com.example.gestionprojets.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
@Entity
@Table
@Getter@Setter
public class SousTache {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Date dateDebut;

    private Date dateFin;

    private String etat;

    /*@OneToMany(mappedBy = "sousTache", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Employee> employees= new HashSet<>();*/

    /*@ManyToOne
    @JsonBackReference
    @JoinColumn(name = "tache_id")
    @JsonIgnore
    private Tache tache;*/
}
