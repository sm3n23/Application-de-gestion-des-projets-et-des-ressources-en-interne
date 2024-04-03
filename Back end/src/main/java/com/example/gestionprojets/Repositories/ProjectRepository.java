package com.example.gestionprojets.Repositories;

import com.example.gestionprojets.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
