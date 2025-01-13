package com.example.Charitan.Backend.API.Admin;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Charitan.Backend.DataModel.Admin;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Đọc tất cả Admin
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Tạo Admin mới
    public void createAdmin(Admin admin) {
        String encodePassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(encodePassword);
        adminRepository.save(admin);
    }

    public boolean updateNewPasswordAdmin(Long adminId, String newPasword) {
        Optional<Admin> exitAdmin = adminRepository.findById(adminId);
        if (exitAdmin.isPresent()){
            Admin admin = exitAdmin.get();
            admin.setPassword(newPasword);
            adminRepository.save(admin);
            return true;
        }
        return false;
    }

    // Xóa Admin theo ID
    public void deleteAdminById(Long id) {
        adminRepository.deleteById(id);
    }
}
