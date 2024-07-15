package com.example.gestionprojets.Entity;

import javax.persistence.*;

@Entity
public class EmployeeProjectStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "status")
    private String status; // full-time or part-time

    // getters and setters
}

