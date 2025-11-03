package com.storageservice.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "heart_beats")
@IdClass(HeartBeatId.class)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HeartBeat {

    @Id
    @Column(name = "sensor_id", nullable = false)
    private int sensorId;

    @Id
    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @Column(name = "heart_beats")
    private double heartBeats;
}
