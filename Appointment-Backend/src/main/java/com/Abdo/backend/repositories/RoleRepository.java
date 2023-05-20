package com.Abdo.backend.repositories;

import com.Abdo.backend.models.ERole;

import com.Abdo.backend.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RoleRepository extends MongoRepository<Role, Long> {
    Optional<Role> findByName(ERole name);


}
