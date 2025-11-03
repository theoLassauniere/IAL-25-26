import { RawHeartBeatData } from "./receive";

const BUFFER_INTERVAL_MS = 30000;

export interface AveragedHeartBeatData {
  averageValue: number;
  minValue: number;
  maxValue: number;
  sampleCount: number;
  timestamp: string; // Timestamp de la fin de l'intervalle
  intervalStart: string;
  intervalEnd: string;
}

type BufferedDataListener = (data: AveragedHeartBeatData) => void;

class HeartBeatBuffer {
  private listeners: BufferedDataListener[] = [];
  private buffer: number[] = [];
  private intervalTimer: ReturnType<typeof setInterval> | null = null;
  private intervalStartTime: Date | null = null;
  private isActive = false;

  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.buffer = [];
    this.intervalStartTime = new Date();
    this.intervalTimer = setInterval(() => this.flushBuffer(), BUFFER_INTERVAL_MS);
    console.log("Pipeline: buffer démarré (30s)");
  }

  stop() {
    this.isActive = false;
    if (this.intervalTimer !== null) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
    if (this.buffer.length > 0) this.flushBuffer();
  }

  addData(data: RawHeartBeatData) {
    if (!this.isActive) return;
    this.buffer.push(data.value);
  }

  private flushBuffer() {
    if (this.buffer.length === 0) return;

    const intervalEnd = new Date();
    const intervalStart = this.intervalStartTime || intervalEnd;
    const sum = this.buffer.reduce((acc, val) => acc + val, 0);
    const average = sum / this.buffer.length;

    const averagedData: AveragedHeartBeatData = {
      averageValue: Math.round(average * 10) / 10,
      minValue: Math.min(...this.buffer),
      maxValue: Math.max(...this.buffer),
      sampleCount: this.buffer.length,
      timestamp: intervalEnd.toISOString(),
      intervalStart: intervalStart.toISOString(),
      intervalEnd: intervalEnd.toISOString(),
    };


    for (const listener of this.listeners) {
      listener(averagedData);
    }

    this.buffer = [];
    this.intervalStartTime = new Date();
  }

  addListener(listener: BufferedDataListener) {
    this.listeners.push(listener);
  }

  getStatus() {
    return {
      isActive: this.isActive,
      bufferSize: this.buffer.length,
    };
  }
}

export const heartBeatBuffer = new HeartBeatBuffer();

