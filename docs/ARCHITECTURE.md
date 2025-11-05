# Architecture du projet – IAL-25-26

## Résumé du projet

Le projet vise à concevoir un système connecté de suivi de santé pour les personnes âgées, prescrit par les médecins.
Les capteurs (montre connectée, capteur de glucose, etc.) prescrits envoient leurs données via le smartphone du patient vers une plateforme cloud composée de micro-services sécurisés.
Le système permet de prévenir les urgences, de suivre l’état de santé quotidien et de faciliter la communication entre médecins, infirmiers, patients et proches ainsi que la surveillance du système par les administrateurs.
Les médecins peuvent y rédiger des rapports, créer des questionnaires et ajuster le suivi de leurs patients.
L’application gère la collecte, l’analyse et la synthèse des données pour générer des alertes et notifications personnalisées, dans le respect de la confidentialité médicale.
En cas d'urgence vitale (crise cardiaque, chutes...), le système est capable d'alerter les secours.
Des administrateurs supervisent l’infrastructure et la gestion des accès.

## Utilisateurs

Médecin (client principal), infirmier, proches, personne âgée/patient, secours, admin.

## Hypothèses de travail

Installation et mise en service :
- Le système peut être installé par le personnel médical (infirmier) ou par un proche à l’aide de la notice d’installation.
- Les proches peuvent configurer le système avec le patient (et le patient seul s’il en est capable).
- Lors de la configuration, on définit notamment la fréquence et les conditions de remplissage des questionnaires par le patient.

Matériel et équipements :
- La montre connectée et le capteur de glucose sont prescrits et fournis dans le cadre du dispositif médical.
- Les capteurs sont calibrés en usine (usines françaises, unités de mesure françaises).
- Il existe un stock d’avance pour les montres et capteurs afin d’éviter toute rupture d’approvisionnement.

Utilisation par le patient :
- La personne âgée porte la montre quotidiennement.
- Le patient a toujours son téléphone à portée de main, chargé et connecté à Internet.
- On suppose que les patients disposent d’un smartphone avec les capacités suffisantes pour notre application; sinon, un modèle minimal recommandé leur est proposé pour faire fonctionner l’application.

Fonctionnement et communication :
- Les interactions entre les médecins, les patients et le système se font via l’application.
- Le rythme d’envoi des données (montre et capteur de glucose) est préconfiguré pour un équilibre entre volume minimal et qualité suffisante des données.
- En cas d’alerte, lorsque les secours sont prévenus, c’est leur responsabilité d’appeler l’hôpital si nécessaire.

Exploitation et administration :
- Le client final est le secteur de santé / médecin prescripteur.
- L’application est un dispositif médical sous contrat avec l’État, prescrit par le médecin, qui gère et suit ses patients via son compte professionnel.
- Un administrateur supervise le système, la gestion des comptes, des droits et la maintenance technique.

Contraintes techniques :
- L’architecture vise un temps d’indisponibilité nul (0 downtime).
- Le système offre une rétrocompatibilité moyenne : les patients devront effectuer les mises à jour nécessaires, sans obligation d’avoir la dernière version.

## Données surveillées

Via la montre on surveille :
- La température
- La détection de chute
- Le rythme cardiaque (BPM)
- Le taux d’oxygène dans le sang
- Le nombre de pas (activité physique)

Via le capteur glucose on surveille (optionnel) :
- Le taux de glucose (si diabétique ou pour dépistage)

Via les questionnaires on surveille :
- L’état de santé mentale (isolement, dépression) - Tous les jours
- Les douleurs - Tous les jours

A remplir par l’infirmier/médecin : 
- Compte-rendu de visite

Sur demande du médecin on propose équalement :
- Un questionnaire sur les habitudes alimentaires
- Des tests de lecture et d’audition
- Un questionnaire sur l’activité physique
- Un questionnaire sur la qualité de sommeil

## Quantification des données

Le téléphone a un filtre pour éliminer les données anormales et un buffer pour stocker les données avant leur envoi au backend.

Fréquence transmission Capteur/Téléphone :
- Température : 1 mesure / min
- Fréquence cardiaque : 1 mesure / 5s
- Oxygène dans le sang : 1 mesure / min
- Pas : 1 mesure / min
- Glucose : 1 mesure / min
- Chute : transmission immédiate

Fréquence des transmissions Téléphone/Backend :
- Température : 1 valeur agrégée / 15 min
- Fréquence cardiaque : 1 valeur agrégée / 5 min
- Oxygène dans le sang : 1 valeur agrégée / 15 min
- Pas : 1 valeur cumulative / jour
- Glucose : 1 valeur agrégée / 15 min
- Chute : transmission immédiate

## Découpage DDD

La valeur de l'application c'est d'aider les personnes âgés à rester autonome d'un point de vue médicale avec une surveillance continue et des mecanismes d'alertes, de conseils et de suivi pour l'ensemble des acteurs du bien-être (médecin, infirmier, secours, proches).

