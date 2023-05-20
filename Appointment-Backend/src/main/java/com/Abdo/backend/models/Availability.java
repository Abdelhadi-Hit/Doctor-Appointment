package com.Abdo.backend.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class Availability {
    private String dayOfWeek;
    private List<String> timeSlots;
    //private LocalTime endTime;

    // getters and setters for dayOfWeek, startTime, and endTime
}
