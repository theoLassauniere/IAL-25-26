import { HeartBeat } from "../types/heartbeat";

const now = new Date();
const mock: HeartBeat[] = Array.from({length: 80}).map((_, i) => {
  const t = new Date(now.getTime() - (80 - i) * 60 * 1000); // 1 point/minute
  const beat = 70 + 12 * Math.sin(i / 5) + (Math.random() * 6 - 3);
  return { sensorId: 1, time: t.toISOString(), heartBeats: Math.round(beat * 10) / 10 };
});

export default mock;

