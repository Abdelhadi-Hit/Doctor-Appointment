package com.Abdo.backend.repositories;

import com.Abdo.backend.models.Doctor;
import com.Abdo.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DoctorRepository extends MongoRepository<Doctor,String> {
    List<Doctor> findByNameContainingIgnoreCase(String name);
    List<Doctor> findByCityContainingIgnoreCase(String city);


    List<Doctor> findBySpecializationContainingIgnoreCaseOrNameContainingIgnoreCaseOrCityContainingIgnoreCase(String sprcialization, String name, String city);
}
