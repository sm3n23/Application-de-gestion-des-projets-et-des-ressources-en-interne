// HolidayRequestRepository.java
package com.example.gestionprojets.Repositories;

import com.example.gestionprojets.Entity.HolidayRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HolidayRequestRepository extends JpaRepository<HolidayRequest, Long> {
    List<HolidayRequest> findByEmployeeId(Long employeeId);
    List<HolidayRequest> findByStatus(String status);
}
