package com.Abdo.backend.payload.response;


import lombok.Data;

import java.util.List;
@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String username;
    private String email;

    private int budget ;
    private int tele ;
    private String image ;
    private boolean is_doctor;
    private String city;
    private List<String> roles;

    public JwtResponse(String accessToken, String id, String username, String email, List<String> roles,String image,String city,int tele,boolean is_doctor ) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.city = city;
        this.roles = roles;
        this.is_doctor = is_doctor;
        this.tele=tele;
        this.image=image;
    }






}