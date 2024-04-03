package com.example.gestionprojets.Entity;

import javax.persistence.*;
import java.util.Date;

public class Rapport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRapport;
    private String nom;
    private String contenu;
    @Temporal(TemporalType.DATE)
    private Date dateCreation;

    /*@ManyToOne
    @JoinColumn(name = "projet_id", nullable = false)
    private Project project;*/
}
