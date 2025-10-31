package com.storageservice.repository;

import com.storageservice.model.HeartBeat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeartBeatRepository extends JpaRepository<HeartBeat, Long> {
}
