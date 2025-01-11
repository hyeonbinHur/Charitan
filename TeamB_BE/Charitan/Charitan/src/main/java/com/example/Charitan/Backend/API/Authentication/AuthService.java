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
    public boolean authenticate(String email, String password){

        // Check if user is Donor
        Donor donor = donorRepository.findByEmail(email).orElse(null);
        if(donor != null && passwordEncoder.matches(password, donor.getPassword())){
            return true;
        }

        // Check if user is Charity
        Charity charity = charityRepository.findByEmail(email).orElse(null);
        if(charity != null && passwordEncoder.matches(password, charity.getPassword())){
            return true;
        }

        return false;
    }
}
