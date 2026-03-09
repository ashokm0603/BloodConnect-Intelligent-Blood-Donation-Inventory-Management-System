package com.nec.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nec.entity.Donation;
import com.nec.entity.User;
import com.nec.repository.DonationRepository;
import com.nec.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class DonationController {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{email}")
    public ResponseEntity<?> createDonation(@PathVariable String email, @RequestBody Map<String, String> payload) {
        User user = userRepository.findByEmail(email).orElse(null); // 🔄 using Optional
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Donation donation = new Donation();
        donation.setDate(LocalDate.parse(payload.get("date")));
        donation.setTime(LocalTime.parse(payload.get("time")));
        donation.setLocation(payload.get("location"));
        donation.setNotes(payload.get("notes"));
        donation.setUser(user);

        Donation saved = donationRepository.save(donation);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getDonationsByUser(@PathVariable String email) {
        List<Donation> donations = donationRepository.findByUserEmail(email);
        return ResponseEntity.ok(donations);
    }
}
