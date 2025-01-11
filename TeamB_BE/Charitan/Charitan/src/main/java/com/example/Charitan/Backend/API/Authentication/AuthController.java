package com.example.Charitan.Backend.API.Authentication;

import com.example.Charitan.Backend.API.Authentication.AuthService;
import com.example.Charitan.Backend.DTO.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Charitan.Backend.Util.JwtUtil;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<String> login (@RequestBody LoginRequest loginRequest){
        boolean isAuthenticated = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword(), loginRequest.getUserType());

        if(isAuthenticated){

            // generate token
            String token = jwtUtil.generateToken(loginRequest.getEmail());

            return ResponseEntity.ok().body("{\"jwtToken\": \"" + token + "\"}");
        } else {
            return ResponseEntity.status(401).body("Invalid Email");
        }
    }
}
