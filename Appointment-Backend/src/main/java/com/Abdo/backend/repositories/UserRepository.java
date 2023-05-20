package com.Abdo.backend.repositories;

import com.Abdo.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    List<User> findByUsernameContainingIgnoreCase(String username);
    List<User> findByCityContainingIgnoreCase(String city);
   // List<User> findBySpecializationContainingIgnoreCaseOrUsernameContainingIgnoreCaseOrCityContainingIgnoreCase(String sprcialization, String username, String city);
   List<User> findByUsernameContainingIgnoreCaseOrCityContainingIgnoreCase(String username,String city);
}
