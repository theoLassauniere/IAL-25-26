import React from "react";
import "../styles/Sidebar.css";

type Props = {
  selectedPatientId?: string;
  onSelectPatient: (id: string) => void;
};

export default function Sidebar({ onSelectPatient }: Props) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Médecin - Dr Soucachet</h2>
      <nav>
        <button className="sidebar-disabled-button" disabled title="Fonctionnalité non disponible dans la démo">
          🏠 Tableau de bord
        </button>
        <div className="sidebar-section">
          <button
            className="sidebar-disabled-button"
            disabled
            title="Fonctionnalité non disponible dans la démo"
          >
            👩 Patients
          </button>
          <button
            onClick={() => onSelectPatient("patient-1")}
            className="sidebar-patient-button"
          >
            Jeanne Dupont
          </button>
          <button
            className="sidebar-disabled-patient-button"
            disabled
            title="Fonctionnalité non disponible dans la démo"
          >
            Louis Martin
          </button>
        </div>
        <button
          className="sidebar-disabled-button"
          disabled
          title="Fonctionnalité non disponible dans la démo"
        >
          🧾 Rapports médicaux
        </button>
        <button
          className="sidebar-disabled-button"
          disabled
          title="Fonctionnalité non disponible dans la démo"
        >
          ⚙️ Paramètres
        </button>
      </nav>
    </aside>
  );
}


