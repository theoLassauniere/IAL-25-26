# Guide de contribution

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

## Licence

MIT License

Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
