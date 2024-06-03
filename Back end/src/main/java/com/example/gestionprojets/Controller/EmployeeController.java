package com.example.gestionprojets.Controller;

import com.example.gestionprojets.Dto.EmployeeDto;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping()
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;




    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findEmployees();
        return ResponseEntity.ok(employees);
    }

    @PostMapping("/employees")
    public ResponseEntity<Employee> createEmployee(@RequestBody EmployeeDto employeeDto){
        Employee createdEmployee = employeeService.createEmployee(employeeDto);
        //keyCloackClientService.createUserInKeycloak(createdEmployee.getName(), "defaultPassword");

        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @RequestBody EmployeeDto employeeDto) {



        Employee updatedEmployee = employeeService.updateEmployee(id, employeeDto);
        if (updatedEmployee != null) {
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted");
    }


}
