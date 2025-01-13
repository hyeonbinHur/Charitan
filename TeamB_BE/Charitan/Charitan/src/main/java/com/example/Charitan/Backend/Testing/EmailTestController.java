package com.example.Charitan.Backend.Testing;

import com.example.Charitan.Backend.Email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/send-test-email")
    public String sendTestEmail() {
        try {
            // Replace with the recipient's email address
            String recipient = "darmondcv@gmail.com";
            String subject = "Test Email";
            String content = "<h1>This is a test email from Charitan!</h1><p>Everything is working fine!</p>";

            emailService.sendEmail(recipient, subject, content);

            return "Test email sent successfully to " + recipient + "!";
        } catch (Exception e) {
            return "Failed to send test email: " + e.getMessage();
        }
    }


}
