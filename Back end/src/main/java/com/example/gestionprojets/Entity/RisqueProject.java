package com.example.gestionprojets.Entity;

import javax.persistence.*;

public class RisqueProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRisque;
    private String description;
    private String niveau;

    /*@ManyToOne
    @JoinColumn(name = "projet_id", nullable = false)
    private Project project;*/
}
