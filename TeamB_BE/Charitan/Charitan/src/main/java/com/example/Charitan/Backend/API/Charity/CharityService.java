package com.example.Charitan.Backend.API.Charity;

import com.example.Charitan.Backend.DTO.CharityRegistrationRequest;
import com.example.Charitan.Backend.DataModel.Charity;
import com.example.Charitan.Backend.Email.EmailService;
import com.example.Charitan.Backend.Util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CharityService {

    @Autowired
    private CharityRepository charityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;


    //Read all
    public List<Charity> getAllCharities(){
        return charityRepository.findAll();
    }

    //Create new charity throught Admin role
    public Charity createCharity(Charity charity){
        String encodepass = passwordEncoder.encode(charity.getPassword());
        charity.setPassword(encodepass);
        return charityRepository.save(charity);
    }

    //Update Charity throught Admin role
    public Charity updateCharity(Long id, Charity updateCharity) {
        Optional<Charity> existingCharity = charityRepository.findById(id);
        if (existingCharity.isPresent()) {
            Charity charity = existingCharity.get();
            charity.setOrganizationName(updateCharity.getOrganizationName());
            charity.setDescription(updateCharity.getDescription());
            charity.setCategory(updateCharity.getCategory());
            charity.setEmail(updateCharity.getEmail());
            charity.setPassword(passwordEncoder.encode(updateCharity.getPassword()));
            charity.setAvatar(updateCharity.getAvatar());
            charity.setCountry(updateCharity.getCountry());
            charity.setIntroductionVideo(updateCharity.getIntroductionVideo());
            charity.setOrganizationType(updateCharity.getOrganizationType());
            charity.setAddress(updateCharity.getAddress());
            charity.setUpdatedAt();
            return charityRepository.save(charity);
        }
        throw new RuntimeException("Charity isn't exist: " + id);
    }

    //Delete Charity throught Admin role
    public void deleteCharityById(Long id) {
        charityRepository.deleteById(id);
    }

    // Create new charity
    public Charity registerCharity(CharityRegistrationRequest charityRegistrationRequest){

        // check if email existed
        if(charityRepository.findByEmail(charityRegistrationRequest.getEmail()).isPresent()) {
            throw new RuntimeException("A charity has been registered with this email");
        }

        // validate organization type
        String organizationType = charityRegistrationRequest.getOrganizationType();
        if
        (
                organizationType != null &&
                !organizationType.equalsIgnoreCase("BUSINESS") &&
                !organizationType.equalsIgnoreCase("NON_PROFIT")
        ) {
            throw new IllegalArgumentException("Invalid organizationType. Allowed values are 'BUSINESS' or 'NON_PROFIT'.");
        }


        Charity charity = new Charity();
        charity.setOrganizationName(charityRegistrationRequest.getOrganizationName());
        charity.setDescription(charityRegistrationRequest.getDescription());
        charity.setCategory(charityRegistrationRequest.getCategory());
        charity.setEmail(charityRegistrationRequest.getEmail());
        charity.setPassword(passwordEncoder.encode(charityRegistrationRequest.getPassword()));
        charity.setAvatar(charityRegistrationRequest.getAvatar());
        charity.setCountry(charityRegistrationRequest.getCountry());
        charity.setIntroductionVideo(charityRegistrationRequest.getIntroductionVideo());
        charity.setOrganizationType(organizationType);
        charity.setAddress(charityRegistrationRequest.getAddress());

        charity.setEmailVerified(false);
        charity.setCreatedAt();
        charity.setUpdatedAt();

        charityRepository.save(charity);

        // generate and send verification email
        String token = JwtUtil.generateToken(charity.getEmail());
        String verificationLink = "http://localhost:8080/api/auth/verify-email?token=" + token;
        String emailContent =  "Click the link to verify your email: " + verificationLink;
        emailService.sendEmail(charity.getEmail(), "Email verification", emailContent);

        return charity;
    }
}
