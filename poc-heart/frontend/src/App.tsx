import React, { useEffect, useState } from "react";

const WS_URL = "ws://localhost:7070";

function App() {
  const [bpm, setBpm] = useState<number | null>(null);
  const [mode, setMode] = useState<"rest" | "exercise">("rest");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    setWs(socket);

    socket.onopen = () => console.log("Connecté à", WS_URL);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "heart_rate") {
        setBpm(data.value);
      }
    };
    socket.onclose = () => console.log("Déconnecté du serveur");

    return () => socket.close();
  }, []);

  const toggleMode = () => {
    if (!ws) return;
    const newMode = mode === "rest" ? "exercise" : "rest";
    ws.send(newMode);
    setMode(newMode);
  };

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
      <button
        onClick={toggleMode}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          borderRadius: "8px",
          background: mode === "rest" ? "#4caf50" : "#f44336",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Mode : {mode === "rest" ? "Repos" : "Effort"}
      </button>
    </div>
  );
}

export default App;
