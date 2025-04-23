# 📊 Veille Technologique – Projet OpenClassrooms

Bienvenue sur mon projet de **veille technologique automatisée**, réalisé dans le cadre de la formation **Développeur Fullstack Java / Angular** chez OpenClassrooms.

Ce tableau de bord rassemble une veille ciblée sur les technologies utilisées en entreprise, avec une **approche complète** :

- 📝 **Rédaction manuelle** (analyse, synthèse)
- 🤖 **Veille automatisée** (mise à jour via flux RSS + GitHub Actions)
- 📊 **Analyse dynamique** (dashboard avec graphiques interactifs)
- 🔍 **Recherche avancée** (filtrage par catégorie et tags)

## 📦 Technologies utilisées

- **GitHub Pages** : hébergement du site
- **Jekyll** : génération statique de contenu
- **Thème Just the Docs** : documentation structurée, responsive et élégante
- **GitHub Actions** : automatisation de la mise à jour des fichiers `.md`
- **Node.js + rss-parser** : récupération et analyse des flux RSS
- **JavaScript (ES6+)** : tableau analytique dynamique et fonctionnalités interactives
- **Chart.js** : visualisation de données avec graphiques interactifs
- **CSS personnalisé** : style adaptatif avec thème Demon Slayer × Ghost in the Shell
- **Google Fonts** : polices Inter et Major Mono Display pour une lisibilité améliorée

## ✨ Fonctionnalités principales

- **Dashboard analytique** : visualisation des statistiques et tendances de la veille
- **Système de tags** : catégorisation automatique et filtrage des articles
- **Recherche avancée** : filtrage dynamique par texte, catégorie et tags
- **Visualisations graphiques** : représentation des catégories et tags populaires
- **Interface responsive** : adaptation à tous les appareils
- **Exportation de données** : téléchargement des statistiques au format CSV

## 🧱 Structure du projet

```bash
veille_techno-OC/
├── _includes/
│   └── head_custom.html             # Inclusion des CSS et polices personnalisées
├── .github/
│   └── workflows/
│       └── rss.yml                  # Workflow GitHub Actions (mise à jour auto)
├── fetch-rss.js                     # Script Node.js qui récupère les flux RSS avec extraction de tags
├── _config.yml                      # Configuration du site Jekyll
├── assets/
│   ├── css/
│   │   └── style.scss               # Style personnalisé du thème (mode clair/sombre)
│   ├── js/
│   │   ├── stats.js                 # Script JS pour le dashboard analytique
│   │   ├── search.js                # Système de recherche avancée
│   │   ├── dashboard.js             # Dashboard analytique avancé
│   │   ├── dashboard-loader.js      # Chargement optimisé des ressources
│   │   ├── debug-helper.js          # Outil de diagnostic JavaScript
│   │   └── theme-toggle.js          # Gestionnaire de thème clair/sombre
│   └── images/
│       ├── veille_tech.webp         # Image principale
│       └── favicon.ico              # Favicon du site
├── index.md                         # Page d'accueil (interface moderne)
├── dashboard.md                     # Dashboard analytique avancé
├── latest-updates.md                # Page des dernières mises à jour (tous articles)

# Pages statiques (analyses manuelles)
├── tests.md
├── ui.md
├── paradigmes.md
├── stack.md
├── methodologie.md
├── apropos.md
├── sources.md

# Pages générées automatiquement via RSS
├── auto_tests.md
├── auto_ui.md
├── auto_paradigmes.md
├── auto_stack.md
```

## 🔄 Fonctionnement de la veille automatique

Le fichier `fetch-rss.js` contient une liste de flux RSS pertinents pour chaque thématique, avec un système d'extraction de tags. Chaque semaine (ou manuellement), le workflow `rss.yml` :

1. Récupère les flux RSS ciblés
2. Extrait automatiquement les tags pertinents des articles
3. Génère ou met à jour les fichiers `auto_*.md` et `latest-updates.md`
4. Commit et push les changements automatiquement dans le repo

Cette automatisation permet une veille constante sans intervention manuelle, tout en gardant une organisation structurée par tags et catégories.

## 📊 Dashboard analytique interactif

Le site inclut un tableau de bord complet généré dynamiquement via JavaScript, offrant :

1. **Statistiques par catégorie** : nombre d'articles, tendances
2. **Visualisations graphiques** : diagrammes à barres et camemberts
3. **Nuage de tags** : visualisation des sujets les plus fréquents
4. **Articles récents** : affichage des derniers contenus toutes catégories
5. **Chronologie** : visualisation de l'activité de veille au fil du temps
6. **Exportation des données** : génération de rapports CSV

Ce dashboard se recharge automatiquement à chaque mise à jour du flux et offre une expérience utilisateur interactive avec filtrage par période.

## 🔍 Système de recherche avancée

L'interface inclut un système de recherche complet permettant :

- **Filtrage par texte** : recherche dans les titres et descriptions
- **Filtrage par catégorie** : sélection par domaine technique
- **Filtrage par tags** : sélection multiple de tags thématiques
- **Affichage adaptatif** : résultats mis à jour en temps réel
- **Compatibilité mobile** : recherche optimisée sur tous appareils

## 🚀 Déploiement

Ce site est **automatiquement publié** via GitHub Pages à l'adresse :

🔗 [https://escanor1986.github.io/veille_techno-OC](https://escanor1986.github.io/veille_techno-OC)

## 🧠 Thématiques couvertes

- 🔬 **Librairies de test** (JUnit, Mockito, TestNG...)
- 🎨 **Librairies UI** (Angular Material, PrimeNG, Tailwind...)
- 🧠 **Paradigmes de programmation** (POO, fonctionnel, réactif...)
- 🌐 **Stack Java / Angular** (Spring, Hibernate, TypeScript...)
- 📚 **Méthodologie de veille informationnelle**

## ✅ Résultat attendu (OpenClassrooms)

✔️ Outil de veille structuré par thème  
✔️ Contenu synthétique et documenté  
✔️ Sources fiables (docs, blogs, Medium, Dev.to, etc.)  
✔️ Dashboard public en ligne  
✔️ Automatisation de la veille via GitHub Actions  
✔️ Indicateurs dynamiques intégrés (analytique)

## ➕ Fonctionnalités bonus ajoutées

✔️ Interface utilisateur moderne avec thème personnalisé Demon Slayer × Ghost in the Shell  
✔️ Système de recherche avancée multi-critères  
✔️ Mode sombre/clair pour une meilleure expérience utilisateur  
✔️ Visualisations graphiques interactives avec Chart.js  
✔️ Extraction et analyse automatique de tags  
✔️ Design responsive adapté à tous les appareils  
✔️ Dashboard analytique avancé avec chronologie et exportation CSV  
✔️ Outil de diagnostic JavaScript intégré pour la maintenance

## 👨‍💻 Auteur

Projet réalisé par [Escanor1986](https://github.com/Escanor1986)  
Formation Développeur Fullstack Java - Angular  
Plateforme : [OpenClassrooms](https://openclassrooms.com)

## 📃 Licence

Ce projet est mis à disposition sous licence MIT. Vous êtes libre de le réutiliser, le forker ou l'adapter.
