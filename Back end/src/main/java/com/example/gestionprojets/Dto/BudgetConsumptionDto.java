package com.example.gestionprojets.Dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class BudgetConsumptionDto {
    private int amount;
    private String comment;
    private LocalDate date;
}
