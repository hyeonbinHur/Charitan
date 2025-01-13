package com.example.Charitan.Backend.API.Charity;

import com.example.Charitan.Backend.DTO.CharityRegistrationRequest;
import com.example.Charitan.Backend.DataModel.Charity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/charities")
public class CharityController {

    @Autowired
    private CharityService charityService;

    @GetMapping("/get")
    public List<Charity> getAllCharities() {
        return charityService.getAllCharities();
    }

    @PostMapping("/create")
    public Charity createCharity(Charity charity) {
        return charityService.createCharity(charity);
    }

    @PutMapping("/update/{id}")
    public Charity updateCharity(@PathVariable Long id, @RequestBody Charity updateCharity) {
        return charityService.updateCharity(id, updateCharity);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCharityById(@PathVariable Long id){
        charityService.deleteCharityById(id);
    }

    //Endpoint register charity
    @PostMapping("/register")
    public ResponseEntity<?> registerCharity(@RequestBody CharityRegistrationRequest request){
        try {
            Charity savedCharity = charityService.registerCharity(request);
            return ResponseEntity.ok(savedCharity);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
