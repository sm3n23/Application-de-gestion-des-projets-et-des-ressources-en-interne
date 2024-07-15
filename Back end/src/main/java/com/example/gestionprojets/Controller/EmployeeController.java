package com.example.gestionprojets.Controller;

import com.example.gestionprojets.Dto.EmployeeDto;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Service.EmployeeService;
import com.example.gestionprojets.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping()
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ProjectService projectService;



    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }


    @GetMapping("/employees/user/{username}")
    public ResponseEntity<Employee> getEmployeeByUsername(@PathVariable String username) {
        return ResponseEntity.ok(employeeService.findbyUsername(username));
    }


    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findEmployees();
        return ResponseEntity.ok(employees);
    }

    @PostMapping("/employees")
    public ResponseEntity<Employee> createEmployee(@RequestBody EmployeeDto employeeDto){
        Employee createdEmployee = employeeService.createEmployee(employeeDto);
        employeeService.createUserInKeycloak(employeeDto.getUsername(), "1234");

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

    @PutMapping("/employees/{id}/absences")
    public ResponseEntity<Employee> updateEmployeeAbsences(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> absencesPayload) {

        int absences = absencesPayload.get("absences");

        Employee updatedEmployee = employeeService.updateEmployeeAbsences(id, absences);
        if (updatedEmployee != null) {
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    /*@PostMapping("employee/{employeeId}/assign")
    public ResponseEntity<Employee> assignEmployeeToProject(@PathVariable Long employeeId,
                                                            @RequestParam Long projectId,
                                                            @RequestParam boolean isFullTime) {
        Employee updatedEmployee = projectService.assignEmployeeToProject(employeeId, projectId, isFullTime);
        return ResponseEntity.ok(updatedEmployee);
    }*/

    @PutMapping("/employees/{id}/tasks")
    public ResponseEntity<Employee> assignTasksToEmployee(@PathVariable Long id, @RequestBody List<Long> taskIds) {
        Employee updatedEmployee = employeeService.assignTasksToEmployee(id, taskIds);
        return ResponseEntity.ok(updatedEmployee);
    }




    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted");
    }


}
