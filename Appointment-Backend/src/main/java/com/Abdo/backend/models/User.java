package com.Abdo.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    private String id;

    private int tele;
    private String imageUrl;
    @NotBlank
    @Size(max = 20)
    private String username;


    @NotBlank
    @Size(max = 20)
    private String city;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;


    @NotBlank
    @Size(max = 120)
    private String password;
    private Set<Role> roles = new HashSet<>();

    private boolean is_doctor = false;







    public User (String username, String password,String email,int tele,String imageUrl,String city) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.imageUrl=imageUrl;
        this.tele=tele;
        this.city = city;

    }




    // getters and setters
}


