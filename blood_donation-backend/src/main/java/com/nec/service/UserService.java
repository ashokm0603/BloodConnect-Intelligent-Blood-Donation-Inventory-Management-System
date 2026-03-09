package com.nec.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nec.entity.User;
import com.nec.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

   
    
    
    public User login(String email, String password) {
        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        return user.orElse(null);
    }

    
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    
    public User signup(String name, String email, String password, String bloodGroup,
                       String phone, String location, MultipartFile photo) throws IOException {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setBloodGroup(bloodGroup);
        user.setPhone(phone);
        user.setLocation(location);
        if (photo != null) {
            user.setPhoto(photo.getBytes());
        }
        return userRepository.save(user);
    }
    
    
    
}
