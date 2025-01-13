package com.example.Charitan.Backend.DTO;



public class DonorRegistrationRequest {

    private String email;
    private String password;
    private String phoneNumber;
    private String address;
    private String avatar;
    private String name;
    private String donorType;
    private String introductionVideo;

    public String getIntroductionVideo() {
        return introductionVideo;
    }

    public void setIntroductionVideo(String introductionVideo) {
        this.introductionVideo = introductionVideo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDonorType() {
        return donorType;
    }

    public void setDonorType(String donorType) {
        this.donorType = donorType;
    }
}
