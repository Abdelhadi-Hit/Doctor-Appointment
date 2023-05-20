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
    private DoctorService doctorService;

   /* @GetMapping("")
    public List<User> searchDoctors(@RequestParam (required = false) String query, @RequestParam(required = false) String city) {
        List<User> results = null ;

        if (city != null && city != "" && query != null) {
             results = doctorRepository.findByUsernameContainingIgnoreCase(query);


            results = results.stream()
                    .filter(doctor -> doctor.getCity().equalsIgnoreCase(city))
                    .collect(Collectors.toList());

        }
        else{
            if(query !=null){
                // results = doctorRepository.findBySpecializationContainingIgnoreCaseOrUsernameContainingIgnoreCase(query, query);
                results = doctorRepository.findByUsernameContainingIgnoreCase(query);
            }

            if(city!=null){
               results = doctorRepository.findByCityContainingIgnoreCase(city);
            }
        }

       return results;
    }
*/
    @GetMapping("/search")
    public List<Doctor> searchDoctors(@RequestParam (required = false) String query) {
        List<Doctor> results = doctorRepo.findBySpecializationContainingIgnoreCaseOrNameContainingIgnoreCaseOrCityContainingIgnoreCase(query,query,query);

        return results;






    }
   /* @PutMapping("/{userId}")
    public ResponseEntity<?> updateDoctor(@PathVariable String userId,
                                          @RequestParam(required = false) String specialization,
                                          @RequestParam(required = false) String description, @RequestBody Availability availability) {
        // Check if user exists with the given userId
        User existingUser = userService.getUserById(userId);
        List<Availability> userAvailability = existingUser.getAvailability();
        userAvailability.add(availability);
        // Update the doctor's specialization and description
        existingUser.set_doctor(true);
        doctorService.updateDoctor(userId, specialization, description);


        // Return a success response
        return ResponseEntity.ok(existingUser);
    }*/

   @PostMapping("/doctor")
    public ResponseEntity<?> createDoctor( @RequestBody Doctor doc){
        Doctor doctor = new Doctor(doc.getName(),doc.getEmail(),doc.getTele(),doc.getImageUrl(),doc.getCity(),doc.getSpecialization(),doc.getDescription(),doc.getLiscence(),doc.getAvailability(),doc.getLocation());
       LocalDate currentDate = LocalDate.now();
       DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");
       String joinDate = currentDate.format(formatter);
       doctor.setJoinDate(joinDate);
        doctorRepo.save(doctor);
        return ResponseEntity.ok().body(new MessageResponse((" successfuly registred as a doctor :)")));
    }


}




