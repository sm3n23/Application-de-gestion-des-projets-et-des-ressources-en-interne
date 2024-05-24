package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.SousTacheDto;
import com.example.gestionprojets.Dto.TacheDto;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Entity.SousTache;
import com.example.gestionprojets.Entity.Tache;
import com.example.gestionprojets.Repositories.EmployeeRepository;
import com.example.gestionprojets.Repositories.ProjectRepository;
import com.example.gestionprojets.Repositories.SousTacheRepository;
import com.example.gestionprojets.Repositories.TacheRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SousTacheServiceImpl implements SousTacheService{

    private TacheRepository tacheRepository;

    private SousTacheRepository sousTacheRepository;



    @Override
    public List<SousTache> getSousTaches() {
        List<SousTache> sousTaches = sousTacheRepository.findAll();
        return sousTaches;
    }

    @Override
    public SousTache createSousTache(SousTacheDto sousTacheDto) {
        SousTache sousTache = new SousTache();
        sousTache.setName(sousTacheDto.getName());
        sousTache.setCompleted(sousTacheDto.isCompleted());

        Tache tache = tacheRepository.findById(sousTacheDto.getTacheId())
                .orElseThrow(()->new NotFoundException("Tache not found"));
        sousTache.setTache(tache);
        return sousTacheRepository.save(sousTache);
    }

    @Override
    public SousTache updateSousTache(Long id, SousTacheDto sousTacheDto) {
        SousTache sousTache = sousTacheRepository.findById(id)
                .orElseThrow(()->new NotFoundException("Sous tache not found"));
        sousTache.setName(sousTacheDto.getName());
        sousTache.setCompleted(sousTacheDto.isCompleted());
        
        Tache tache = tacheRepository.findById(sousTacheDto.getTacheId())
                .orElseThrow(()->new NotFoundException("Tache not found"));
        sousTache.setTache(tache);
        return sousTacheRepository.save(sousTache);


    }

    @Override
    public void deleteSousTache(Long id) {

        tacheRepository.deleteById(id);
    }
}
