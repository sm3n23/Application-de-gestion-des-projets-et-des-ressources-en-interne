package com.example.gestionprojets.Repositories;

import com.example.gestionprojets.Entity.Tache;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TacheRepository extends JpaRepository<Tache,Long> {
}
