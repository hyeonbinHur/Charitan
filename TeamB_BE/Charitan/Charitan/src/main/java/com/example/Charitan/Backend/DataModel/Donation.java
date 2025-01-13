package com.example.Charitan.Backend.DataModel;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.Charitan.Backend.Enum.DonorType;

import jakarta.persistence.*;

@Entity
@Table(name = "Donation")
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id auto increment
    @Column(name = "donation_id", nullable = false)
    private Long donationId;

    @ManyToOne
    @JoinColumn(name = "project_id", insertable = false, updatable = false)  // This specifies the foreign key column
    private Project project;

    @ManyToOne
    @JoinColumn(name = "donor_id", insertable = false, updatable = false)  // This specifies the foreign key column
    private Donor donor;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "donation_date", updatable = false,nullable = true)
    private LocalDateTime donationDate;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @Column(name = "action", length = 50)
    private String action;

    // Enum
    @Enumerated(EnumType.STRING)
    @Column(name = "donor_type")
    private DonorType donorType;

    @Column(name = "donor_avatar", columnDefinition = "TEXT")
    private String donorAvatar;

    @PrePersist
    public void prePersist() {
        if (this.donationDate == null) {
            this.donationDate = LocalDateTime.now();
        }
    }

    public Donation(Long donationId, BigDecimal amount, LocalDateTime donationDate,
            String name, String message, String action, DonorType donorType, String donorAvatar) {
        this.donationId = donationId;
        this.amount = amount;
        this.donationDate = donationDate;
        this.name = name;
        this.message = message;
        this.action = action;
        this.donorType = donorType;
        this.donorAvatar = donorAvatar;
    }

    public Long getDonationId() {
        return donationId;
    }

    public void setDonationId(Long donationId) {
        this.donationId = donationId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDateTime getDonationDate() {
        return donationDate;
    }

    public void setDonationDate(LocalDateTime donationDate) {
        this.donationDate = donationDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public DonorType getDonorType() {
        return donorType;
    }

    public void setDonorType(DonorType donorType) {
        this.donorType = donorType;
    }

    public String getDonorAvatar() {
        return donorAvatar;
    }

    public void setDonorAvatar(String donorAvatar) {
        this.donorAvatar = donorAvatar;
    }

    public Donation() {
    }
    
}
