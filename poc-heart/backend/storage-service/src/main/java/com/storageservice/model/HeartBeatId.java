package com.storageservice.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeartBeatId implements Serializable {
    private int sensorId;
    private LocalDateTime time;
}
