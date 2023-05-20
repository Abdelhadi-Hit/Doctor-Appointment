package com.Abdo.backend.repositories;

import com.Abdo.backend.models.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment,String> {


    List<Appointment> findByDocId(String docId);
    List<Appointment> findByPatId(String patId);
}
