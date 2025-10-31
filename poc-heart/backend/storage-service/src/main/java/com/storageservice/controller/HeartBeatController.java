package com.storageservice.controller;

import com.storageservice.model.HeartBeat;
import com.storageservice.service.HeartBeatStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/heartbeat")
@RequiredArgsConstructor
public class HeartBeatController {
    private final HeartBeatStorageService heartBeatStorageService;

    @GetMapping
    public List<HeartBeat> getAll() {
        return heartBeatStorageService.getAllHeartBeat();
    }

    @PostMapping
    public HeartBeat create(@RequestBody HeartBeat heartBeat) {
        return heartBeatStorageService.saveHeartBeat(heartBeat);
    }
}
