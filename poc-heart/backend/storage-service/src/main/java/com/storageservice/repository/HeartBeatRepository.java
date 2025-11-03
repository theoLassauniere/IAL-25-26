package com.storageservice.repository;

import com.storageservice.model.HeartBeat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HeartBeatRepository extends JpaRepository<HeartBeat, Long> {
    List<HeartBeat> findBySensorIdOrderByTimeAsc(int sensorId);
    List<HeartBeat> findAllByOrderByTimeAsc();
}
