package com.Abdo.backend.controllers;

import java.util.*;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.Abdo.backend.models.ERole;
import com.Abdo.backend.models.Role;

import com.Abdo.backend.models.User;
import com.Abdo.backend.payload.request.LoginRequest;
import com.Abdo.backend.payload.request.ProfileRequest;
import com.Abdo.backend.payload.request.SignUpRequest;
import com.Abdo.backend.payload.response.JwtResponse;
import com.Abdo.backend.payload.response.MessageResponse;
import com.Abdo.backend.payload.response.ProfileResponse;
import com.Abdo.backend.repositories.RoleRepository;
import com.Abdo.backend.repositories.UserRepository;
import com.Abdo.backend.security.jwt.JwtUtils;
import com.Abdo.backend.security.services.UserDétailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Value("${bezkoder.app.jwtSecret}")
    private String jwtSecret;

    @Value("${bezkoder.app.jwtExpirationMs}")
    private int jwtExpirationMs;


    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;



    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDétailsImpl userDetails = (UserDétailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    roles,
                    userDetails.getImageUrl(),
                    userDetails.getCity(),

                    userDetails.getTele(), userDetails.is_doctor()

            ));
        }
        catch(Exception e){
            e.printStackTrace();
            return  new ResponseEntity<String>("Bad credentials",HttpStatus.NOT_FOUND);

        }

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }



        User user = new User(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),signUpRequest.getEmail(), signUpRequest.getTele(), signUpRequest.getImageUrl(),signUpRequest.getCity());

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();



        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


    @PostMapping("updateProfile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable("id") String id,@RequestBody ProfileRequest user){
        User user1=userRepository.findById(id).get();
        if(user.getUsername()!= null)
            user1.setUsername(user.getUsername());
        if(user.getEmail()!= null)
            user1.setEmail(user.getEmail());
        if(user.getPassword()!= null)
            user1.setPassword(encoder.encode(user.getPassword()));

        User userUpdate=    userRepository.save(user1);
        String token= Jwts.builder().setSubject((userUpdate.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
        Set<Role> setRoles= userUpdate.getRoles();
        List<String> roles=new ArrayList<>();
        for(Role x : setRoles){
            roles.add(x.getName().toString());
        }


        return ResponseEntity.ok(new JwtResponse(token,
                userUpdate.getId(),
                userUpdate.getUsername(),
                userUpdate.getEmail(),
                roles,
                userUpdate.getImageUrl(),
                userUpdate.getCity(), 

                userUpdate.getTele(), userUpdate.is_doctor()
        ));
    }

}
