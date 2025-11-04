package com.listenerservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.listenerservice.model.HeartBeatDto;
import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;


@Service
public class ListenerService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Value("${mqtt.broker}")
    private String brokerUrl;

    @Value("${gateway.url}")
    private String gatewayUrl;

    @Value("${mqtt.client.id}")
    private String clientId;

    @Value("${mqtt.topic}")
    private String topic;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostConstruct
    public void init() {
        try {
            MqttClient mqttClient = new MqttClient(brokerUrl, clientId, new MemoryPersistence());
            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);
            options.setAutomaticReconnect(true);

            mqttClient.connect(options);

            mqttClient.subscribe(topic, (topic, message) -> {
                String payload = new String(message.getPayload());
                System.out.println("Message reçu sur le topic " + topic + " : " + payload);
                handleMessage(payload);
            });
            System.out.println("Abonné au topic: " + topic);

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    private void handleMessage(String payload) {
        try {
            JsonNode json = objectMapper.readTree(payload);
            int sensorId = json.get("sensorId").asInt();
            LocalDateTime time = OffsetDateTime.parse(json.get("time").asText())
                    .toLocalDateTime().plusHours(1); // To match time-zone
            double heartBeats = json.get("heartBeats").asDouble();
            System.out.println("Capteur #" + sensorId + " | BPM: " + heartBeats + " | " + time);

            HeartBeatDto heartBeatDto = new HeartBeatDto(sensorId, time, heartBeats);
            sendHeartBeatDtoToStorageService(heartBeatDto);

        } catch (Exception e) {
            System.err.println("Erreur parsing: " + e.getMessage());
        }
    }

    private void sendHeartBeatDtoToStorageService(HeartBeatDto heartBeatDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<HeartBeatDto> request = new HttpEntity<>(heartBeatDto, headers);

        try {
            HeartBeatDto response = restTemplate.postForObject(gatewayUrl + "/storage/heartbeat", request, HeartBeatDto.class);
            System.out.println("Heartbeat stocké avec succès : " + response);
        } catch (Exception e) {
            System.err.println("Erreur lors de l’envoi du heartbeat : " + e.getMessage());
        }
    }
}
