import { HeartBeat } from "../types/heartbeat";
import mock from "../mock/mockHeartbeats";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export async function getHeartBeats(sensorId?: number): Promise<HeartBeat[]> {
  try {
    const url = sensorId
      ? `${BASE}/api/heartbeat/${sensorId}`
      : `${BASE}/api/heartbeat`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Non-OK");
    const json = await res.json();
    return json as HeartBeat[];
  } catch (e) {
    console.warn("API unavailable, using mock heartbeats", e);
    return mock;
  }
}

