package com.storageservice.service;

import com.storageservice.model.HeartBeat;
import com.storageservice.repository.HeartBeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HeartBeatStorageService {
    private final HeartBeatRepository heartBeatRepository;

    @Autowired
    public HeartBeatStorageService(HeartBeatRepository heartBeatRepository) {
        this.heartBeatRepository = heartBeatRepository;
    }

    public List<HeartBeat> getAllHeartBeat() {
        return heartBeatRepository.findAllByOrderByTimeAsc();
    }

    public List<HeartBeat> getHeartBeatsBySensorId(int sensorId) {
        return heartBeatRepository.findBySensorIdOrderByTimeAsc(sensorId);
    }

    public HeartBeat saveHeartBeat(HeartBeat heartBeat) {
        return heartBeatRepository.save(heartBeat);
    }
}
