package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.TacheDto;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Entity.Tache;
import com.example.gestionprojets.Repositories.EmployeeRepository;
import com.example.gestionprojets.Repositories.ProjectRepository;
import com.example.gestionprojets.Repositories.TacheRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TacheServiceImpl implements TacheService{

    private TacheRepository tacheRepository;

    private EmployeeRepository employeeRepository;

    private ProjectRepository projectRepository;


    @Override
    public List<Tache> getTaches() {
        List<Tache> taches = tacheRepository.findAll();
        return taches;
    }

    public List<Tache> getTasksByIds(List<Long> ids) {
        return tacheRepository.findAllById(ids);
    }

    @Override
    public Tache createTache(TacheDto tacheDto) {
        Tache tache = new Tache();
        tache.setName(tacheDto.getName());
        tache.setStartDate(tacheDto.getStartDate());
        tache.setFinishDate(tacheDto.getFinishDate());

        tache.setAdvancement(tacheDto.getAdvancement());
        tache.setDescription(tacheDto.getDescription());

        if(tacheDto.getProjectId()!=null){
            Project project = projectRepository.findById(tacheDto.getProjectId())
                .orElseThrow(()->new NotFoundException("project not found"));
            tache.setProject(project);}

        return tacheRepository.save(tache);
    }

    @Override
    public Tache updateTache(Long id, TacheDto tacheDto) {
        Tache tache = tacheRepository.findById(id)
                .orElseThrow(()->new NotFoundException("tache not found"));
        tache.setName(tacheDto.getName());
        tache.setStartDate(tacheDto.getStartDate());
        tache.setFinishDate(tacheDto.getFinishDate());
        tache.setAdvancement(tacheDto.getAdvancement());
        tache.setDescription(tacheDto.getDescription());

        if(tacheDto.getProjectId()!=null){
            Project project = projectRepository.findById(tacheDto.getProjectId())
                    .orElseThrow(()->new NotFoundException("project not found"));
            tache.setProject(project);}


        return tacheRepository.save(tache);
    }

    @Override
    public void deleteTache(Long id) {

        tacheRepository.deleteById(id);
    }
}
