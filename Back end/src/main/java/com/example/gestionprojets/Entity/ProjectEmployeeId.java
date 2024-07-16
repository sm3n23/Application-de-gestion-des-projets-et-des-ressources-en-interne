package com.example.gestionprojets.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProjectEmployeeId implements Serializable {
    private Long projectId;
    private Long employeeId;

    // Constructors, getters, setters, hashCode, equals
    public ProjectEmployeeId() {
    }

    public ProjectEmployeeId(Long projectId, Long employeeId) {
        this.projectId = projectId;
        this.employeeId = employeeId;
    }

    // getters and setters

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProjectEmployeeId that = (ProjectEmployeeId) o;
        return Objects.equals(projectId, that.projectId) && Objects.equals(employeeId, that.employeeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(projectId, employeeId);
    }
}
