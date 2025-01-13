package com.example.Charitan.Backend.DataModel;

import java.math.BigDecimal;

public class DonorStatistic {
    private String name;
    private BigDecimal totalDonation;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public BigDecimal getTotalDonation() {
        return totalDonation;
    }
    public void setTotalDonation(BigDecimal totalDonation) {
        this.totalDonation = totalDonation;
    }
    public DonorStatistic(String name, BigDecimal totalDonation) {
        this.name = name;
        this.totalDonation = totalDonation;
    }
    public DonorStatistic() {
        //TODO Auto-generated constructor stub
    }
}
