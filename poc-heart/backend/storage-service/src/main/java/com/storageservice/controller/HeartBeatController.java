package com.storageservice.controller;

import com.storageservice.model.HeartBeat;
import com.storageservice.service.HeartBeatStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/heartbeat")
// cross origin could be only 8080 because of gateway but for test purpose we add also 5173 and 3000
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:8080"})
public class HeartBeatController {
    private final HeartBeatStorageService heartBeatStorageService;

    // Mon lombok bug
    @Autowired
    public HeartBeatController(HeartBeatStorageService heartBeatStorageService) {
        this.heartBeatStorageService = heartBeatStorageService;
    }

    @GetMapping
    public List<HeartBeat> getAll() {
        List<HeartBeat> list = heartBeatStorageService.getAllHeartBeat();
        list.forEach(System.out::println);
        return list;
    }

    @GetMapping("/{sensorId}")
    public List<HeartBeat> getBySensorId(@PathVariable int sensorId) {
        List<HeartBeat> list = heartBeatStorageService.getHeartBeatsBySensorId(sensorId);
        list.forEach(System.out::println);
        return list;
    }

    @PostMapping
    public HeartBeat create(@RequestBody HeartBeat heartBeat) {
        return heartBeatStorageService.saveHeartBeat(heartBeat);
    }
}
