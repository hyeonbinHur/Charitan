package com.example.Charitan.Backend.API.Donor;

import com.example.Charitan.Backend.DTO.DonorRegistrationRequest;
import com.example.Charitan.Backend.DataModel.Donor;
import com.example.Charitan.Backend.Email.EmailService;
import com.example.Charitan.Backend.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    //read all
    public List<Donor> getAllDonors(){
        return donorRepository.findAll()
                                .stream()
                                .filter(donor -> donor.getCreatedAt() != null && donor.getUpdatedAt() != null)
                                .collect(Collectors.toList());
    }

    //create donor by admin role
    public Donor createDonor(Donor donor) {
        donor.setPassword(passwordEncoder.encode(donor.getPassword()));
        return donorRepository.save(donor);
    }

    //update donor by admin role
    public Donor updateDonor(Long id, Donor updateDonor) {
        Optional<Donor> existingDonor = donorRepository.findById(id);
        if (existingDonor.isPresent()) {
            Donor donor = existingDonor.get();
            donor.setEmail(updateDonor.getEmail());
            donor.setPassword(passwordEncoder.encode(updateDonor.getPassword()));
            donor.setPhoneNumber(updateDonor.getPhoneNumber());
            donor.setAddress(updateDonor.getAddress());
            donor.setName(updateDonor.getName());
            donor.setDonorType(updateDonor.getDonorType());
            donor.setAvatar(updateDonor.getAvatar());
            donor.setIntroductionVideo(updateDonor.getIntroductionVideo());
            donor.setUpdatedAt();
            donorRepository.save(donor);
        }
        throw new RuntimeException("Donor isn't exist: " + id);
    }

    public void deleteDonorById(Long id) {
        donorRepository.deleteById(id);
    }

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
        donor.setCreatedAt();
        donor.setUpdatedAt();
        donorRepository.save(donor);

        // generate and send email verification
        String token = JwtUtil.generateToken(donor.getEmail());
        String verificationLink = "http://localhost:8080/api/auth/verify-email?token=" + token;
        String emailContent = "Click the link to verify your email: " + verificationLink;
        emailService.sendEmail(donor.getEmail(), "Email Verification", emailContent);

        return donor;

    }
}
