package com.nec.controller;

import com.nec.entity.Donor;
import com.nec.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class DonorController {

    private final DonorRepository donorRepository;

    @Autowired
    public DonorController(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    @PostMapping(value = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> registerDonor(
            @RequestParam("name") String name,
            @RequestParam("age") int age,
            @RequestParam("gender") String gender,
            @RequestParam("bloodGroup") String bloodGroup,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam("location") String location,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        try {
            if (donorRepository.existsByEmail(email)) {
                return ResponseEntity.badRequest().body("Donor with this email is already registered.");
            }

            Donor donor = new Donor();
            donor.setName(name);
            donor.setAge(age);
            donor.setGender(gender);
            donor.setBloodGroup(bloodGroup);
            donor.setPhone(phone);
            donor.setEmail(email);
            donor.setLocation(location);

            if (photo != null && !photo.isEmpty()) {
                donor.setPhoto(photo.getBytes());
            }

            Donor savedDonor = donorRepository.save(donor);
            return ResponseEntity.ok(savedDonor);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to process photo");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Registration failed: " + ex.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllDonors() {
        return ResponseEntity.ok(donorRepository.findAll());
    }
}
