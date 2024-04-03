package com.example.gestionprojets.Repositories;

import com.example.gestionprojets.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("SELECT e FROM Employee e JOIN FETCH e.projects WHERE e.id = :id")
    Optional<Employee> findByIdAndFetchProjectsEagerly(@Param("id") Long id);
}
