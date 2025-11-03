import { RawHeartBeatData } from "./receive";

const MIN_BPM = 30;
const MAX_BPM = 220;
const MAX_VARIATION = 50;

type FilteredDataListener = (data: RawHeartBeatData) => void;

class HeartBeatFilter {
  private listeners: FilteredDataListener[] = [];
  private lastValidValue: number | null = null;

  filter(data: RawHeartBeatData): void {
    const bpm = data.value;

    if (bpm < MIN_BPM || bpm > MAX_BPM) return;

    if (this.lastValidValue !== null) {
      const variation = Math.abs(bpm - this.lastValidValue);
      if (variation > MAX_VARIATION) return;
    }

    this.lastValidValue = bpm;

    for (const listener of this.listeners) {
      listener(data);
    }
  }

  addListener(listener: FilteredDataListener) {
    this.listeners.push(listener);
  }
}

export const heartBeatFilter = new HeartBeatFilter();

