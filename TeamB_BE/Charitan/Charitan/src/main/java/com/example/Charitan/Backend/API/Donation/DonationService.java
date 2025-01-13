package com.example.Charitan.Backend.API.Donation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Charitan.Backend.DataModel.Donation;

@Service
public class DonationService {
    @Autowired
    private DonationRepository donationRepository;

    public List<Donation> getAllDonations() {
        return donationRepository.findAll()
                                .stream()
                                .filter(donate -> donate.getDonationDate() != null) // Bỏ qua null hoặc xử lý logic khác
                                .collect(Collectors.toList());
    }
}
