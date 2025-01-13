package com.example.Charitan.Backend.Config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173")); // Allow requests from port 5173
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // HTTP methods
                    config.setAllowedHeaders(List.of("*")); // Allow all headers
                    config.setAllowCredentials(true); // Allow cookies/credentials
                    return config;
                }))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers
                                ("/api/auth/login",
                                        "/api/donors/register",
                                        "/api/donors/create",
                                        "/api/donors/update/{id}",
                                        "/api/donors/get",
                                        "/api/donors/delete/{id}",
                                        "/api/charities/register",
                                        "/api/charities/get",
                                        "/api/charities/create",
                                        "/api/charities/update/{id}",
                                        "/api/charities/delete/{id}",
                                        "/api/donations/get",
                                        "/api/projects/get",
                                        "/api/projects/create",
                                        "/api/projects/update/{id}",
                                        "/api/projects/delete/{id}",
                                        "/api/test/send-test-email",
                                        "/api/admins/get",
                                        "/api/admins/create",
                                        "/api/admins/update-password",
                                        "/api/admins/delete/{id}",
                                        "/api/statistics/total-projects",
                                        "/api/statistics/total-donation",
                                        "/api/statistics/charity",
                                        "/api/statistics/donor",
                                        "/api/statistics/guest",
                                        "/api/auth/verify-email").permitAll()
                        .anyRequest().authenticated()
                ).httpBasic(httpBasic -> httpBasic.disable());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
