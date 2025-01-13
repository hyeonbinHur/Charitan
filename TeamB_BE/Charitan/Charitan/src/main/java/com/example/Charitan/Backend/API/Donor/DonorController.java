package com.example.Charitan.Backend.API.Donor;

import com.example.Charitan.Backend.DTO.DonorRegistrationRequest;
import com.example.Charitan.Backend.DataModel.Donor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @GetMapping("/get")
    public List<Donor> getAllDonors() {
        return donorService.getAllDonors();
    }

    @PostMapping("/create")
    public Donor createDonor(Donor donor) {
        return donorService.createDonor(donor);
    }

    @PutMapping("/update/{id}")
    public Donor updateDonor(@PathVariable Long id, @RequestBody Donor updateDonor) {
        return donorService.updateDonor(id, updateDonor);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDonorById(@PathVariable Long id){
        donorService.deleteDonorById(id);
    }

    //Register new Donor
    @PostMapping("/register")
    public ResponseEntity<?> registerDonor(@RequestBody DonorRegistrationRequest donorRegistrationRequest){
        try{
            Donor savedDonor = donorService.registerDonor(donorRegistrationRequest);
            return ResponseEntity.ok(savedDonor);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
