package com.example.gestionprojets.Controller;

import com.example.gestionprojets.Dto.SousTacheDto;
import com.example.gestionprojets.Dto.TacheDto;
import com.example.gestionprojets.Entity.SousTache;
import com.example.gestionprojets.Entity.Tache;
import com.example.gestionprojets.Service.SousTacheService;
import com.example.gestionprojets.Service.TacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
public class SousTacheController {

    @Autowired
    private SousTacheService sousTacheService;

    @GetMapping("/sousTaches")
    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<List<SousTache>> getSousTaches(){
        List<SousTache> sousTaches = sousTacheService.getSousTaches();
        return ResponseEntity.ok(sousTaches);
    }

    @PostMapping("/sousTache")
    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<SousTache> createSousTache(@RequestBody SousTacheDto sousTacheDto){
        SousTache createdSousTache  = sousTacheService.createSousTache(sousTacheDto);

        return new ResponseEntity<>(createdSousTache, HttpStatus.CREATED);
    }

    @PutMapping("/sousTache/{id}")
    public ResponseEntity<SousTache> updateSousTache(@PathVariable Long id, @RequestBody SousTacheDto sousTacheDto){
        SousTache updatedSousTache = sousTacheService.updateSousTache(id,sousTacheDto);

        if(updatedSousTache != null){
            return ResponseEntity.ok(updatedSousTache);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/sousTache/{id}")

    public ResponseEntity<String> deleteSousTache(@PathVariable Long id){
         sousTacheService.deleteSousTache(id);
         return  ResponseEntity.ok("Sous Tache deleted");
    }
}
