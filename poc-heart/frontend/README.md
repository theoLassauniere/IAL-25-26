# Frontend - Interface Médecin

**React + TypeScript**
- Système de composants réutilisables et maintenables
- TypeScript apporte la sécurité du typage statique
- Détection des erreurs à la compilation plutôt qu'à l'exécution

**Vite**
- Build tool moderne et rapide
- Configuration minimale comparée à Webpack
- Optimisations de production

**Chart.js + react-chartjs-2**
- Bibliothèque éprouvée pour la visualisation de données
- Supporte nativement les échelles temporelles (axe X avec dates)
- Performances correctes même avec de nombreux points de données
- Possibilité d'ajouter des seuils d'alerte visuels plus tard

## Installation et lancement

### Prérequis

- Node.js 18+ et npm
- Backend lancé (ou possibilité d'utiliser le mode mock)

### Installation

Depuis le dossier `frontend/` :

```bash
npm install
```

### Configuration

L'URL du backend peut être configurée via une variable d'environnement. Créez un fichier `.env` à la racine du dossier frontend :

```env
VITE_API_BASE_URL=http://localhost:8081
```

Si cette variable n'est pas définie, l'application utilisera `http://localhost:8081` par défaut.

### Lancement

**Mode développement :**
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`.

**Build de production :**
```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

**Prévisualiser le build :**
```bash
npm run preview
```

### Mode dégradé (sans backend)

Si le backend n'est pas accessible, l'application bascule automatiquement sur des données mock. Cela permet de tester l'interface même sans serveur backend opérationnel.

## Architecture du frontend

## Intégration avec le backend

### Endpoint utilisé

```
GET /api/heartbeats?sensorId={id}
```

**Paramètres :**
- `sensorId` : Identifiant du capteur (dans le POC : `1` pour la patiente Jeanne Dupont)

**Réponse attendue :**
```json
[
  {
    "sensorId": 1,
    "time": "2025-11-02T14:05:00",
    "heartBeats": 76.0
  },
  {
    "sensorId": 1,
    "time": "2025-11-02T14:06:00",
    "heartBeats": 78.0
  }
]
```

**Gestion des erreurs :**
- Si le backend ne répond pas (timeout, erreur réseau, 500, etc.), le frontend bascule automatiquement sur les données mock
- Aucune interruption de l'expérience utilisateur
- Un message est loggé dans la console pour information

### Données mock

Le fichier `mock/mockHeartbeats.ts` génère dynamiquement 80 points de données espacés d'une minute, avec une variation sinusoïdale + bruit aléatoire pour simuler un rythme cardiaque réaliste. Cela permet de tester l'interface sans dépendre du backend.

## Services (dossier src/services/)

Le pipeline de données tourne automatiquement au chargement de l'app :
- Récupère les données du capteur BLE Mock via WebSocket
- Filtre les valeurs aberrantes (30-220 BPM, variation max 50 BPM)
- Calcule une moyenne toutes les 30 secondes
- Envoie vers la queue MQTT sur le topic `poc/bpm`

L'interface affiche les données via l'API REST du backend - Interface Médecin

## Contribution au projet

### Ajouter un nouveau composant

1. Créer le fichier `.tsx` dans `src/components/` ou `src/pages/`
2. Créer le fichier CSS associé dans `src/styles/`
3Utiliser des classes CSS plutôt que des styles inline

### Ajouter un nouvel onglet fonctionnel

1. Créer un nouveau type de données dans `src/types/`
2. Créer un service API dans `src/api/` avec la même logique de fallback
3. Créer des données mock dans `src/mock/`
4. Créer une page dans `src/pages/`
5. Ajouter l'onglet dans `App.tsx` et retirer la classe `inactive-tab`

### Conventions de code

- **Nommage** : PascalCase pour les composants, camelCase pour les fonctions/variables
- **Types** : Toujours typer les props des composants et les retours de fonction
- **CSS** : Préfixer les classes par le nom du composant (ex: `.sidebar-button`)

## Justifications des choix techniques

### Pourquoi React plutôt que Vue ou Angular ?

React est le framework que nous maîtrisons. Il dispose d'une grande communauté et offre une courbe d'apprentissage progressive. Pour un POC destiné à évoluer, React permet à de nouveaux développeurs de s'intégrer facilement.

### Pourquoi ne pas utiliser un framework CSS (Tailwind, Material-UI) ?

Pour ce POC, nous avons privilégié la simplicité et le contrôle total sur le rendu. Un framework CSS aurait alourdi le bundle final (~500KB pour Material-UI) pour un bénéfice limité sur une interface aussi simple. Cependant, pour la version complète, Material-UI pourrait apporter des composants accessibles (important pour une application médicale).

### Pourquoi Chart.js et pas D3.js ?

Chart.js est plus simple à prendre en main et largement suffisant pour des graphiques classiques (courbes, barres). D3.js offre plus de flexibilité mais nécessite beaucoup plus de code pour le même résultat. Pour des visualisations plus complexes (ex: corrélations multi-capteurs), D3.js pourrait être envisagé.
