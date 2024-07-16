package com.example.gestionprojets.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "project_employee")
@Getter
@Setter

public class ProjectEmployee {

    @EmbeddedId
    private ProjectEmployeeId id;



    @Column(name = "status")
    private String status; // full-time or part-time

    public ProjectEmployee() {
    }


}
