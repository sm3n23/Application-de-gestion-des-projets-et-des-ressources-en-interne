package com.example.gestionprojets.mappers;

import com.example.gestionprojets.Dto.EmployeeDto;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DtoMapper {
    public EmployeeDto fromEmployee(Employee employee){
        EmployeeDto employeeDto = new EmployeeDto();
        BeanUtils.copyProperties(employee, employeeDto);
        if (employee.getProjects() != null) {
            Set<Long> projectIds = employee.getProjects().stream()
                    .map(Project::getId)
                    .collect(Collectors.toSet());
            employeeDto.setProjectIds(projectIds);
        }
        return employeeDto;
    }

    public Employee fromEmployeeDto(EmployeeDto employeeDto){
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeDto,employee);
        return employee;
    }
}
