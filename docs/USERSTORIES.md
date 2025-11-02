# USER STORIES

## Rester autonome

**Description :** En tant que patient, je veux pouvoir rester autonome en étant informé de ma condition au quotidien en restant chez moi pour pouvoir continuer à vivre de manière indépendante.

**Priority :** Must

**Estimate :**  Extra Long

**Business rules :**
- Les infirmiers doivent avoir accès aux informations pour les soins et le suivi du patient au quotidien
- Le médecin doit avoir accès à une synthèse de l’état du patient
- Les proches peuvent s’assurer que la personne âgé est dans un état normal et être notifiés en cas de problème
- Le patient a accès sur l’application à une synthèse de ses informations

**Critère d'acceptation :** L’app doit être utilisable par tous les parties et remonter les informations pertinentes selon les profils

**Scénarios :**

*Scénario 1 :* Le retraité a un pic de glucose

**Given** un patient et ses capteurs  
**When** un seuil critique du taux de glucose est dépassé  
**Then** le patient et les proches reçoivent une notification immédiate via l’application  
**And** l’alerte est enregistrée dans l’historique des alertes du patient

*Scénario 2 :* Rassurer les proches

**Given** un patient et ses proches qui ont accès à l’app  
**When** c’est la fin de la semaine  
**Then** une synthèse avec un score de bien-être est envoyé aux proches

## Intervenir en cas d’urgence

**Description :** En tant que patient , je veux que l’application alerte les secours le plus rapidement possible en cas de problème pour que les secours puissent me venir en aide

**Priority :** Must

**Estimate :** Long

**Business rules :**
- Situations d’urgence = crise cardiaque, insuffisance respiratoire
- Détection d’urgence : Le système doit pouvoir détecter automatiquement des situations d’urgence via les capteurs mis en place chez le patient, un signal manuel du patient et une notification immédiate
- En cas de détection, le système doit envoyer une alerte immédiate au services de secours
- Disponibilité 24h/24h du canal d’urgence
- Doit être le plus rapide possible ( instantané ou quasi instantané)

**Critère d’acceptation :** Dès qu’une anomalie est détectée dans les données, les secours doivent être appelé

**Scénarios :**

*Scénario 1 :* Détection automatique d’une urgence

**Given** un patient et ses capteurs  
**When** un seuil critique est dépassé (ex. rythme cardiaque anormal)  
**Then** les secours sont appelé   
**And** l’alerte est enregistrée dans l’historique des alertes du patient

*Scénario 2 :* Déclenchement manuel par le patient

**Given** un patient sur le point de faire un malaise  
**When** il appuie sur le bouton d’alerte dans l’application  
**Then** les secours reçoit une notification d’urgence instantanée  
**And** l’alerte contient : l’identité du patient, son état et sa localisation  

## Soins du quotidien
**Description :** En tant qu’infirmière, je veux pouvoir consulter les indicateurs de santé de mon patient depuis ma dernière visite pour pouvoir adapter mes soins (sous réserve de l’avis du médecin) / constater les effets d’un traitement administré

**Priorité :** Must

**Estimation :** Long

**Règle métier :**
- On suppose que le temps maximal entre 2 visites de l’infirmière d’une personne âgé est de 1 semaine
- Les informations dont l’infirmier a besoin pour checker l’état du patient est le pouls moyen du patient avec les pics au-dessus ou en-dessous d’un seuil, taux de glucose moyen pour les diabétiques, un questionnaire sur les douleurs et questionnaire sur l’état de santé mental
- Un BPM est considéré comme anormal s’il n’est pas entre 40 et 90 bpm

**Critère d’acceptation :** L’infirmière peut s’appuyer sur les informations fournies par l’app pour les check-ups avec le patient,  prendre des décision dans ses soins et évaluer les effets des traitements.

**Scénarios :**

*Scénario 1 :* Taux de glucose bas

**Given** un patient  
**When** son taux de glucose moyen est bas depuis hier  
**Then** l’app remonte cette information dans le rapport quotidien pour que le patient mange pour s’équilibrer

*Scénario 2 :* Traitement d’une grippe

