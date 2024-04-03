package com.example.gestionprojets.Repositories;

import com.example.gestionprojets.Entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material,Long> {
}
