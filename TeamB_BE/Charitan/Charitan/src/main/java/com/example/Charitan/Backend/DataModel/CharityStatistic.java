package com.example.Charitan.Backend.DataModel;

import java.math.BigDecimal;

public class CharityStatistic {
    private String name;
    private Long totalProjects;
    private BigDecimal totalDonation;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Long getTotalProjects() {
        return totalProjects;
    }
    public void setTotalProjects(Long totalProjects) {
        this.totalProjects = totalProjects;
    }
    public BigDecimal getTotalDonation() {
        return totalDonation;
    }
    public void setTotalDonation(BigDecimal totalDonation) {
        this.totalDonation = totalDonation;
    }
    public CharityStatistic(String name, Long totalProjects, BigDecimal totalDonation) {
        this.name = name;
        this.totalProjects = totalProjects;
        this.totalDonation = totalDonation;
    }
    public CharityStatistic() {
        //TODO Auto-generated constructor stub
    }
}