**Given** un patient qui a une grippe et une infirmière qui lui a donné une prescription  
**When** l’infirmière regarde l’évolution de sa température sur ces derniers jours  
**Then** l’infirmière peut constater le rétablissement du patient  
**If** le patient a de nouveau des pics de températures  
**Then** l’infirmière en est notifié et peut adapter le traitement  

## Prescription du médecin

**Description :** En tant que médecin, je veux pouvoir prescrire la solution à mes patients qui en ont besoin pour que je puisse les suivre efficacement.

**Priorité :** Must

**Estimation :** Long

**Règle métier :**
- Le médecin est celui qui crée les comptes pour les patients et les infirmiers.
- Le médecin peut modifier ou supprimer les comptes qu’il a créés.
- Le médecin peut autoriser un infirmier à accéder aux données du patient.

**Critère d'acceptation :** Le médecin peut créer/modifier/supprimer des comptes avec des profils patients, infirmiers.

## Rapport du médecin
**Description :** En tant que médecin, je veux pouvoir écrire un rapport sur les consultations avec le patient pour garder un historique.

**Priorité:** Must

**Estimation:** Long

**Règle métier :** 
- Le personnel médical (médecin et infirmiers référents pour le patient) est libre quant aux informations qu’il note.

**Critère d’acceptation :** Permettre au médecin d’écrire des rapports textes avec des images, de retrouver ces rapports, les modifier ultérieurement et de partager certains avec les infirmiers en charge du patient de manière sécurisée.

**Scénarios :**

*Scénario 1 :* Rapport d’un incident

**Given** un patient qui a eu un problème respiratoire  
**When** le médecin le reçoit aux urgences, il peut consulter le rapport de l’incident avec l’heure où il s’est passé et une capture des signaux vitaux du patient lors des faits  
**Then** le médecin peut enrichir le rapport avec ses observations


*Scénario 2 :* Rapport lors d’une consultation

**Given** un médecin en consultation avec un patient  
**When** le médecin fait son check-up, il note ses observations dans l’app  
**And** le médecin partage la section du rapport sur les problèmes du patient à ses infirmiers  
**Then** le médecin peut consulter ce rapport à la prochaine consultation et voir ceux des infirmiers

## Rapports des infirmiers

**Description :** En tant qu’infirmier, je veux pouvoir écrire un rapport concernant ma visite chez le patient pour me souvenir des informations notées lors de la dernière visite.

**Priorité :** Must

**Estimation :** Long

**Règle métier :** 
- Le personnel médical (médecin et infirmiers référents pour le patient) est libre quant aux informations qu’il note.

**Critère d’acceptation :** Permettre aux infirmiers d’écrire des rapports textes avec des images, de retrouver ces rapports, les modifier ultérieurement et les partager entre eux et avec le médecin de manière sécurisée.

**Scénarios :**

*Scénario 1 :* Partage de rapport

**Given** un infirmier et le rapport de visite qu’il vient d’écrire  
**When** l’infirmier part, il partage son rapport avec l’infirmier du lendemain  
**Then** l’infirmier du lendemain consulte le rapport pour se renseigner sur les soins prodiguées au patient précédemment


*Scénario 2 :* Rapport quotidien

**Given** une infirmière qui fait la visite quotidienne d’un patient  
**When** l’infirmière fait son check-up, elle note ses observations dans l’app  
**And** l’infirmière consulte le rapport qu’a écrit le médecin lors de la visite médicale d’hier pour voir le scan de la prise de sang et la photo d’une plaie  
**Then** l’infirmière utilise ces informations pour ses soins et sauvegarde le rapport du jour

## Suivi d’un proche via notification

**Description :** En tant que proche d’un patient, je veux être notifié s’il lui arrive quelque chose de potentiellement dangereux pour que je puisse faire le nécessaire pour l’aider.

**Priorité :** Must

**Estimation :**  Long

**Règle métier :**
- Est considéré potentiellement dangereux les alertes sur les chutes et les alertes manuelles
- Deux à trois membres de la famille sont désignés comme contact d’urgence avec un ordre de priorité
- Le patient doit donner son autorisation pour qu’un proche puisse être notifié en cas de problème, s’il ne donne pas son autorisation, seul les secours sont contactés en cas d’urgence
- Les contacts de secours peuvent choisir pour quelles gravités d’incident ils sont notifiés (vitales à minima, grave, besoin d’aide, inconfort, anomalie mineure)
- Les contacts de secours sont notifiés via une notification de l’application

