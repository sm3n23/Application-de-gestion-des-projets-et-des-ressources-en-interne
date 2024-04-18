package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.SousTacheDto;
import com.example.gestionprojets.Dto.TacheDto;
import com.example.gestionprojets.Entity.SousTache;
import com.example.gestionprojets.Entity.Tache;

import java.util.List;

public interface SousTacheService {

    List<SousTache> getSousTaches();
    SousTache createSousTache(SousTacheDto sousTacheDto);

    SousTache updateSousTache(Long id, SousTacheDto sousTacheDto);

    void deleteSousTache(Long id);
}
