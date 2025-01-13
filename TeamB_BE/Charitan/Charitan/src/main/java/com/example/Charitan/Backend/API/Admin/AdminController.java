package com.example.Charitan.Backend.API.Admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Charitan.Backend.DataModel.Admin;

@RestController
@RequestMapping("/api/admins")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Đọc tất cả Admin
    @GetMapping("/get")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // Tạo Admin mới
    @PostMapping("/create")
    public void createAdmin(@RequestBody Admin admin) {
        adminService.createAdmin(admin);
    }

    @PutMapping("/update-password")
    public boolean updatePasswordAdmin(@RequestParam Long adminId, @RequestParam String newPassword){
        String encodedPassword = passwordEncoder.encode(newPassword);
        return adminService.updateNewPasswordAdmin(adminId, encodedPassword);
    }

    // Xóa Admin theo ID
    @DeleteMapping("/delete/{id}")
    public void deleteAdminById(@PathVariable Long id) {
        adminService.deleteAdminById(id);
    }
}
