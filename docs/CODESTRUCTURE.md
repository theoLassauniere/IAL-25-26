# Structure de code

Le projet suit une architecture microservices avec plusieurs composants distincts organisés de manière modulaire.

## poc-heart

Le répertoire poc-heart contient les principaux services :

- frontend/ : Application React/TypeScript avec Vite qui gère l'interface utilisateur.
- backend/storage-service/ : Service Spring Boot en Java gérant le stockage des données cardiaques avec une architecture en couches (controller, service, repository, model).
- ble-ecg-mock/ : Simulateur de capteur cardiaque BLE en Node.js qui émet des données via WebSocket.
- mqtt/ : Configuration du broker MQTT Mosquitto qui assure la communication entre le front du téléphone et le backend dans le cloud.
- db/ : Configuration TimescaleDB pour le stockage des données temporelles avec un script d'initialisation.

L'ensemble est orchestré via Docker Compose, permettant un déploiement cohérent et isolé des différents services.

## Gateway

L'API Gateway agit comme le point d'entrée unique et sécurisé pour toutes les requêtes provenant de l'application mobile.
Elle fonctionne comme un "aiguilleur" intelligent, elle analyse chaque requête, vérifie l'identité de l'utilisateur (authentification) et la route ensuite vers le microservice interne approprié (comme le Service Connection ou le Service Gestion des Rapport).
En plus de ce routage, elle centralise des tâches critiques comme la protection contre les abus (limitation de débit) et la journalisation des accès.
Cela permet de simplifier les microservices, qui n'ont plus à se soucier de l'authentification et peuvent se concentrer sur leur logique métier.
