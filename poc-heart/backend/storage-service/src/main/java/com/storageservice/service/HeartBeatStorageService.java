package com.storageservice.service;

import com.storageservice.model.HeartBeat;
import com.storageservice.repository.HeartBeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HeartBeatStorageService {
    private final HeartBeatRepository heartBeatRepository;

    public List<HeartBeat> getAllHeartBeat() {
        return heartBeatRepository.findAll();
    }

    public HeartBeat saveHeartBeat(HeartBeat heartBeat) {
        return heartBeatRepository.save(heartBeat);
    }
}
