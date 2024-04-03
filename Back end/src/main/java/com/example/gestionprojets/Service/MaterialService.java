package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.MaterialDto;
import com.example.gestionprojets.Entity.Material;

public interface MaterialService {

    Material createMaterial(MaterialDto materialDto);

    Material updateMaterial(Long id, MaterialDto materialDto);

    void deleteMaterial(Long id);

}
