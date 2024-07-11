/*
package com.example.gestionprojets.Entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "project_employee")
@Getter
@Setter

public class ProjectEmployee {
    @EmbeddedId
    private ProjectEmployeeId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("employeeId")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("projectId")
    private Project project;

    @Column(name = "is_full_time")
    private boolean isFullTime = false;

    public ProjectEmployee() {}

    public ProjectEmployee(Employee employee, Project project, boolean isFullTime) {
        this.employee = employee;
        this.project = project;
        this.isFullTime = isFullTime;
        this.id = new ProjectEmployeeId(employee.getId(), project.getId());
    }
}
*/
