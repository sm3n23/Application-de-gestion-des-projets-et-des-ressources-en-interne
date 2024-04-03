package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.EmployeeDto;
import com.example.gestionprojets.Entity.Employee;

import java.util.List;

public interface EmployeeService {

    EmployeeDto getEmployeeById(Long id);

    public Employee getEmployee(Long id);

    List<Employee> findEmployees();
    List<EmployeeDto> getAllEmployees();
    Employee createEmployee(EmployeeDto employeeDto);

    Employee updateEmployee(Long id, EmployeeDto employeeDto);

    void deleteEmployee(Long id);
}
