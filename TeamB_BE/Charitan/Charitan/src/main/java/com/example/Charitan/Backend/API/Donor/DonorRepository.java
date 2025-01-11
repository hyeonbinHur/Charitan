package com.example.Charitan.Backend.API.Donor;

import com.example.Charitan.Backend.DataModel.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
public interface DonorRepository extends JpaRepository<Donor, Long> {

    @Query(value = "SELECT * FROM `Donor` WHERE email = :email LIMIT 1", nativeQuery = true)
    Optional<Donor> findByEmail(@Param("email") String email);
}
