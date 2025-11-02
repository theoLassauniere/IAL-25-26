package com.storageservice.repository;

import com.storageservice.model.HeartBeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HeartBeatRepository extends JpaRepository<HeartBeat, Long> {
    @Query("SELECT h FROM HeartBeat h WHERE h.sensor_id = :sensorId")
    List<HeartBeat> findBySensorId(@Param("sensorId") int sensorId);
}
