import WebSocket, { WebSocketServer } from "ws";

const PORT = 7070;
const INTERVAL_MS = 5000;

const MODES = {
  REST: { label: "Repos", mean: 65, sd: 2, min: 55, max: 75 },
  EXERCISE: { label: "Effort", mean: 130, sd: 5, min: 100, max: 160 },
};

let currentMode = MODES.REST;
let lastBPM = currentMode.mean;

const wss = new WebSocketServer({ port: PORT });
console.log(`BLE ECG Mock server running on ws://localhost:${PORT}`);

function randn(mean = 0, sd = 1) {
  return mean + sd * Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

function nextBPM() {
  let bpm = lastBPM + randn(0, currentMode.sd);
  bpm = Math.max(currentMode.min, Math.min(currentMode.max, bpm));
  lastBPM = bpm;
  return Math.round(bpm);
}

function broadcastBPM() {
  const bpm = nextBPM();
  const packet = {
    type: "heart_rate",
    value: bpm,
    mode: currentMode.label,
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
  ws.send(JSON.stringify({ type: "info", message: "Commandes disponibles: rest / exercise" }));

  ws.on("message", (msg) => {
    const text = msg.toString().trim().toLowerCase();
    if (text === "rest") {
      currentMode = MODES.REST;
      console.log("Mode: Repos");
    } else if (text === "exercise") {
      currentMode = MODES.EXERCISE;
      console.log("Mode: Effort");
    } else {
      ws.send(JSON.stringify({ type: "error", message: "Commande inconnue" }));
    }
  });
});
