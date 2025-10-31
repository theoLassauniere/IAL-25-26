# 🤝 Guide de contribution

---

## 🚀 Étapes pour contribuer

### 1. Créer une branche associée à une issue

Chaque contribution doit être liée à une **issue existante**.  
Depuis le dépôt GitHub du projet :

1. Rendez-vous sur la page de l’issue à laquelle vous souhaitez contribuer.
2. Cliquez sur **"Create a branch"** (ou créez-en une manuellement depuis votre interface Git).
3. Nommez votre branche en suivant le format : ``<numéro>-issue`` (Le format par défaut est suffisant)

---

### 2. Travailler en local sur votre branche

Clonez le dépôt (si ce n’est pas déjà fait) :
```bash
git clone https://github.com/theoLassauniere/IAL-25-26.git
```

Puis, récupérez votre nouvelle branche :
```bash
git checkout <numéro>-issue
```

Effectuez vos modifications localement, en veillant à respecter 
les standards du projet (code style, conventions de nommage, etc.).

### 3. Push vos changements et créer une Pull Request

Une fois vos changements prêts :
```bash
git add .
git commit -m "Fix: correction du bug de connexion (#42)"
git push origin <numéro>-issue
```

Ensuite :

1) Rendez-vous sur GitHub.
2) Ouvrez une Pull Request (PR) vers la branche main.
3) Dans la description de la PR, mentionnez l’issue concernée avec :
```
Closes #<numéro-de-l-issue>
```

### 4. Validation et merge

Chaque Pull Request doit être reviewée par au moins un mainteneur du projet.
Une fois la review approuvée :

- Le reviewer a la responsabilité de merger la PR sur la branche main.



