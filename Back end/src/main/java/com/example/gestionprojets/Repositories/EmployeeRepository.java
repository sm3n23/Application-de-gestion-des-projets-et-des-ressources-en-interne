package com.example.gestionprojets.Repositories;

import com.example.gestionprojets.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Employee findByEmail(String email);


}
