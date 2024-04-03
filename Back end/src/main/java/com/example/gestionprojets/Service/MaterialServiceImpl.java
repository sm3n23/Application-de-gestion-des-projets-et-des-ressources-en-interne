package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.MaterialDto;
import com.example.gestionprojets.Entity.Material;
import com.example.gestionprojets.Repositories.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaterialServiceImpl implements MaterialService{

    @Autowired
    private MaterialRepository materialRepository;

    @Override
    public Material createMaterial(MaterialDto materialDto) {
        Material material = new Material();
        material.setName(materialDto.getName());
        material.setState(materialDto.getState());
        return materialRepository.save(material);
    }

    @Override
    public Material updateMaterial(Long id, MaterialDto materialDto) {
        Material material = materialRepository.findById(id)
                .orElseThrow(()->new NotFoundException("Material not found"));
        material.setName(materialDto.getName());
        material.setState(materialDto.getState());
        return materialRepository.save(material);
    }

    @Override
    public void deleteMaterial(Long id) {
        materialRepository.deleteById(id);

    }
}
