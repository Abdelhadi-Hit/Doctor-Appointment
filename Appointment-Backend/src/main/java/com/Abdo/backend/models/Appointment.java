package com.Abdo.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Appointment {

    @Id
    private String appId;

    private Date date;

    private String  location;

    private String docImage;

    private String docName;

    private String patImage;
    private String patName;

    private String time;

    private String docId;

    private String patId;

    private String status;


}
