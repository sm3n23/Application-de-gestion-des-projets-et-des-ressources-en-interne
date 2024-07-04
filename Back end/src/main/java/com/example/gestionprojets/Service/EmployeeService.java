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

    void deleteEmployee(Long id);

    Employee findByEmail(String email);
<<<<<<< HEAD

    Employee findbyUsername(String username);
=======
    Employee findByUsername(String username);
>>>>>>> 02bf6d13d41e0a18176d7d5cd4bca65c934571e5

    String getKeycloakAdminToken();

    void createUserInKeycloak(String username, String password);

    Employee save(@NonNull Employee employee);
}
