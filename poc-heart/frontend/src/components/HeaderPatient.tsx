import React, { useEffect, useState } from "react";
import "../styles/HeaderPatient.css";

function getTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "à l'instant";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours}h`;

  const days = Math.floor(hours / 24);
  return `il y a ${days}j`;
}

export default function HeaderPatient({
  name,
  age,
  lastUpdate
}: {
  name: string;
  age: number;
  lastUpdate: Date;
}) {
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(lastUpdate));

  useEffect(() => {
    setTimeAgo(getTimeAgo(lastUpdate));

    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(lastUpdate));
    }, 10000); // Mise à jour toutes les 10 secondes

    return () => clearInterval(interval);
  }, [lastUpdate]);

  return (
    <div className="header-patient">
      <div className="header-left-section">
        <div className="header-avatar">👩</div>
        <div>
          <div className="header-name">{name}</div>
          <div className="header-info">
            {age} ans • Dernière maj : {timeAgo}
          </div>
        </div>
      </div>
      <div>
        <button
          className="header-button"
          title="Fonctionnalité non disponible dans la démo"
        >
          Changer de patient
        </button>
      </div>
    </div>
  );
}


