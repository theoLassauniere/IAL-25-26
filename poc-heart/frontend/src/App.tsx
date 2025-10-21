import React, { useEffect, useState } from "react";

const WS_URL = "ws://localhost:7070";

function App() {
  const [bpm, setBpm] = useState<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => console.log("Connected to BLE Mock:", WS_URL);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "heart_rate") setBpm(data.value);
    };
    ws.onclose = () => console.log("Disconnected from BLE Mock");

    return () => ws.close();
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "2rem" }}>
      <h1>Capteur cardiaque mock</h1>
      {bpm ? (
        <h2>
          Fréquence cardiaque : <span style={{ color: "red" }}>{bpm} bpm</span>
        </h2>
      ) : (
        <p>Connexion au capteur...</p>
      )}
    </div>
  );
}

export default App;
