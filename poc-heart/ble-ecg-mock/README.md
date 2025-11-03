# BLE ECG Mock

Simule un capteur cardiaque Bluetooth.

## Démarrage

```bash
npm install
npm start
```

Le serveur WebSocket écoute sur `ws://localhost:7070`

## Fonctionnement

Envoie des données de BPM toutes les 5 secondes via WebSocket.

Le capteur simule un cycle d'activité réaliste :
- Repos (2 min) : 55-75 BPM
- Échauffement (1 min) : 80-100 BPM
- Effort (1.5 min) : 100-160 BPM
- Récupération (1 min) : 85-110 BPM

Format des messages :
```json
{
  "value": 68,
  "timestamp": "2025-11-03T10:45:32.123Z"
}
```

