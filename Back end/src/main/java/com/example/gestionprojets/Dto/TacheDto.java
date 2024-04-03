package com.example.gestionprojets.Dto;

import com.example.gestionprojets.Entity.Employee;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Data
public class TacheDto {


    private String name;

    private Set<Long> employeesIds;

    private Long projectId;
}
