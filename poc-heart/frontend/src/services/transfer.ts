import mqtt, { MqttClient } from "mqtt";
import { AveragedHeartBeatData } from "./buffer";

const MQTT_BROKER_URL = "ws://localhost:9001";
const MQTT_TOPIC = "poc/bpm";

class HeartBeatTransfer {
  private client: MqttClient | null = null;
  private isConnected = false;

  start() {
    if (this.client) return;

    this.client = mqtt.connect(MQTT_BROKER_URL, {
      reconnectPeriod: 3000,
      clientId: `frontend_${Math.random().toString(16).slice(2, 10)}`,
      clean: true,
    });

    this.client.on("connect", () => {
      this.isConnected = true;
      console.log("Pipeline: connecté au broker MQTT");
    });

    this.client.on("error", () => {
      this.isConnected = false;
    });

    this.client.on("offline", () => {
      this.isConnected = false;
    });
  }

  stop() {
    if (this.client) {
      this.client.end();
      this.client = null;
      this.isConnected = false;
    }
  }

  sendData(data: AveragedHeartBeatData) {
    if (!this.client || !this.isConnected) return;

    const payload = {
      sensorId: 1,
      time: data.timestamp,
      heartBeats: data.averageValue,
    };

    this.client.publish(MQTT_TOPIC, JSON.stringify(payload), { qos: 1 }, (error) => {
      if (!error) {
        console.log(`Pipeline: envoyé vers MQTT (${data.averageValue} BPM)`);
      }
    });
  }

  getStatus() {
    return { isConnected: this.isConnected };
  }
}

export const heartBeatTransfer = new HeartBeatTransfer();

