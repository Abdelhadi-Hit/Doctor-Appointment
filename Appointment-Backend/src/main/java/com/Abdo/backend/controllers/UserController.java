package com.Abdo.backend.controllers;

import com.Abdo.backend.models.Appointment;
import com.Abdo.backend.models.User;
import com.Abdo.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    UserRepository userRepository;


    @PostMapping("")
    public User createAppointment(@RequestBody User user) {
        return userRepository.save(user);
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<Optional> getUser(@PathVariable("id") String userId) {
        Optional user = userRepository.findById(userId);
        return ResponseEntity.ok(user);
    }

}