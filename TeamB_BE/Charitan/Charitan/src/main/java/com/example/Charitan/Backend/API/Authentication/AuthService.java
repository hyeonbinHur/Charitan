package com.example.Charitan.Backend.API.Authentication;

import com.example.Charitan.Backend.DataModel.Donor;
import com.example.Charitan.Backend.DataModel.Charity;
import com.example.Charitan.Backend.API.Donor.DonorRepository;
import com.example.Charitan.Backend.API.Charity.CharityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private CharityRepository charityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Function to check for username and password
    public boolean authenticate(String email, String password, String userType){

        // Check if user is Donor
        if (userType.equalsIgnoreCase("Donor")) {
            // Authenticate Donor
            Donor donor = donorRepository.findByEmail(email).orElse(null);
            return donor != null && passwordEncoder.matches(password, donor.getPassword());
        } else if (userType.equalsIgnoreCase("Charity")) {
            // Authenticate Charity
            Charity charity = charityRepository.findByEmail(email).orElse(null);
            return charity != null && passwordEncoder.matches(password, charity.getPassword());
        }
        return false;
    }
}
