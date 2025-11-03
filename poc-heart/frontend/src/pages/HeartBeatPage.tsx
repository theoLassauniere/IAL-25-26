import React, { useEffect, useState } from "react";
import { getHeartBeats } from "../api/api";
import { HeartBeat } from "../types/heartbeat";
import HeartBeatChart from "../components/HeartBeatChart";
import { mockPatient } from "../mock/mockPatient";
import "../styles/HeartBeatPage.css";

export default function HeartBeatPage({ onDataRefresh }: { onDataRefresh: () => void }) {
  const [data, setData] = useState<HeartBeat[]>([]);
  const [loading, setLoading] = useState(false);
  const sensorId = mockPatient.sensorId;

  const load = async () => {
    setLoading(true);
    const hb = await getHeartBeats(sensorId);
    setData(hb);
    setLoading(false);
    onDataRefresh();
  };

  useEffect(() => {
    load();

    const interval = setInterval(() => {
      load();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="heartbeat-container">
      <div className="heartbeat-header">
        <h3 className="heartbeat-title">
          ❤️ Fréquence cardiaque
        </h3>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <div>Chargement des données...</div>
        </div>
      ) : (
        <HeartBeatChart data={data} />
      )}
    </div>
  );
}


