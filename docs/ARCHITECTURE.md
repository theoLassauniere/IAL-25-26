# Architecture du projet – IAL-25-26

## Résumé du projet

Le projet vise à concevoir un système connecté de suivi de santé pour les personnes âgées, prescrit par les médecins.
Les capteurs (montre connectée, capteur de glucose, etc.) prescrits par les médecins envoient leurs données via le smartphone du patient vers une plateforme cloud composée de micro-services sécurisés.
Le système permet de prévenir les urgences, de suivre l’état de santé quotidien et de faciliter la communication entre médecins, infirmiers, patients et proches ainsi que la surveillance du système par les administrateurs.
Les médecins peuvent y rédiger des rapports, créer des questionnaires et ajuster le suivi de leurs patients.
L’application gère la collecte, l’analyse et la synthèse des données pour générer des alertes et notifications personnalisées, dans le respect de la confidentialité médicale.
Des administrateurs supervisent l’infrastructure et la gestion des accès.

## Utilisateurs

Médecin (client principal), infirmier, proches, personne âgée/patient, secours, Admin.

## Hypothèses de travaille

Installation et mise en service :
- Le système peut être installé par le personnel médical (infirmier) ou par un proche à l’aide de la notice d’installation.
- Les proches peuvent configurer le système avec le patient (et le patient seul s’il en est capable).
- Lors de la configuration, on définit notamment la fréquence et les conditions de remplissage des questionnaires par le patient.

Matériel et équipements :
- La montre connectée et le capteur de glucose sont prescrits et fournis dans le cadre du dispositif médical.
- Le capteur de glucose est activé ou installé sur demande du médecin, par un infirmier ou un proche via la notice d’installation.
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
- Fréquence cardiaque : 1 valeur agrégée / min
- Oxygène dans le sang : 1 valeur agrégée / 5 min
- Pas : 1 valeur cumulative / h
- Glucose : 1 valeur agrégée / 5 min
- Chute : transmission immédiate

## Découpage DDD

La valeur de l'application c'est d'aider les personnes âgés à rester autonome d'un point de vue médicale avec une surveillance continue et des mecanismes d'alertes, de conseils et de suivi pour l'ensemble des acteurs du bien-être (médecin, infirmier, secours, proches).

Processus couverts :
- Surveillance des signaux vitaux (rythme cardiaque, taux d'oxygen, perte d'équilibre...)
- Surveillance du bien-être globale (humeur, activité physique...)
- Prise en charge de la surveillance du diabètes pour les patients concernés
- Signal d'alertes en cas d'urgences vitales
- Avertissements et conseils remontés au patient et à tous ceux qui s'occupent de lui
- Permettre un suivie des patients du médecin
- Permettre la transmission du contexte médicale d'un patient à d'autres soignants
- Permettre de garder une trace des actions et incidents médicaux
- Permettre aux admins le suivie de la production

![Liste Domaines DDD](images\Liste-domaines-ddd.png "Liste Domaines DDD")

![Context Map](images\Context-map-ddd.png "Context Map")

![Légende Context Map](images\Context-map-legend-ddd.png "Légende Context Map")

Exemple d'un context détaillé :

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

## Pourquoi ce choix d'architecture

Nous avons choisi de réaliser une architecture en 2 parties : l’architecture frontend pour l'application du téléphone qui gère l’interface utilisateur, les seuils d’urgence mais aussi la réception des données des capteurs envoyées via bluetooth low energy et l’architecture backend dans le cloud pour la gestion de tous les aspects métiers de notre projet (surveillance des données biomédicale, analyse du bien-être globale, suivi du diabète, gestion des alertes, suivi médical, coordination des soins, historisation et traçabilité médicale, gestion des utilisateurs et des rôles, supervision fonctionnel et gestion de la sécurité des données).

Cette division entre les responsabilités du front et celles du cloud nous permet de mitiger les risques liés à la perte de connexion avec l’applicatif, permettant une certaine autonomie du système et offrant la possibilité aux patients d’être suivie et aider à tout moment et en tout lieu.

Pour communiquer entre ces 2 pans de notre architecture, nous avons choisi d’utiliser une queue MQTT pour la transmission des données filtrées des capteurs et une communication HTTPS via une API Gateway pour transmettre et recevoir les données à afficher dans l’application. Ces choix sont motivés par la volonté de garder un accès en flux continu aux données récupérées depuis les capteurs et filtrés dans le front pour pouvoir les récupérer avec les services concernés et faire les traitements adéquats. La communication avec l’IHM se fait via une API REST classique suffisante pour la transmission des données agrégées du back vers le front.
