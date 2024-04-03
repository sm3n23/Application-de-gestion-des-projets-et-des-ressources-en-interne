package com.example.gestionprojets.Entity;

import javax.persistence.*;

@Entity
public class ChargeTravail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCharge;
    private double quantite;

    // Assuming this is related to the Tache entity, you would also have:
    /*@ManyToOne
    @JoinColumn(name = "tache_id", nullable = false)
    private Tache tache;*/
}
