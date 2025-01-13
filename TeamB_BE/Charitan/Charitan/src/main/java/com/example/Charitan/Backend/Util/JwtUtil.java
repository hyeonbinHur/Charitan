package com.example.Charitan.Backend.Util;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;


import java.util.Date;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "EEET2582ArchitectureCharitanMasterSecureKey123!";
    private static final long EXPIRATION_TIME = 24*60*60*1000;

    // generate JWT token
    public static String generateToken (String email){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // validate token and get the email
    public static String validateToken (String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject();
        } catch (JwtException | IllegalArgumentException e){
            throw new RuntimeException("Invalid or expired token " + e.getMessage());
        }
    }

}
