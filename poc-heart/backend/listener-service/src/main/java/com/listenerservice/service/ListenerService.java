package com.listenerservice.service;

import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class ListenerService {
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
                System.out.println("📩 Message reçu sur le topic " + topic + " : " + payload);
                handleMessage(payload);
            });

            System.out.println("✅ Abonné au topic: " + topic);

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    private void handleMessage(String payload) {
        System.out.println("Traitement du message: " + payload);
    }
}
