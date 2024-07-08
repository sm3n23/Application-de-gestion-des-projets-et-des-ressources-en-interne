package com.example.gestionprojets.Repositories;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Page<Project> findByNameContaining(@Param("name") String name, Pageable pageable);
    @Query("SELECT p FROM Project p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%',:name,'%'))")
    List<Project> findByNameContainingIgnoreCase(@Param("name") String name);
    List<Project> findByStartDate(Date startDate);
    List<Project> findByFinishDate(Date finishDate);

    List<Project> findByStartDateBetween(Date startDate, Date endDate);
    List<Project> findByFinishDateBetween(Date startDate, Date endDate);


    List<Project> findByCreatedBy(String username);

    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.employees LEFT JOIN FETCH p.taches WHERE p.id = :id")
    Project findByIdWithAssociations(@Param("id") Long id);

    @Query("SELECT DISTINCT p FROM Project p LEFT JOIN FETCH p.employees LEFT JOIN FETCH p.taches")
    List<Project> findAllWithAssociations();
}
