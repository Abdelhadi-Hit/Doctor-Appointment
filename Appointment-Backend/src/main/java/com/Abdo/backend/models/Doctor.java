package com.Abdo.backend.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Doctor {
    @Id
    private String id;

    private String docId;

    private int tele;
    private String imageUrl;
    @NotBlank
    @Size(max = 20)
    private String name;


    @NotBlank
    @Size(max = 20)
    private String city;

    @NotBlank
    @Size(max = 20)
    private String specialization;

    @NotBlank
    @Size(max = 200)
    private String description;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6,max = 11)
    private String liscence;

    @NotBlank
    @Size(max=40)
    private String location;


    private String joinDate;


    private Map<String, Boolean> availability;









    public Doctor(String name ,String email,int tele,String imageUrl,String city,String specialization,String description,String liscence,Map<String, Boolean> availability,String location) {
        this.name = name;
        this.email = email;
        this.imageUrl=imageUrl;
        this.city = city;
        this.tele=tele;
        this.specialization = specialization;
        this.description  = description;
        this.liscence = liscence;
        this.availability = availability;
        this.location = location;



    }




    // getters and setters
}

