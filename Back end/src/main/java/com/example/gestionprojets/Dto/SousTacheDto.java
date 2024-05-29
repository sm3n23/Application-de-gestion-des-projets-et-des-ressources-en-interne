package com.example.gestionprojets.Dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class SousTacheDto {


    private String name;
    private boolean completed;
    private LocalDate startDate;

    private LocalDate finishDate;


    private Long tacheId;
}
