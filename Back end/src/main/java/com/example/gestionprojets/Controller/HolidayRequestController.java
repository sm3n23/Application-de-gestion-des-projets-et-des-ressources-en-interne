// HolidayRequestController.java
package com.example.gestionprojets.Controller;

import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.HolidayRequest;
import com.example.gestionprojets.Service.EmployeeService;
import com.example.gestionprojets.Service.HolidayRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/holiday-requests")
public class HolidayRequestController {

    @Autowired
    private HolidayRequestService holidayRequestService;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<HolidayRequest>> getAllRequests() {
        return ResponseEntity.ok(holidayRequestService.getAllRequests());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<HolidayRequest>> getRequestsByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(holidayRequestService.getRequestsByEmployee(employeeId));
    }

    @PostMapping
    public ResponseEntity<HolidayRequest> createRequest(@RequestBody HolidayRequest request) {
        return ResponseEntity.ok(holidayRequestService.createRequest(request));
    }

    @PostMapping("/approve/{requestId}")
    public ResponseEntity<HolidayRequest> approveRequest(@PathVariable Long requestId) {
        return ResponseEntity.ok(holidayRequestService.approveRequest(requestId));
    }

    @PostMapping("/decline/{requestId}")
    public ResponseEntity<HolidayRequest> declineRequest(@PathVariable Long requestId) {
        return ResponseEntity.ok(holidayRequestService.declineRequest(requestId));
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<HolidayRequest>> getMyRequests(@RequestParam String username) {
        Employee employee = employeeService.findbyUsername(username);
        return ResponseEntity.ok(holidayRequestService.getRequestsByEmployee(employee.getId()));
    }

}
