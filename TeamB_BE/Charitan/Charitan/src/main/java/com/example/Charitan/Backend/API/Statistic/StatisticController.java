package com.example.Charitan.Backend.API.Statistic;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Charitan.Backend.API.Charity.CharityRepository;
import com.example.Charitan.Backend.API.Donation.DonationRepository;
import com.example.Charitan.Backend.API.Donor.DonorRepository;
import com.example.Charitan.Backend.API.Project.ProjectRepository;
import com.example.Charitan.Backend.DataModel.Charity;
import com.example.Charitan.Backend.DataModel.CharityStatistic;
import com.example.Charitan.Backend.DataModel.Donation;
import com.example.Charitan.Backend.DataModel.Donor;
import com.example.Charitan.Backend.DataModel.DonorStatistic;

@RestController
@RequestMapping("/api/statistics")
public class StatisticController {

    private final CharityRepository charityRepository;
    private final ProjectRepository projectRepository;
    private final DonationRepository donationRepository;
    private final DonorRepository donorRepository;

    public StatisticController(CharityRepository charityRepository, 
                               ProjectRepository projectRepository, 
                               DonationRepository donationRepository,
                               DonorRepository donorRepository) {
        this.charityRepository = charityRepository;
        this.projectRepository = projectRepository;
        this.donationRepository = donationRepository;
        this.donorRepository = donorRepository;
    }

    // 2.1) Calculate total projects
    @GetMapping("/total-projects")
    public long getTotalProjects() {
        return projectRepository.count();
    }

    // 2.2) Calculate total donations
    @GetMapping("/total-donation")
    public BigDecimal getTotalDonations() {
        return donationRepository.getTotalDonations();
    }

    @GetMapping("/charity")
    public List<CharityStatistic> getCharityStatistics() {
        return calculateProjectsAndDonationForEachCharity();
    }

    @GetMapping("/donor")
    public List<DonorStatistic> getDonorStatistics() {
        return calculateDonationForEachDonor();
    }

    @GetMapping("/guest")
    public List<DonorStatistic> getDonorDonationsByNameWhenDonorIsNull(@RequestParam(required = false) String name) {
        
        List<Donation> donations = donationRepository.findDonationsWhereDonorIdIsNull();
        
        
        if (name != null && !name.isEmpty()) {
            donations = donations.stream()
                .filter(donation -> donation.getName() != null && donation.getName().equals(name))  // Lọc theo tên donor
                .collect(Collectors.toList());
        }
        
        // Nhóm donations theo tên donor và tính tổng donation cho từng donor
        Map<String, BigDecimal> donationSumMap = donations.stream()
            .collect(Collectors.groupingBy(Donation::getName, 
                Collectors.reducing(BigDecimal.ZERO, Donation::getAmount, BigDecimal::add)));
        
        // Chuyển đổi map thành danh sách DonorStatistic
        List<DonorStatistic> donorStatistics = donationSumMap.entrySet().stream()
            .map(entry -> {
                DonorStatistic donorStatistic = new DonorStatistic();
                donorStatistic.setName(entry.getKey());  // Tên donor (dùng tên donation)
                donorStatistic.setTotalDonation(entry.getValue());  // Tổng donation
                return donorStatistic;
            })
            .collect(Collectors.toList());
        
        return donorStatistics;
    }

    private List<CharityStatistic> calculateProjectsAndDonationForEachCharity() {
        List<CharityStatistic> statistics = new ArrayList<>();

        List<Charity> charities = charityRepository.findAll();
        for (Charity charity : charities) {
            Long totalProjects = projectRepository.countByCharity_CharityId(charity.getCharityId());
            BigDecimal totalDonation = donationRepository.sumByCharityId(charity.getCharityId());

            CharityStatistic stat = new CharityStatistic(
                charity.getOrganizationName(), 
                totalProjects, 
                totalDonation
            );
            statistics.add(stat);
        }

        return statistics;
    }

    private List<DonorStatistic> calculateDonationForEachDonor() {
        List<DonorStatistic> statistics = new ArrayList<>();

        List<Donor> donors = donorRepository.findAll();
        
        for (Donor donor : donors) {
            BigDecimal totalDonation = donationRepository.sumByDonorId(donor.getDonorId());

            DonorStatistic stat = new DonorStatistic(
                donor.getName(), 
                totalDonation
            );
            statistics.add(stat);
        }

        return statistics;
    }
    
}


