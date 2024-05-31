package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.EmployeeDto;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
//import com.example.gestionprojets.Entity.Tache;
import com.example.gestionprojets.Entity.Role;
import com.example.gestionprojets.Entity.Tache;
import com.example.gestionprojets.Repositories.EmployeeRepository;
import com.example.gestionprojets.Repositories.ProjectRepository;
import com.example.gestionprojets.Repositories.TacheRepository;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepository;



    @Autowired
    private ProjectRepository projectRepository;

    private TacheRepository tacheRepository;



    public Employee getEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found"));
        return employee;
    }



    public List<Employee> findEmployees() {

        List<Employee> employees = employeeRepository.findAll();
        return employees;
    }


    @Override
    public Employee createEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        employee.setName(employeeDto.getName());
        employee.setDescription(employeeDto.getDescription());
        employee.setTitle(employeeDto.getTitle());
        employee.setEmail(employeeDto.getEmail());
        employee.setBirthDate(employeeDto.getBirthDate());
        employee.setExperience(employeeDto.getExperience());
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employee.setSkills(employeeDto.getSkills());
        employee.setLocation(employeeDto.getLocation());
        employee.setPicture(employeeDto.getPicture());
        employee.setRoles(employeeDto.getRoles());


        return employeeRepository.save(employee);
    }

    private Role convertStringToRole(String roleStr) {
        try {
            return Role.valueOf(roleStr.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new IllegalArgumentException("Invalid role provided: " + roleStr);
        }
    }

    @Override
    public Employee updateEmployee(Long id, EmployeeDto employeeDto) {
        // Fetch the employee by ID or throw an exception if not found
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found"));


        employee.setName(employeeDto.getName());
        employee.setDescription(employeeDto.getDescription());
        employee.setTitle(employeeDto.getTitle());
        employee.setEmail(employeeDto.getEmail());
        employee.setBirthDate(employeeDto.getBirthDate());
        employee.setExperience(employeeDto.getExperience());
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employee.setSkills(employeeDto.getSkills());
        employee.setLocation(employeeDto.getLocation());
        employee.setPicture(employeeDto.getPicture());
        employee.setRoles(employeeDto.getRoles());






        // Fetch the project by ID or throw an exception if not found
        if(employeeDto.getProjectId()!=null) {
            Project project = projectRepository.findById(employeeDto.getProjectId())
                    .orElseThrow(() -> new NotFoundException("Project not found"));

            employee.setProject(project);
        }
        // Fetch the tasks by IDs and set them to the employee
        if(employeeDto.getTachesIds()!= null) {
            List<Tache> taches = tacheRepository.findAllById(employeeDto.getTachesIds());
            employee.setTaches(new HashSet<>(taches));
        }
        // Save and return the updated employee
        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }


    @Override
    public Employee findByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }



}