Processus couverts :
- Surveillance des signaux vitaux (rythme cardiaque, taux d'oxygen, perte d'équilibre...)
- Surveillance du bien-être globale (humeur, activité physique...)
- Prise en charge de la surveillance du diabètes pour les patients concernés
- Signal d'alertes en cas d'urgences vitales
- Avertissements et conseils remontés au patient et à tous ceux qui s'occupent de lui
- Permettre un suivi des patients par le médecin
- Permettre la transmission du contexte médical d'un patient à d'autres soignants
- Permettre de garder une trace des actions et incidents médicaux
- Permettre aux admins le suivi de la production

![Liste Domaines DDD](images\Liste-domaines-ddd.png "Liste Domaines DDD")

![Context Map](images\Context-map-ddd.png "Context Map")

![Légende Context Map](images\Context-map-legend-ddd.png "Légende Context Map")

Exemple d'un contexte détaillé :

![Schéma Focus Context Alerting Context](images\Context-alerting-ddd.png "Schéma Focus Context Alerting Context")

## Architecture Hardware

![Architecture Hardware](images\Schema-archi-hardware.png "Architecture Hardware")

![Légende Architecture Hardware](images\Legende-archi-hardware.png "Légende Architecture Hardware")

## Architecture Frontend (téléphone)

![Architecture Frontend](images\Schema-archi-front-telephone.png "Architecture Frontend")

![Légende Architecture Frontend](images\Legende-archi-front-telephone.png "Légende Architecture Frontend")

## Architecture Backend (cloud)

![Architecture Backend](images\Schema-archi-back-cloud.png "Architecture Backend")

![Légende Architecture Backend](images\Legende-archi-back-cloud.png "Légende Architecture Backend")

![Schéma Focus Capteur Data Composant](images\Schema-archi-back-cloud-capteur-data.png "Schéma Focus Capteur Data Composant")

![Schéma Focus Capteur User Synthèse](images\Schema-archi-back-cloud-user-synthese.png "Schéma Focus Capteur User Synthèse")

## Choix pour les DB:

### DB Capteur (Contexte : Monitoring)

**Données stockées :** Données horodatées (IoT) brutes (fréquence cardiaque, glycémie, etc.) provenant des objets connectés.

**Type de DB :** Time Series (TSDB) (TimescaleDB).

**Pourquoi ce choix :**
- Charge d'écriture : Flux constant et massif de données (3-4/min/utilisateur). Une TSDB est conçue pour ingérer des millions de points de données par seconde sans saturer, là où une base relationnelle classique souffrirait.
- Charge de lecture : Synthèse utilisateur doit faire des calculs (moyenne, min, max) sur des périodes de temps. Les TSDB sont optimisées pour ce type de requêtes (AVG(), MAX() groupés par temps) et sont des milliers de fois plus rapides qu'une base SQL traditionnelle pour cela.
- Stockage : Les TSDB offrent des bons taux de compression pour les données horodatées, ce qui réduit nos coûts de stockage sur le long terme.

### DB User (Contexte : Identity)

**Données stockées :** Données critiques et structurées : profils, identifiants de connexion, mots de passe hashés, rôles (patient, proche, médecin), permissions, et les relations entre eux.

**Type de DB :** PostgreSQL (ou autre Relationnel SQL).

**Pourquoi ce choix :**
- Intégrité des Données (ACID) : Ce sont les données les plus sensibles. On a besoin de garanties transactionnelles fortes. Quand un utilisateur s'inscrit, la création de son profil et de ses identifiants doit être un bloc indivisible.
- Données Relationnelles : La nature de nos données est relationnelle (un patient est lié à un proche, un médecin suit plusieurs patients). PostgreSQL gère ces clés étrangères et ces jointures.
- Sécurité : PostgreSQL offre des mécanismes de sécurité robustes et éprouvés (comme le Row-Level Security) pour cloisonner l'accès aux données sensibles.

### DB Rapport (Contexte : History / Care)

**Données stockées :** Texte long, données semi-structurées : rapports d'incidents, synthèses médicales, logs d'événements, contenu des alertes.

**Type de DB :** MongoDB (ou autre base NoSQL Document).

**Pourquoi ce choix :**
- Schéma Flexible : C'est la raison principale. Un rapport d'incident n'aura pas la même structure qu'une synthèse d'activité. Une base Document (stockage type JSON/BSON) permet de stocker ces différents objets sans avoir à définir un schéma rigide.
- Évolutivité : Si le volume de rapports devient énorme, il est très simple de sharder une collection MongoDB sur plusieurs serveurs.
- Nature des données : C'est idéal pour stocker les documents que notre application génère. Pas besoin de jointures complexes, juste on stocke et on récupére un rapport entier lié à un utilisateur.