**Critère d'acceptation :** En cas de problème du patient, les contacts d'urgence sont notifiés au même moment que les secours dès que la gravité du problème est grave.

**Scénarios :**

*Scénario 1 :* Détection d’une chute

**Given** un patient qui tombe  
**When** la montre envoie la donnée  
**Then** le proche 1 est notifié  
**If** pas de réponse à la notification dans un délai de 1 minutes, notification du proche 2  
**If** pas de réponse à la notification dans un délai de 1 minutes, appel des secours

*Scénario 2 :* Annulation de l’appel des secours

**Given** un patient qui tombe  
**When** la montre envoie la donnée  
**And** le patient se relève et indique que tout va bien  
**Then** une notification d’annulation est envoyée aux personnes qui ont été appelées

## Suivi des données par un proche

**Description :** En tant que proche d’un patient, je veux avoir accès à ses données pour que je puisse suivre son état de santé.

**Priorité :** Must

**Estimation :**  Long

**Règle métier :** 
- Feature disponible qu’aux proches autorisés par le patient
- Les proches ont accès à une synthèse générale de l’état du patient mais jamais aux données brutes
- L’application donne des conseils personnalisés aux proches pour prendre soins du patient selon son état

**Critère d'acceptation :** Le patient doit donner son autorisation pour qu’un proche puisse accéder à ses données. C’est lui qui sélectionne celles qu’il veut partager. Le proche peut consulter à tout moment la synthèse de l’état du patient.

**Scénarios :**

*Scénario 1 :* Consulter l’état de la personne âgée

**Given** un proche qui a l’autorisation du patient  
**When** le proche regarde l’app, il constate l’état du patient  
**Then** il peut continuer sa journée rassuré

*Scénario 2 :* Permettre à un proche d’accéder à sa synthèse d’état

**Given** un patient et son proche  
**When** son proche veut pouvoir suivre l’état du patient, il aide le patient à le rajouter dans la liste des utilisateurs avec l’autorisation  
**Then** le proche a accès sur son application à l’état du patient

## Notification de remplissage de questionnaires

**Description :** En tant que patient, je veux être notifié quand je dois remplir un questionnaire de santé, à une heure que je puisse choisir pour avoir l’habitude de le faire et ne pas oublier.

**Priorité :** Must

**Estimation :**  Long

**Règle métier :** 
- C’est un proche qui choisit l’heure des notifications avec le patient quand il configure l’application pour son proche âgé.

**Critère d'acceptation :** 
L’heure de remplissage des formulaires peut être changé à tout moment
La fréquence et les questionnaires qu’un patient doit remplir sont déterminés par le personnel médical
Les questionnaires sont optimisés pour être simple à remplir pour des personnes non à l’aise avec le numérique et répondent aux critères d'accessibilité

**Scénarios :**

*Scénario 1 :* Configurer l’heure de remplissage du formulaire de l’alimentation

**Given** un patient, son proche et un formulaire hebdomadaire sur l’alimentation  
**When** le proche aide le patient à configurer le remplissage du formulaire le dimanche à 14h  
**Then** le dimanche à 14h, le patient va recevoir une notification où il peut cliquer pour aller sur l’écran de remplissage du formulaire  
**If** le patient ne remplit pas le formulaire au bout de 2h, une notification est envoyée de nouveau  
**If** le patient n’a pas rempli le formulaire au bout de 24h, une notification est envoyé au premier contact de sa liste de proche pour qu’il lui rappelle

*Scénario 2 :* Changer l’heure de remplissage d’un formulaire quotidien

**Given** un patient, son proche et un formulaire qu’il doit remplir tous les jours à 8h  
**When** le patient veut changer l’heure de la notification pour 10h  
**Then** le proche peut l’aider à changer les paramètres de ce formulaire pour que la notification de remplissage s’envoie plutôt à 10h  

*Scénario 3 :* Remplissage d’un formulaire

