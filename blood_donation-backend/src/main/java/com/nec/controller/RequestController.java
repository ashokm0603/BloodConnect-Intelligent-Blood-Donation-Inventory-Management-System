package com.nec.controller;

import com.nec.entity.Request;
import com.nec.entity.User;
import com.nec.repository.RequestRepository;
import com.nec.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{email}")
    public ResponseEntity<?> createRequest(@PathVariable String email, @RequestBody Map<String, String> payload) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Request request = new Request();
        request.setBloodGroup(payload.get("bloodGroup"));
        request.setLocation(payload.get("location"));
        request.setNotes(payload.get("notes"));
        request.setNeededByDate(LocalDate.parse(payload.get("neededByDate")));
        request.setUser(user);

        Request saved = requestRepository.save(request);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getRequestsByUser(@PathVariable String email) {
        List<Request> requests = requestRepository.findByUserEmail(email);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRequests() {
        return ResponseEntity.ok(requestRepository.findAll());
    }
}
