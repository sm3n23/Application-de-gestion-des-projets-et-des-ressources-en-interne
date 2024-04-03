package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.EmployeeDto;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
//import com.example.gestionprojets.Entity.Tache;
import com.example.gestionprojets.Repositories.EmployeeRepository;
import com.example.gestionprojets.Repositories.ProjectRepository;
import com.example.gestionprojets.mappers.DtoMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepository;

    private DtoMapper dtopMapper;

    @Autowired
    private ProjectRepository projectRepository;


    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found"));
        return dtopMapper.fromEmployee(employee);
    }

    public Employee getEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found"));
        return employee;
    }

    public List<EmployeeDto> getAllEmployees() {

        return employeeRepository.findAll().stream()
                .map(employee -> dtopMapper.fromEmployee(employee))
                .collect(Collectors.toList());
    }

    public List<Employee> findEmployees() {

        List<Employee> employees = employeeRepository.findAll();
        return employees;
    }


    @Override
    public Employee createEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        employee.setName(employeeDto.getName());




        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Long id, EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found"));
        employee.setName(employeeDto.getName());




        /*Tache tache = tacheRepository.findById(employeesDto.getTacheId())
                .orElseThrow(()->new NotFoundException("Tache not found with id: " + employeesDto.getTacheId()));
        employee.setTache(tache);*/

        if (employeeDto.getProjectIds() != null) {
            Set<Project> projects = employeeDto.getProjectIds().stream()
                    .map(ID-> projectRepository.findById(ID)
                            .orElseThrow(()->new NotFoundException("Project not found")))
                    .collect(Collectors.toSet());

            projects.forEach(project -> {
                employee.getProjects().add(project); // Add project to employee
                project.getEmployees().add(employee); // Add employee to project
            });
            employee.setProjects(projects);

        }

        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
