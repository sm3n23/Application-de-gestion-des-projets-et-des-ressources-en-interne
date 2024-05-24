import com.example.gestionprojets.Dto.EmployeeDto;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Entity.Tache;

import java.util.Set;
import java.util.stream.Collectors;

public class DtoMapper {

    public static EmployeeDto toEmployeeDto(Employee employee) {
        EmployeeDto dto = new EmployeeDto();
        dto.setName(employee.getName());

        dto.setProjectId(employee.getProject().getId());  // Single project ID
        dto.setTachesIds(employee.getTaches().stream().map(Tache::getId).collect(Collectors.toSet()));
        return dto;
    }

    public static Employee toEmployee(EmployeeDto dto, Project project, Set<Tache> taches) {
        Employee employee = new Employee();
        employee.setName(dto.getName());

        employee.setProject(project);
        employee.setTaches(taches);
        return employee;
    }

    // Other mappings for Project and Tache
}
