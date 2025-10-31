package com.storageservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "heart_beats")
@AllArgsConstructor
@NoArgsConstructor
public class HeartBeat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sensor_id;

    @Column(name = "heart_beats", nullable = false)
    private double heart_beats;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;
}

