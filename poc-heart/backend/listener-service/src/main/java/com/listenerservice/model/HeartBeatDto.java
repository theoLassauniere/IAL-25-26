package com.listenerservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class HeartBeatDto {
    private int sensorId;
    private LocalDateTime time;
    private double heartBeats;
}