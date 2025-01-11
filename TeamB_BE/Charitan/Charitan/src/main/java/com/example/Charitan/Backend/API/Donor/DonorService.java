package com.example.Charitan.Backend.API.Donor;

import com.example.Charitan.Backend.DTO.DonorRegistrationRequest;
import com.example.Charitan.Backend.DataModel.Donor;
import com.example.Charitan.Backend.API.Donor.DonorRepository;
import com.example.Charitan.Backend.Email.EmailService;
import com.example.Charitan.Backend.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    //Register new Donor
    public Donor registerDonor (DonorRegistrationRequest donorRegistrationRequest){

        if(donorRepository.findByEmail(donorRegistrationRequest.getEmail()).isPresent()){
            throw new RuntimeException("A donor with this email has been created");
        }

        Donor donor = new Donor();
        donor.setEmail(donorRegistrationRequest.getEmail());
        donor.setPassword(passwordEncoder.encode(donorRegistrationRequest.getPassword()));
        donor.setPhoneNumber(donorRegistrationRequest.getPhoneNumber());
        donor.setAddress(donorRegistrationRequest.getAddress());
        donor.setName(donorRegistrationRequest.getName());
        donor.setDonorType(donorRegistrationRequest.getDonorType());
        donor.setAvatar(donorRegistrationRequest.getAvatar());
        donor.setIntroductionVideo(donorRegistrationRequest.getIntroductionVideo());

        // default field
        donor.setEmailVerified(false);
        donor.setCreatedAt(LocalDateTime.now());
        donor.setUpdatedAt(LocalDateTime.now());
        donorRepository.save(donor);

        // generate and send email verification
        String token = JwtUtil.generateToken(donor.getEmail());
        String verificationLink = "http://localhost:8080/api/auth/verify-email?token=" + token;
        String emailContent = "Click the link to verify your email: " + verificationLink;
        emailService.sendEmail(donor.getEmail(), "Email Verification", emailContent);

        return donor;

    }
}
