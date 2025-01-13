package com.example.Charitan.Backend.API.Donation;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.Charitan.Backend.DataModel.Donation;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    // Sum all donations for a specific charity
    @Query("SELECT SUM(d.amount) FROM Donation d WHERE d.project.charity.charityId = :charityId")
    BigDecimal sumByCharityId(Long charityId);

    // Sum all donations for a specific donor
    @Query("SELECT SUM(d.amount) FROM Donation d WHERE d.donor.donorId = :donorId")
    BigDecimal sumByDonorId(Long donorId);
    
    @Query("SELECT SUM(d.amount) FROM Donation d")
    BigDecimal getTotalDonations();

    @Query("SELECT d FROM Donation d WHERE d.donor IS NULL")
    List<Donation> findDonationsWhereDonorIdIsNull();
}