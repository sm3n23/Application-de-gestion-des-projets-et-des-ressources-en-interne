package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.TacheDto;
import com.example.gestionprojets.Entity.Tache;

import java.util.List;

public interface TacheService {

    List<Tache> getTaches();
    Tache createTache(TacheDto tacheDto);

    Tache updateTache(Long id, TacheDto tacheDto);

    void deleteDto(Long id);
}
