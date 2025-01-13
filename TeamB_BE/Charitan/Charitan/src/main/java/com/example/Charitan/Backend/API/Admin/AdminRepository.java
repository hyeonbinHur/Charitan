package com.example.Charitan.Backend.API.Admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Charitan.Backend.DataModel.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
}
