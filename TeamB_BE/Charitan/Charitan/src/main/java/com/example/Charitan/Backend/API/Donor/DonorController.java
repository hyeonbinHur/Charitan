package com.example.Charitan.Backend.API.Donor;

import com.example.Charitan.Backend.DTO.DonorRegistrationRequest;
import com.example.Charitan.Backend.DataModel.Donor;
import com.example.Charitan.Backend.API.Donor.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    @Autowired
    private DonorService donorService;

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
