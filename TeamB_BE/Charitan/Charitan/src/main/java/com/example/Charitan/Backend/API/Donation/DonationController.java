package com.example.Charitan.Backend.API.Donation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Charitan.Backend.DataModel.Donation;

@RestController
@RequestMapping("/api/donations")
public class DonationController {
    @Autowired
    private DonationService donationService;

    @GetMapping("/get")
    public List<Donation> getAllDonations() {
        return donationService.getAllDonations();
    }
}
