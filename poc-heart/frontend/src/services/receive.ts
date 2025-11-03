const WS_URL = "ws://localhost:7070";
const RECONNECT_DELAY_MS = 3000;

export interface RawHeartBeatData {
  value: number;
  timestamp: string;
}

type RawDataListener = (data: RawHeartBeatData) => void;

class HeartBeatReceiver {
  private ws: WebSocket | null = null;
  private readonly listeners: RawDataListener[] = [];
  private shouldConnect = false;

  start() {
    this.shouldConnect = true;
    this.connect();
  }

  stop() {
    this.shouldConnect = false;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  addListener(listener: RawDataListener) {
    this.listeners.push(listener);
  }

  private connect() {
    if (!this.shouldConnect) return;

    try {
      this.ws = new WebSocket(WS_URL);

      this.ws.onopen = () => {
        console.log("Pipeline: connecté au capteur");
      };

      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        for (const listener of this.listeners) {
          listener({ value: msg.value, timestamp: msg.timestamp });
        }
      };

      this.ws.onclose = () => {
        this.ws = null;
        if (this.shouldConnect) {
          setTimeout(() => this.connect(), RECONNECT_DELAY_MS);
        }
      };
    } catch (e) {
      if (this.shouldConnect) {
        setTimeout(() => this.connect(), RECONNECT_DELAY_MS);
      }
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

export const heartBeatReceiver = new HeartBeatReceiver();

