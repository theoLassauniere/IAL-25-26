import React from "react";
import "../styles/PlaceholderPage.css";

export default function PlaceholderPage() {
  return (
    <div className="placeholder-container">
      <div className="placeholder-icon">🚧</div>
      <h2 className="placeholder-title">Fonctionnalité non disponible dans la démo</h2>
      <p className="placeholder-description">
        Cette section fait partie de l'interface complète,
        mais n'est pas implémentée dans ce POC.
      </p>
      <p className="placeholder-note">
        Seule la vue <strong>Fréquence cardiaque</strong> est fonctionnelle
        et connectée au backend.
      </p>
    </div>
  );
}


