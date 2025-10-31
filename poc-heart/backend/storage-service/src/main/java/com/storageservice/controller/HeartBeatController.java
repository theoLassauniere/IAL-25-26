package com.storageservice.controller;

import com.storageservice.model.HeartBeat;
import com.storageservice.service.HeartBeatStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/heartbeat")
public class HeartBeatController {
    private final HeartBeatStorageService heartBeatStorageService;

    // Mon lombok bug
    @Autowired
    public HeartBeatController(HeartBeatStorageService heartBeatStorageService) {
        this.heartBeatStorageService = heartBeatStorageService;
    }

    @GetMapping
    public List<HeartBeat> getAll() {
        return heartBeatStorageService.getAllHeartBeat();
    }

    @PostMapping
    public HeartBeat create(@RequestBody HeartBeat heartBeat) {
        return heartBeatStorageService.saveHeartBeat(heartBeat);
    }
}
