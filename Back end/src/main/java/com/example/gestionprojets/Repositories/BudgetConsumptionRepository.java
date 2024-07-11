package com.example.gestionprojets.Repositories;

import com.example.gestionprojets.Entity.BudgetConsumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetConsumptionRepository extends JpaRepository<BudgetConsumption, Long> {
}
