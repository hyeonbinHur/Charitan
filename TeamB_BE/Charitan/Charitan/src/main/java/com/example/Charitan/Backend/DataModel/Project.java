package com.example.Charitan.Backend.DataModel;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.Charitan.Backend.Enum.ProjectCategory;
import com.example.Charitan.Backend.Enum.ProjectStatus;

import jakarta.persistence.*;

@Entity
@Table(name = "Charity_Project")
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id auto increment
    @Column(name = "project_id")
    private Long projectId;

    @ManyToOne
    @JoinColumn(name = "charity_id", referencedColumnName = "charity_id")  // This specifies the foreign key column
    private Charity charity;

    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    // Enum
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private ProjectCategory category;

    @Column(name = "target_amount", nullable = false)
    private BigDecimal targetAmount;

    @Column(name = "current_funding")
    private BigDecimal curentFunding;

    // Enum
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ProjectStatus projectStatus;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", updatable = false)
    private LocalDateTime updateAt;

    @Column(name = "bankaccount", length = 45, nullable = false)
    private String bankAccount;

    @Column(name = "charity_name", length = 45)
    private String charityName;

    @Column(name = "thumbnail", columnDefinition = "TEXT")
    private String thumbnail;

    @Column(name = "Highlight", length = 45)
    private String hightlight;

    public Project(Long projectId, String title, String description, ProjectCategory projectCategory,
            BigDecimal targetAmount, BigDecimal curentFunding, ProjectStatus projectStatus, LocalDateTime createdAt,
            LocalDateTime updateAt, String bankAccount, String charityName, String thumbnail, String hightlight) {
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.category = projectCategory;
        this.targetAmount = targetAmount;
        this.curentFunding = curentFunding;
        this.projectStatus = projectStatus;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.bankAccount = bankAccount;
        this.charityName = charityName;
        this.thumbnail = thumbnail;
        this.hightlight = hightlight;
    }

    public Project() {
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(BigDecimal targetAmount) {
        this.targetAmount = targetAmount;
    }

    public BigDecimal getCurentFunding() {
        return curentFunding;
    }

    public void setCurentFunding(BigDecimal curentFunding) {
        this.curentFunding = curentFunding;
    }

    public ProjectStatus getProjectStatus() {
        return projectStatus;
    }

    public void setProjectStatus(ProjectStatus projectStatus) {
        this.projectStatus = projectStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public String getCharityName() {
        return charityName;
    }

    public void setCharityName(String charityName) {
        this.charityName = charityName;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public ProjectCategory getCategory() {
        return category;
    }

    public void setCategory(ProjectCategory category) {
        this.category = category;
    }

    public Charity getCharity() {
        return charity;
    }

    public void setCharity(Charity charity) {
        this.charity = charity;
    }

    public String getHightlight() {
        return hightlight;
    }

    public void setHightlight(String hightlight) {
        this.hightlight = hightlight;
    }
    
    
}
