import WebSocket, { WebSocketServer } from "ws";

const PORT = 7070;
const INTERVAL_MS = 5000;

const MODES = {
  REST: { label: "Repos", mean: 65, sd: 2, min: 55, max: 75, duration: 120000 }, // 2 min
  WARMUP: { label: "Échauffement", mean: 90, sd: 3, min: 80, max: 100, duration: 60000 }, // 1 min
  EXERCISE: { label: "Effort", mean: 130, sd: 5, min: 100, max: 160, duration: 90000 }, // 1.5 min
  COOLDOWN: { label: "Récupération", mean: 95, sd: 4, min: 85, max: 110, duration: 60000 }, // 1 min
};

const MODE_CYCLE = [MODES.REST, MODES.WARMUP, MODES.EXERCISE, MODES.COOLDOWN];
let currentModeIndex = 0;
let currentMode = MODE_CYCLE[currentModeIndex];
let lastBPM = currentMode.mean;
let modeStartTime = Date.now();

const wss = new WebSocketServer({ port: PORT });
console.log(`BLE ECG Mock server running on ws://localhost:${PORT}`);

function randn(mean = 0, sd = 1) {
  return mean + sd * Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

function checkModeChange() {
  const elapsed = Date.now() - modeStartTime;
  if (elapsed >= currentMode.duration) {
    currentModeIndex = (currentModeIndex + 1) % MODE_CYCLE.length;
    currentMode = MODE_CYCLE[currentModeIndex];
    modeStartTime = Date.now();
    const targetBPM = currentMode.mean;
    lastBPM = lastBPM * 0.6 + targetBPM * 0.4;
    console.log(`Mode: ${currentMode.label}`);
  }
}

function nextBPM() {
  let bpm = lastBPM + randn(0, currentMode.sd);
  bpm = Math.max(currentMode.min, Math.min(currentMode.max, bpm));
  lastBPM = bpm;
  return Math.round(bpm);
}

function broadcastBPM() {
  checkModeChange();

  const bpm = nextBPM();
  const packet = {
    value: bpm,
    timestamp: new Date().toISOString(),
  };

  const msg = JSON.stringify(packet);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
}

setInterval(broadcastBPM, INTERVAL_MS);

wss.on("connection", (ws) => {
  console.log("Client connecté");
});
