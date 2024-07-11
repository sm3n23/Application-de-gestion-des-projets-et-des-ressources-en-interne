/*
package com.example.gestionprojets.Entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProjectEmployeeId implements Serializable {
    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "project_id")
    private Long projectId;

    // Constructors
    public ProjectEmployeeId() {}

    public ProjectEmployeeId(Long employeeId, Long projectId) {
        this.employeeId = employeeId;
        this.projectId = projectId;
    }

    // Getters and Setters
    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(employeeId, projectId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        ProjectEmployeeId that = (ProjectEmployeeId) obj;
        return Objects.equals(employeeId, that.employeeId) &&
                Objects.equals(projectId, that.projectId);
    }
}
*/
