package com.listenerservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class ListenerService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Value("${mqtt.broker}")
    private String brokerUrl;

    @Value("${mqtt.client.id}")
    private String clientId;

    @Value("${mqtt.topic}")
    private String topic;


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
            String time = json.get("time").asText();
            double heartBeats = json.get("heartBeats").asDouble();

            System.out.println("Capteur #" + sensorId + " | BPM: " + heartBeats + " | " + time);
        } catch (Exception e) {
            System.err.println("Erreur parsing: " + e.getMessage());
        }
    }
}
