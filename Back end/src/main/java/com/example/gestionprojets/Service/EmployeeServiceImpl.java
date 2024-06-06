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

import java.util.List;
import java.util.Optional;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.json.JSONObject;

import javax.transaction.Transactional;

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



    public Employee getEmployee(String id) {
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
    public Employee updateEmployee(String id, EmployeeDto employeeDto) {
        // Fetch the employee by ID or throw an exception if not found
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
    public void deleteEmployee(String id) {
        employeeRepository.deleteById(id);
    }


    @Override
    public Employee findByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }




    private final String keycloakBaseUrl = "http://localhost:8080";
    private final String adminRealm = "master";
    private final String realm = "Tarification-app";

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

        JSONObject userObject = new JSONObject();
        userObject.put("username", username);
        userObject.put("enabled", true);
        userObject.put("credentials", new JSONArray().put(new JSONObject().put("type", "password").put("value", password).put("temporary", false)));

        HttpEntity<String> entity = new HttpEntity<>(userObject.toString(), headers);
        restTemplate.postForEntity(keycloakBaseUrl + "/admin/realms/" + realm + "/users", entity, String.class);
    }

    public Employee save(@NonNull Employee employee) {
        return employeeRepository.save(employee);
    }
}