**Given** un patient et un formulaire quotidien  
**When** le patient reçoit la notification de remplissage du formulaire à 16h  
**Then** il peut cliquer sur la notification et remplir directement le formulaire sur la page qui s'ouvre

## Suivi des données d’un patient

**Description :** En tant que docteur, je veux avoir accès aux questionnaires et données de tous les capteurs de mon patient  pour que je puisse les analyser et agir en conséquence 

**Priorité :**  Must

**Estimation :**  Long

**Règle métier :** 
- Les moyennes de données sur des périodes variables suffisent pour évaluer l’état du patient à part lors d’alertes où l’on veut les données précises
- Le docteur a accès à toutes les données

**Critère d'acceptation :**  Accès à l'historique de toutes les données sur un délai de x mois et sur une moyenne par semaine/jour/mois suivant la données ensuite

**Scénarios :**

*Scénario 1 :* Consultation de la synthèse mensuelle

**Given** un patient et son docteur
**When** le docteur recoit le patient pour son check-up mensuel
**Then** il peut consulter ses données sur le mois

## Ajout / Suppression d’un proche

**Description :** En tant que patient, je veux ajouter ou supprimer des proches pour qu’ ils puissent suivre ou non mon état de santé. 

**Priorité :**  Must

**Estimation :**  Long

**Règle métier :**
- Un proche du patient ou un médecin/infirmier configure avec le patient les accès de ses proches dans l’application
- L’accès d’un proche peut être ajouté/révoqué à tout moment par le patient
- Un proche n’a pas de compte, pour l’ajouter ça se fait via un code unique par patient et que le proche entre dans son application.

**Critère d'acceptation :** Le patient peut gérer les accès à ses informations comme il veut des utilisateurs non personnel médical.

**Scénarios :**

*Scénario 1 :* Ajout d’un proche

**Given** un patient et un proche  
**When** le patient veut ajouter le proche aux personnes pouvant consulter son état de santé  
**Then** il peut se faire aider par le proche ou le personnel médical pour l’ajouter à l’application

*Scénario 2 :* Suppression d’un proche

**Given** un patient et un proche autorisé à voir son état de santé  
**When** le patient veut retirer le proche des personnes autorisées  
**Then** il peut se faire aider par un proche ou le personnel médical pour l’enlever de l’application  
**And** le proche est notifié qu’il n’a plus les droits pour accéder à la synthèse d’état du patient

## Mise à jour de l’application

**Description :** En tant qu'administrateur, je veux pouvoir déployer de nouvelles versions de l’app pour continuer à faire évoluer l’app selon les besoins clients.

**Priorité :** Must

**Estimation :** Long

**Règle métier :**
- Les nouvelles versions doivent s’installer dès que le téléphone du patient est connecté au réseau
- Les nouvelles versions sont rétro-compatible
- La version de l’app du personnel soignant se met à jour dès que possible, si la version du patient est supérieur à celle du personnel soignant, ils en sont notifiés

**Critère d'acceptation :** Les mises à jour de l’application ne compromettent pas le fonctionnement de l’application, sont compatibles entre versions et se font automatiquement si l’utilisateur l’autorise.

**Scénarios :**

*Scénario 1 :* Déploiement d’une nouvelle version

**Given** un admin et une nouvelle version de l’app  
**When** l’admin veut déployer la mise à jour  
**Then** il peut mettre à disposition la mise à jour qui sera faite automatiquement si l’appareil de l’utilisateur est connecté au réseau sinon dès qu’il s’y connecte

## Suivi des métriques de l’application

**Description :** En tant qu'administrateur, je veux pouvoir visualiser des statistiques d’utilisation des différentes fonctionnalités de l’application pour l’adapter et résoudre d’éventuels problèmes.

**Priorité :** Must

**Estimation :** Long

**Règle métier :** 
- Les statistiques doivent être conforment au RGPD
- Les statistiques sur l’application doivent permettre d’évaluer la fréquence d’usage de chaque fonctionnalités, les différentes requêtes et leurs nombres et l’uptime de l’application

**Critère d'acceptation :** L’administrateur doit pouvoir suivre la santé de la production dans le temps et pouvoir voir les statistiques d’utilisation de l’application en respectant le RGPD.

