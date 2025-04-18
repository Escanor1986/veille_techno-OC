# 📊 Veille Technologique – Projet OpenClassrooms

Bienvenue sur mon projet de **veille technologique automatisée**, réalisé dans le cadre de la formation **Développeur Fullstack Java / Angular** chez OpenClassrooms.

Ce tableau de bord rassemble une veille ciblée sur les technologies utilisées en entreprise, avec une **double approche** :

- 📝 **Rédaction manuelle** (analyse, synthèse)
- 🤖 **Veille automatisée** (mise à jour via flux RSS + GitHub Actions)

---

## 📦 Technologies utilisées

- **GitHub Pages** : hébergement du site
- **Jekyll** : génération statique de contenu
- **Thème Just the Docs** : documentation structurée, responsive et élégante
- **GitHub Actions** : automatisation de la mise à jour des fichiers `.md`
- **Node.js + rss-parser** : récupération des flux RSS
- **CSS personnalisé** : pour un style plus soigné et lisible

---

## 🧱 Structure du projet

veille_techno-OC/ ├── .github/workflows/rss.yml # Workflow GitHub Actions (mise à jour auto) ├── fetch-rss.js # Script Node.js qui récupère les flux RSS ├── _config.yml # Configuration du site Jekyll ├── assets/css/custom.css # Style personnalisé du thème ├── index.md # Page d'accueil du tableau de veille

Pages statiques (analyses manuelles)
├── tests.md ├── ui.md ├── paradigmes.md ├── stack.md ├── methodologie.md

Pages générées automatiquement via RSS
├── auto_tests.md ├── auto_ui.md ├── auto_paradigmes.md ├── auto_stack.md

yaml
Copier
Modifier

---

## 🔄 Fonctionnement de la veille automatique

Le fichier `fetch-rss.js` contient une liste de flux RSS pertinents pour chaque thématique. Chaque semaine (ou manuellement), le workflow `rss.yml` :

1. Récupère les flux
2. Génère ou met à jour les fichiers `auto_*.md`
3. Commit et push les changements automatiquement dans le repo

---

## 🚀 Déploiement

Ce site est **automatiquement publié** via GitHub Pages à l’adresse :

🔗 [https://escanor1986.github.io/veille_techno-OC](https://escanor1986.github.io/veille_techno-OC)

---

## 🧠 Thématiques couvertes

- 🔬 **Librairies de test** (JUnit, Mockito…)
- 🎨 **Librairies UI** (Angular Material, PrimeNG…)
- 🧠 **Paradigmes de programmation** (POO, fonctionnel, réactif…)
- 🌐 **Stack Java / Angular**
- 📚 **Méthodologie de veille informationnelle**

---

## ✅ Résultat attendu (OpenClassrooms)

✔️ Outil de veille structuré par thème  
✔️ Contenu synthétique et documenté  
✔️ Sources fiables (docs, blogs, Medium, Dev.to, etc.)  
✔️ Dashboard public en ligne  
✔️ Automatisation de la veille via GitHub Actions

---

## 👨‍💻 Auteur

Projet réalisé par [Escanor1986](https://github.com/Escanor1986)  
Formation Développeur Fullstack Java - Angular  
Plateforme : [OpenClassrooms](https://openclassrooms.com)

---

## 📃 Licence

Ce projet est mis à disposition sous licence MIT. Vous êtes libre de le réutiliser, le forker ou l’adapter.
