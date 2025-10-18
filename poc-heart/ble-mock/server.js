import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 7070 });

console.log("Fake BLE Mock server running on ws://localhost:7070");

setInterval(() => {
  const bpm = 60 + Math.floor(Math.random() * 40);
  const packet = {
    type: "heart_rate",
    value: bpm,
    timestamp: new Date().toISOString(),
  };
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(packet));
    }
  });
}, 1000);