### DB Questionnaire (Contexte : Care)

**Données stockées :** Formulaires structurés : réponses de l'utilisateur à des questionnaires (antécédents médicaux, habitudes de vie). Les données sont principalement des valeurs numéraires ou des choix prédéfinis.

**Type de DB :** PostgreSQL (Relationnel SQL).

**Pourquoi ce choix :**
- Structure Claire : Un questionnaire est très structuré (une réponse appartient à une question et est liée à un user).
- Faible Charge : Cette base sera peu utilisée (principalement en lecture, et en écriture une seule fois lors de l'inscription ou de mises à jour). Il n'y a aucun besoin de performance extrême.
- Consolidation : Pour réduire les coûts et la complexité de maintenance, les tables de ce questionnaire peuvent vivre dans la même instance PostgreSQL que la DB User, en utilisant simplement un schéma logique différent (ex: schema_identity et schema_care).

## Pourquoi ce choix d'architecture

Nous avons choisi de réaliser une architecture en 2 parties : l’architecture frontend pour l'application du téléphone qui gère l’interface utilisateur, les seuils d’urgence mais aussi la réception des données des capteurs envoyées via bluetooth low energy et l’architecture backend dans le cloud pour la gestion de tous les aspects métiers de notre projet (surveillance des données biomédicale, analyse du bien-être globale, suivi du diabète, gestion des alertes, suivi médical, coordination des soins, historisation et traçabilité médicale, gestion des utilisateurs et des rôles, supervision fonctionnelle et gestion de la sécurité des données).

Cette division entre les responsabilités du front et celles du cloud nous permet de mitiger les risques liés à la perte de connexion avec l’applicatif, permettant une certaine autonomie du système et offrant la possibilité aux patients d’être suivie et aider à tout moment et en tout lieu.

Pour communiquer entre ces 2 pans de notre architecture, nous avons choisi d’utiliser une queue MQTT pour la transmission des données filtrées des capteurs.
Le protocole MQTT est minuscule, parfait pour des applications mobiles avec peu de batterie/bande passante.
De plus, MQTT est conçu pour des réseaux instables et peu fiables (3G, 4G, LoRaWAN).
Enfin, MQTT pousse activement les messages aux clients, ce qui est idéal pour des notifications temps réel.

Une communication HTTPS est mise en place via une API Gateway pour transmettre et recevoir les données à afficher dans l’application.
Ces choix sont motivés par la volonté de garder un accès en flux continu aux données récupérées depuis les capteurs et filtrés dans le front pour pouvoir les récupérer avec les services concernés et faire les traitements adéquats.
La communication avec l’IHM se fait via une API REST classique suffisante pour la transmission des données agrégées du back vers le front.

## Choix pour les Infrastructures Hardware

L’infrastructure matérielle retenue vise à garantir la haute disponibilité, la scalabilité et la sécurité nécessaires à un dispositif médical critique. Dans le cas d’un déploiement pour un hôpital de taille moyenne (environ 500 patients suivis simultanément), l’infrastructure s’articule autour de trois niveaux : le matériel patient, la passerelle mobile, et le cluster cloud.

### Matériel Patient

Chaque patient dispose d’une montre connectée médicale (capteur optique PPG + accéléromètre 6 axes).
Ces dispositifs communiquent via Bluetooth Low Energy (BLE 5.0) avec le smartphone du patient.
Les capteurs respectent les standards ISO 13485 et IEC 60601-1 pour la conformité médicale.
La montre a une autonomie de 3 à 5 jours.

### Passerelle Mobile (Smartphone du Patient)

Le smartphone sert de nœud de prétraitement et de transfert. Il doit disposer a minima d’un processeur ARM Cortex-A53 1.8 GHz, de 3 Go de RAM, et de 32 Go de stockage, avec Android 10+ et connectivité 4G/Wi-Fi.
L’application locale gère :
- le filtrage des données capteurs (élimination des valeurs aberrantes)
- un buffer local (jusqu’à 48h de stockage en cas de perte réseau)
- la transmission sécurisée des données via MQTT et HTTPS/REST vers le cloud

### Infrastructure Cloud (Backend)

On fait l'hypothèse que notre système sera déployé pour un hôpital de taille moyenne, avec environ 500 patients suivis simultanément.

L’infrastructure cloud est conçue pour être hautement disponible et scalable. C'est pourquoi on a choisi un modèle de 
**cluster Kubernetes** : Un cluster déployé sur Google Azure, avec au moins 3 nœuds de calcul (4 vCPU, 16 Go RAM chacun) pour héberger les microservices backend.
Chaque microservice est conteneurisé avec Docker, orchestré par Kubernetes pour la scalabilité automatique et la résilience.

Kubernetes nous permet d’automatiser le déploiement, la mise à l’échelle et la gestion des conteneurs, tout en gardant un down time proche de zéro.
