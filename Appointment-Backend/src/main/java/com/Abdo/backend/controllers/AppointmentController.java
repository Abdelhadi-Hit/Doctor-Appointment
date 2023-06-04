package com.Abdo.backend.controllers;

import com.Abdo.backend.models.Appointment;
import com.Abdo.backend.payload.response.MessageResponse;
import com.Abdo.backend.repositories.DoctorRepository;
import com.Abdo.backend.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.text.SimpleDateFormat;
import com.Abdo.backend.models.Doctor;
import java.util.Date;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 10000)
@RequestMapping("/api/v1/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private DoctorRepository doctorRepository;


    @PostMapping("")
    public ResponseEntity<?> createAppointment(@RequestBody Appointment appointment) {

        if (isAppointmentAvailable(appointment)){
            appointmentService.createAppointment(appointment);
            return ResponseEntity.ok().body(new MessageResponse(("Appointment is Available 📆")));

        }
        else{
            return ResponseEntity.badRequest().body(new MessageResponse("Appointment is not Available 🙁"));
        }



    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable String id) {
        return appointmentService.getAppointmentById(id);
    }

    @GetMapping("/maker/{id}")
    public  List<Appointment> getAppoitmentByPatId(@PathVariable String id){
        return appointmentService.findByPatId(id);
    }

    @GetMapping("/doctor/{id}")
    public List<Appointment> getAppointmentByDocId(@PathVariable String id){
        return appointmentService.findByDocId(id);
    }

    @GetMapping("")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable String id, @RequestBody Appointment appointment) {
        Appointment existingAppointment = appointmentService.getAppointmentById(id);
        if (existingAppointment == null) {
            return null;
        }
        appointment.setAppId(id);
        return appointmentService.updateAppointment(appointment);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable String id) {
        appointmentService.deleteAppointment(id);
    }


    @PutMapping("status/{id}")
    public Appointment updateAppointmentStatus(@PathVariable("id") String AppId){
        Appointment app = appointmentService.getAppointmentById(AppId);
        if(app == null){
            return null;
        }
        app.setStatus("Confirmed");
        return appointmentService.updateAppointment(app);

    }

    private boolean isAppointmentAvailable(Appointment appointmentData) {
        // Retrieve the day of the week from the date and check availability in the Doctor object
        Date appointmentDate = appointmentData.getDate();
        System.out.println(appointmentDate);
        String dayOfWeek = getDayOfWeek(appointmentDate);
        System.out.println(dayOfWeek);

        // Get the doctor's availability
        Doctor doctor = doctorRepository.findByDocId(appointmentData.getDocId());
        System.out.println(doctor.getAvailability());
        if (doctor != null) {
            // Check if the doctor is available on the specified day
            Map<String, Boolean> availability = doctor.getAvailability();
            Boolean isAvailable = availability.get(getEnglishDayOfWeek(dayOfWeek).toLowerCase());
            System.out.println(isAvailable);
            return isAvailable != null && isAvailable;
        }

        return false; // Doctor not found or day of the week not available
    }

    private String getDayOfWeek(Date date) {
        // Logic to get the day of the week from a Date object
        SimpleDateFormat sdf = new SimpleDateFormat("EEEE");
        String dayOfWeek = sdf.format(date);
        dayOfWeek = dayOfWeek.toLowerCase();
        System.out.println(dayOfWeek);
        return dayOfWeek;
    }

    private String getEnglishDayOfWeek(String frenchDayOfWeek) {
        // Custom conversion logic from French day of week to English day of week
        String englishDayOfWeek;

        switch (frenchDayOfWeek.toLowerCase()) {
            case "lundi":
                englishDayOfWeek = "monday";
                break;
            case "mardi":
                englishDayOfWeek = "tuesday";
                break;
            case "mercredi":
                englishDayOfWeek = "wednesday";
                break;
            case "jeudi":
                englishDayOfWeek = "thursday";
                break;
            case "vendredi":
                englishDayOfWeek = "friday";
                break;
            case "samedi":
                englishDayOfWeek = "saturday";
                break;
            case "dimanche":
                englishDayOfWeek = "sunday";
                break;
            default:
                throw new IllegalArgumentException("Invalid French day of week: " + frenchDayOfWeek);
        }

        return englishDayOfWeek;
    }




}