## Suivi des infrastructures

**Description :** En tant qu'administrateur, je veux pouvoir visualiser l’état des services et  infrastructures de déploiement pour agir en cas de panne et intervenir sur des équipements.

**Priorité :** Must

**Estimation :** Long

**Règle métier :** 
- L’admin doit pouvoir être en contact avec le fournisseur d’infrastructure pour d’éventuels problèmes
- L’admin doit pouvoir rajouter de l’infra si la charge le nécessite

**Critère d'acceptation :** Si un problème au niveau des infrastructures survient en production, l’admin est notifié. On doit pouvoir suivre la charge des infras et adapter l’infra en fonction.

## Monitoring de l’app

**Description :** En tant qu'administrateur, je veux pouvoir visualiser en temps réel l'état de l'application et être alerté en cas d'erreurs afin de pouvoir réagir rapidement face aux problèmes critiques et d'améliorer continuellement la performance et la fiabilité de l'application.

**Priorité :** Must

**Estimation :** Long

**Règle métier :**
- L'administrateur doit pouvoir vérifier la disponibilité de l'application en permanence et recevoir des alertes en cas de panne en production.
- L'administrateur doit pouvoir consulter toutes les erreurs survenant en production, avec des rapports détaillés incluant leur origine et le code d'erreur précis.

**Critère d'acceptation :**
L'administrateur est notifié immédiatement si un problème ou un bug survient en production.
L'administrateur peut accéder à un rapport complet décrivant le problème exact et sa cause.

## Administration des patients côté infirmier

**Description :** En tant qu'infirmier, je veux pouvoir consulter les patients dont j’ai la charge pour remplir des rapports à leur sujet, vérifier qu’ils ont fait les questionnaires et consulter leurs données.

**Priorité :** Must

**Estimation :** Long

**Règle métier :** 
- Les infirmiers ne peuvent voir que les patients qui leur ont été attribués.
- Les infirmiers peuvent accéder aux données des patients dont ils ont la charge et ajouter des rapports.

**Critère d'acceptation :** Les infirmiers ont la visibilité sur les patients qui leur sont attribués et peuvent consulter leurs données et rédiger des rapports rattachés aux patients.

## Transfert de patient entre médecins

**Description :** En tant que médecin, je veux transférer la gestion d’un patient à un autre médecin pour permettre aux patients de changer de médecin responsable s’ils en font la démarche.

**Priorité :** Must

**Estimation :** Long

**Règle métier :**
- Un médecin peut rechercher un autre médecin.
- Un médecin peut transférer un patient et donc la gestion de son compte et des infirmiers qui en ont la charge à un autre médecin.
- Un médecin quittant son poste peut transférer tous les patients à sa charge à un autre médecin.
- Un médecin peut ajouter d’autres médecins en tant que co-gestionnaire de comptes patients et/ou infirmier. Dans ce cas, le médecin référent reste le médecin ayant créé le compte à part s’il précise explicitement qu’il transfère le rôle de médecin référent d’un patient en même temps que le patient.

**Critère d'acceptation :** Un médecin peut transférer à tout moment les droits sur des comptes patients et/ou infirmiers. Il peut préciser lors du transfert qui est le médecin référent et s’il souhaite rester co-gérant du patient ou faire un transfert total des droits.

## Résolution des problèmes de l’application

**Description :** En tant qu'administrateur, je veux pouvoir corriger les problèmes rencontrés en production pour que les utilisateurs ne rencontrent pas de problèmes quand ils utilisent l’application.

**Priorité :** Must

**Estimation :** Long

**Règle métier :**
- Le Patch doit pouvoir être déployé via une nouvelle version d’application
- Les nouvelles versions sont rétro-compatible
- La version de l’app du personnel soignant se met à jour dès que possible

**Critère d'acceptation :** Les mises à jour de l’application ne compromettent pas le fonctionnement de l’application et sont compatibles entre les versions.

**Scénarios :**

*Scénario 1 :* Hotfix

**Given** un retour utilisateur sur un bug et un admin  
**When** l’admin veut fix le bug en production, il peut déployer rapidement le fix avec un temps de down de l’app minimal  
**Then** le bug est corrigé et la production continue sans perte de données
