package com.example.gestionprojets.Entity;

import javax.persistence.*;

@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDocument;
    private String nom;
    private String chemin;
    private String format;

    /*@ManyToOne
    @JoinColumn(name = "tache_id", nullable = false)
    private Tache tache;*/

}
