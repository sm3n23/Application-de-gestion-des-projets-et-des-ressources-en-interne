package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.EmployeeDto;
import com.example.gestionprojets.Entity.Employee;
import org.springframework.lang.NonNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EmployeeService {



    Employee getEmployee(Long id);

    List<Employee> findEmployees();

    Employee createEmployee(EmployeeDto employeeDto);

    Employee updateEmployee(Long id, EmployeeDto employeeDto);

    Employee assignTasksToEmployee(Long employeeId, List<Long> taskIds);
    void deleteEmployee(Long id);

    Employee findByEmail(String email);


    Employee findbyUsername(String username);



    String getKeycloakAdminToken();

    void createUserInKeycloak(String username, String password);

    Employee save(@NonNull Employee employee);
}
