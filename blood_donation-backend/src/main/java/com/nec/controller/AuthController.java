package com.nec.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.nec.entity.User;
import com.nec.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AuthController {

    private final UserService userService;

    
    
    
    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    
    
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        User user = userService.login(email, password);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found. Please signup.");
        }
        return ResponseEntity.ok(user);
    }


    
    
    
    @PostMapping(value = "/signup", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> signup(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("bloodGroup") String bloodGroup,
            @RequestParam("phone") String phone,
            @RequestParam("location") String location,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        try {
        	
            if (userService.existsByEmail(email)) {
                return ResponseEntity.badRequest().body("Email already registered.");
            }

            User saved = userService.signup(name, email, password, bloodGroup, phone, location, photo);
            return ResponseEntity.ok(saved);
        } catch (IOException ioe) {
            return ResponseEntity.status(500).body("Failed to process photo");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Signup failed: " + ex.getMessage());
        }
    }
    
    
    
}
