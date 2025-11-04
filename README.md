# IAL-25-26

Membres de l'équipe : Théo Lassaunière, Thibault Ripoche, Mathis Jullien, Julie Seyier

## Démarrage rapide

### 1. Cloner le dépôt

```bash
git clone https://github.com/theoLassauniere/IAL-25-26.git
cd IAL-25-26
```

### 2. Lancer l’architecture complète avec Docker Compose

Il faut avoir Docker et Docker Compose installés et exécuter :

```bash
docker compose up --build
```

### 3. Accéder à l’application

Une fois le build terminé, ouvrez votre navigateur sur http://localhost:3000, et voilà ! 
Vous devriez voir l’interface utilisateur affichant les données du capteur cardiaque.

## Ports et Services du POC

| Service                 | Port Interne | Port Externe | Protocole  | Description                                                       |
|-------------------------|--------------|--------------|------------|-------------------------------------------------------------------|
| frontend                | 3000         | 3000         | HTTP       | Interface utilisateur React (affichage du capteur cardiaque mock) |
| ble-mock                | 7070         | 7070         | WebSocket  | Mock ECG BLE simulant la connexion avec un capteur cardiaque      |
| mqtt-broker             | 1883         | 1883         | MQTT (TCP) | Broker Mosquitto pour la communication inter-services             |
| mqtt-broker (WebSocket) | 9001         | 9001         | MQTT (WS)  | Accès WebSocket au broker pour le frontend                        |
| gateway                 | 8080         | 8080         | HTTP       | Gateway redirigeant vers les différents services du backend       |
| storage-service         | 8081         | 8081         | HTTP       | Service de gesstion des données en DB                             |
| listener-service        | 8082         | 8082         | HTTP       | Service d'écoute des données sur le broker MQTT                   |
| timescaledb             | 5400         | 5432         | TCP        | Database contenant les relevés cardiaques                         |

### 4. (Optionnel) Accéder à la base de données TimescaleDB

Vous pouvez utiliser un client PostgreSQL pour vous connecter à la base de données TimescaleDB.
Pour ce faire, ajouter un nouveau serveur avec les informations suivantes :
- Hôte : `localhost`
- Port : `5400`
- Utilisateur : `postgres`
- Mot de passe : `postgres`