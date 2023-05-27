package com.Abdo.backend.controllers;


import com.Abdo.backend.models.*;

import com.Abdo.backend.payload.response.MessageResponse;
import com.Abdo.backend.repositories.DoctorRepository;
import com.Abdo.backend.repositories.UserRepository;
import com.Abdo.backend.services.DoctorService;
import com.Abdo.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/doctors")

public class DoctorController {



    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private UserService userService;
    @Autowired
    private DoctorService doctorService;


    @GetMapping("/search")
    public List<Doctor> searchDoctors(@RequestParam (required = false) String query) {
        List<Doctor> results = doctorRepo.findBySpecializationContainingIgnoreCaseOrNameContainingIgnoreCaseOrCityContainingIgnoreCase(query,query,query);

        return results;






    }


   @PostMapping("/doctor")
    public ResponseEntity<?> createDoctor( @RequestBody Doctor doc){
        //User user = userService.getUserById(userId);
        //user.set_doctor(true);
        Doctor doctor = new Doctor(doc.getName(),doc.getEmail(),doc.getTele(),doc.getImageUrl(),doc.getCity(),doc.getSpecialization(),doc.getDescription(),doc.getLiscence(),doc.getAvailability(),doc.getLocation());
       LocalDate currentDate = LocalDate.now();
       DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");
       String joinDate = currentDate.format(formatter);
       doctor.setJoinDate(joinDate);
        doctorRepo.save(doctor);
        return ResponseEntity.ok().body(new MessageResponse((" successfuly registred as a doctor :)")));
    }


}




