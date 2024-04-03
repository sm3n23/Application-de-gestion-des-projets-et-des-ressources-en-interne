package com.example.gestionprojets.Controller;

import com.example.gestionprojets.Dto.MaterialDto;
import com.example.gestionprojets.Entity.Material;
import com.example.gestionprojets.Repositories.MaterialRepository;
import com.example.gestionprojets.Service.MaterialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping()
public class MaterialController {

    private MaterialService materialService;

    public MaterialController(MaterialService materialService){
        this.materialService = materialService;
    }

    @PostMapping("/material")
    public ResponseEntity<Material> createMaterial(@RequestBody MaterialDto materialDto){
        Material createdMaterial = materialService.createMaterial(materialDto);

        return new ResponseEntity<>(createdMaterial, HttpStatus.CREATED);
    }

    @PutMapping("/material/{id}")
    public ResponseEntity<Material> updateMaterial(@PathVariable Long id, @RequestBody MaterialDto materialDto){
        Material updatedMaterial = materialService.updateMaterial(id,materialDto);

        if (updatedMaterial!=null){
            return ResponseEntity.ok(updatedMaterial);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/materials/{id}")
    public ResponseEntity<String> deleteMaterial(@PathVariable Long id){
        materialService.deleteMaterial(id);
        return ResponseEntity.ok("Material deleted");
    }
}
