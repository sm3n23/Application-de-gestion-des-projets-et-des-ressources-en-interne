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
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.*;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.json.JSONObject;

import javax.transaction.Transactional;

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

    public Employee findbyUsername(String username) {
        Employee employee = employeeRepository.findByUsername(username);
        if (employee == null) {
            throw new NotFoundException("User not found with username: " + username);
        }
        return employee;
    }

    public List<Employee> findEmployees() {

        List<Employee> employees = employeeRepository.findAll();
        return employees;
    }




    @Override
    public Employee createEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        employee.setUsername(employeeDto.getUsername());
        employee.setName(employeeDto.getName());
        employee.setRole(employeeDto.getRole());
        employee.setDescription(employeeDto.getDescription());
        employee.setTitle(employeeDto.getTitle());
        employee.setEmail(employeeDto.getEmail());
        employee.setBirthDate(employeeDto.getBirthDate());
        employee.setExperience(employeeDto.getExperience());
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employee.setSkills(employeeDto.getSkills());
        employee.setLocation(employeeDto.getLocation());
        employee.setPicture(employeeDto.getPicture());
        employee.setAbsences(0);
        if(employeeDto.getRole() != null) {
            employee.setRole(employeeDto.getRole());
        }

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
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found"));

        employee.setName(employeeDto.getName());
        employee.setUsername(employeeDto.getUsername());
        employee.setDescription(employeeDto.getDescription());
        employee.setTitle(employeeDto.getTitle());
        employee.setEmail(employeeDto.getEmail());
        employee.setBirthDate(employeeDto.getBirthDate());
        employee.setExperience(employeeDto.getExperience());
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employee.setSkills(employeeDto.getSkills());
        employee.setLocation(employeeDto.getLocation());
        employee.setPicture(employeeDto.getPicture());
        employee.setAbsences(employeeDto.getAbsences());

        if (employeeDto.getProjectIds() != null) {
            List<Project> projects = projectRepository.findAllById(employeeDto.getProjectIds());
            employee.setProjects(new HashSet<>(projects));
        }

        if (employeeDto.getTachesIds() != null) {
            List<Tache> taches = tacheRepository.findAllById(employeeDto.getTachesIds());
            taches.forEach(tache -> tache.setEmployee(employee));
            employee.setTaches(taches);
        }

        if (employeeDto.getRole() != null) {
            employee.setRole(employeeDto.getRole());
        }

        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployeeAbsences(Long id, int absences) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found"));

        employee.setAbsences(absences);

        return employeeRepository.save(employee);
    }



    public Employee assignTasksToEmployee(Long employeeId, List<Long> taskIds) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new NotFoundException("Employee not found"));

        List<Tache> taches = tacheRepository.findAllById(taskIds);

        // Remove tasks that are no longer in the taskIds list
        employee.getTaches().removeIf(tache -> !taskIds.contains(tache.getId()));

        // Add new tasks to the employee's task list
        for (Tache tache : taches) {
            if (!employee.getTaches().contains(tache)) {
                employee.getTaches().add(tache);
                tache.setEmployee(employee); // Set the relationship correctly
            }
        }

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




    private final String keycloakBaseUrl = "http://localhost:8080";
    private final String adminRealm = "master";
    private final String realm = "projects-ressources-realm";

    public String getKeycloakAdminToken() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
        map.add("grant_type", "password");
        map.add("client_id", "admin-cli");
        map.add("username", "admin");
        map.add("password", "admin");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(keycloakBaseUrl + "/realms/" + adminRealm + "/protocol/openid-connect/token", request, String.class);
        JSONObject jsonObject = new JSONObject(response.getBody());
        return jsonObject.getString("access_token");
    }

    public void createUserInKeycloak(String username, String password) {
        String token = getKeycloakAdminToken();

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        String email = username + "@gmail.com";

        JSONObject userObject = new JSONObject();
        userObject.put("username", username);
        userObject.put("email", email);
        userObject.put("firstName", username);
        userObject.put("lastName", username);
        userObject.put("enabled", true);
        userObject.put("credentials", new JSONArray().put(new JSONObject().put("type", "password").put("value", password).put("temporary", false)));

        HttpEntity<String> entity = new HttpEntity<>(userObject.toString(), headers);
        restTemplate.postForEntity(keycloakBaseUrl + "/admin/realms/" + realm + "/users", entity, String.class);
    }

    public Employee save(@NonNull Employee employee) {
        return employeeRepository.save(employee);
    }
}


