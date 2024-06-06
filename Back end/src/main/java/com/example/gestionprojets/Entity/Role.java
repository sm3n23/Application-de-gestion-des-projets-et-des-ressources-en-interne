package com.example.gestionprojets.Entity;

public enum Role {
    Collaborateur, ChefDeProjet, RH;
    
        public String toUpperCase() {
            return name().toUpperCase();
        }
    }

