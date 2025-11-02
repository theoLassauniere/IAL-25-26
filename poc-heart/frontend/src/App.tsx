import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import HeaderPatient from "./components/HeaderPatient";
import HeartBeatPage from "./pages/HeartBeatPage";
import PlaceholderPage from "./components/PlaceholderPage";
import { mockPatient } from "./mock/mockPatient";
import "./styles/App.css";

function App() {
  const [selectedPatient] = useState(mockPatient);
  const [tab, setTab] = useState<'cardiac' | 'temp' | 'glucose' | 'oxygen' | 'activity'>('cardiac');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  return (
    <div className="app-container">
      <Sidebar onSelectPatient={() => { /* pour la demo on garde le mock */ }} />
      <div className="main-content">
        <HeaderPatient
          name={selectedPatient.name}
          age={selectedPatient.age}
          lastUpdate={lastUpdate}
        />
        <div className="tab-bar">
          <nav className="tab-nav">
            <button
              onClick={() => setTab('cardiac')}
              className={tab === 'cardiac' ? 'active-tab' : 'tab'}
            >
              ❤️ Cardiaque
            </button>
            <button
              onClick={() => setTab('temp')}
              className={tab === 'temp' ? 'active-tab' : 'inactive-tab'}
              title="Fonctionnalité non disponible dans la démo"
            >
              🌡️ Température
            </button>
            <button
              onClick={() => setTab('glucose')}
              className={tab === 'glucose' ? 'active-tab' : 'inactive-tab'}
              title="Fonctionnalité non disponible dans la démo"
            >
              🩸 Glycémie
            </button>
            <button
              onClick={() => setTab('oxygen')}
              className={tab === 'oxygen' ? 'active-tab' : 'inactive-tab'}
              title="Fonctionnalité non disponible dans la démo"
            >
              🫁 Oxygène
            </button>
            <button
              onClick={() => setTab('activity')}
              className={tab === 'activity' ? 'active-tab' : 'inactive-tab'}
              title="Fonctionnalité non disponible dans la démo"
            >
              🦶 Activité
            </button>
          </nav>
        </div>

        <div className="content">
          {tab === 'cardiac' && <HeartBeatPage onDataRefresh={() => setLastUpdate(new Date())} />}
          {tab !== 'cardiac' && <PlaceholderPage />}
        </div>
      </div>
    </div>
  );
}


export default App;
