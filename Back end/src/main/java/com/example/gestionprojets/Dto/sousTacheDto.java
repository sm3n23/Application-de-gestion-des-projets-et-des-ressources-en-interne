package com.example.gestionprojets.Dto;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class sousTacheDto {


    private String name;

    private Date dateDebut;

    private Date dateFin;

    private String etat;

    private Set<Long> employeesIds;

}
