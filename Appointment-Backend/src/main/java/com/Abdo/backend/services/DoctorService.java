package com.Abdo.backend.services;

import com.Abdo.backend.models.User;
import com.Abdo.backend.models.Doctor;
import com.Abdo.backend.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private DoctorRepository doctorRepository;

    public void updateDoctor(String userId, String specialization, String description) {
        Query query = new Query(Criteria.where("id").is(userId));
        Update update = new Update().set("specialization", specialization).set("description", description);
        mongoTemplate.updateFirst(query, update, User.class);
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor getDoctorById(String id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor updateDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(String id) {
        doctorRepository.deleteById(id);
    }

}
