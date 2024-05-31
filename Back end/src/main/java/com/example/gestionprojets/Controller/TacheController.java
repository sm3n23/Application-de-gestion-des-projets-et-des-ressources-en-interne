package com.example.gestionprojets.Controller;

import com.example.gestionprojets.Dto.TacheDto;
import com.example.gestionprojets.Entity.Project;
import com.example.gestionprojets.Entity.Tache;
import com.example.gestionprojets.Service.TacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
public class TacheController {

    @Autowired
    private TacheService tacheService;

    @GetMapping("/taches")
    @PreAuthorize("hasRole('CHEF_DE_PROJET')")
    public ResponseEntity<List<Tache>> getTaches(){
        List<Tache> taches = tacheService.getTaches();
        return ResponseEntity.ok(taches);
    }

    @PostMapping("/taches")
    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Tache> createTache(@RequestBody TacheDto tacheDto){
        Tache createdTache  = tacheService.createTache(tacheDto);

        return new ResponseEntity<>(createdTache, HttpStatus.CREATED);
    }

    @PutMapping("/taches/{id}")
    public ResponseEntity<Tache> updateTache(@PathVariable Long id, @RequestBody TacheDto tacheDto){
        Tache updatedTache = tacheService.updateTache(id,tacheDto);

        if(updatedTache != null){
            return ResponseEntity.ok(updatedTache);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/taches/{id}")

    public ResponseEntity<String> deleteTache(@PathVariable Long id){
         tacheService.deleteTache(id);
         return  ResponseEntity.ok("Tache deleted");
    }
}
