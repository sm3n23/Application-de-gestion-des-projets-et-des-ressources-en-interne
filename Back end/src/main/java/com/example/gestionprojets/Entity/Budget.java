package com.example.gestionprojets.Entity;

import javax.persistence.*;

@Entity
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idBudget;
    private double montant;
    private String devise;

    /*@OneToOne(mappedBy = "budget")
    private Project projet;*/
}
