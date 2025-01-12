package com.example.Charitan.Backend.API.Authentication;


import com.example.Charitan.Backend.API.Donor.DonorRepository;
import com.example.Charitan.Backend.API.Charity.CharityRepository;
import com.example.Charitan.Backend.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class VerificationController {

    @Autowired
    private CharityRepository charityRepository;
    @Autowired
    private DonorRepository donorRepository;

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token){
        try {
            String email = JwtUtil.validateToken(token);

            // verify for donor
            donorRepository.findByEmail(email).ifPresent(donor -> {
                donor.setEmailVerified(true);
                donorRepository.save(donor);
            });

            // verify for charity
            charityRepository.findByEmail(email).ifPresent(charity -> {
                charity.setEmailVerified(true);
                charityRepository.save(charity);
            });

            return ResponseEntity.ok("Email successfully verified!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("invalid or expired token");
        }
    }
}
