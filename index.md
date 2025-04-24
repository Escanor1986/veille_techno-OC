---
title: Accueil
nav_order: 1
---

<img src="{{ '/assets/images/veille_tech.webp' | relative_url }}" alt="Logo de la veille" width="200" />

# <span>👀</span> Veille Technologique – Projet OpenClassrooms

Ce tableau de bord présente une veille structurée autour des besoins de l'entreprise, avec un focus sur :

- 🔬 les librairies de test
- 🎨 les librairies UI
- 🧠 les paradigmes de programmation
- 🌐 la stack Java / Angular
- ⚙️ une automatisation via RSS + GitHub Actions

![GitHub Workflow Status](https://github.com/Escanor1986/veille_techno-OC/actions/workflows/rss.yml/badge.svg)

<div class="features-container">
  <div class="feature-card">
    <span class="feature-icon">🔍</span>
    <h3>Recherche avancée</h3>
    <p>Filtrez par tags, catégories et texte</p>
  </div>
  <div class="feature-card">
    <span class="feature-icon">📊</span>
    <h3>Tableau de bord</h3>
    <p>Visualisez vos données de veille</p>
  </div>
  <div class="feature-card">
    <span class="feature-icon">🏷️</span>
    <h3>Système de tags</h3>
    <p>Organisez votre contenu efficacement</p>
  </div>
</div>

## <span>📚</span> Sommaire

- [📰 Dernières mises à jour]({{ '/latest-updates' | relative_url }}) - *Articles récents toutes catégories*
- [📝 Veille statique](#veille-statique) - *Analyses manuelles*
- [🔄 Veille automatique](#veille-automatique) - *Flux RSS automatisés*
- [📊 Tableau de bord](#tableau-de-bord) - *Statistiques et visualisations*
- [ℹ️ À propos]({{ '/apropos' | relative_url }}) - *Présentation du projet*
- [🔖 Sources]({{ '/sources' | relative_url }}) - *Références et bibliographie*

---

## <span>📝</span> Veille statique {#veille-statique}

<div class="grid-container">
  <div class="grid-item">
    <a href="{{ '/tests' | relative_url }}" class="card-link">
      <div class="link-card">
        <div class="card-icon">🧪</div>
        <div class="card-content">
          <h3>Librairies de test</h3>
          <p>JUnit, Mockito, TestNG...</p>
        </div>
      </div>
    </a>
  </div>
  <div class="grid-item">
    <a href="{{ '/ui' | relative_url }}" class="card-link">
      <div class="link-card">
        <div class="card-icon">🎨</div>
        <div class="card-content">
          <h3>Librairies UI</h3>
          <p>Angular Material, PrimeNG...</p>
        </div>
      </div>
    </a>
  </div>
  <div class="grid-item">
    <a href="{{ '/paradigmes' | relative_url }}" class="card-link">
      <div class="link-card">
        <div class="card-icon">🧠</div>
        <div class="card-content">
          <h3>Paradigmes</h3>
          <p>POO, Fonctionnel, Réactif...</p>
        </div>
      </div>
    </a>
  </div>
  <div class="grid-item">
    <a href="{{ '/stack' | relative_url }}" class="card-link">
      <div class="link-card">
        <div class="card-icon">🌐</div>
        <div class="card-content">
          <h3>Stack Java/Angular</h3>
          <p>Spring, Hibernate, TypeScript...</p>
        </div>
      </div>
    </a>
  </div>
  <div class="grid-item">
    <a href="{{ '/methodologie' | relative_url }}" class="card-link">
      <div class="link-card">
        <div class="card-icon">📘</div>
        <div class="card-content">
          <h3>Méthodologie</h3>
          <p>Approches et bonnes pratiques</p>
        </div>
      </div>
    </a>
  </div>
</div>

---

## <span>🔄</span> Veille automatique {#veille-automatique}

<div class="grid-container">
  <div class="grid-item">
    <a href="{{ '/auto_tests' | relative_url }}" class="card-link">
      <div class="link-card auto-link">
        <div class="card-icon">🔬</div>
        <div class="card-content">
          <h3>Tests</h3>
          <p>Veille automatisée via RSS</p>
        </div>
      </div>
    </a>
  </div>
  <div class="grid-item">
    <a href="{{ '/auto_ui' | relative_url }}" class="card-link">
      <div class="link-card auto-link">
        <div class="card-icon">🎨</div>
        <div class="card-content">
          <h3>UI</h3>
          <p>Veille automatisée via RSS</p>
        </div>
      </div>
    </a>
  </div>
  <div class="grid-item">
    <a href="{{ '/auto_paradigmes' | relative_url }}" class="card-link">
      <div class="link-card auto-link">
        <div class="card-icon">🧠</div>
        <div class="card-content">
          <h3>Paradigmes</h3>
          <p>Veille automatisée via RSS</p>
        </div>
      </div>
    </a>
  </div>
  <div class="grid-item">
    <a href="{{ '/auto_stack' | relative_url }}" class="card-link">
      <div class="link-card auto-link">
        <div class="card-icon">🌐</div>
        <div class="card-content">
          <h3>Java/Angular</h3>
          <p>Veille automatisée via RSS</p>
        </div>
      </div>
    </a>
  </div>
</div>

---

## <span>📊</span> Tableau de bord {#tableau-de-bord}

<div id="dashboard-stats">
  <p>Chargement des statistiques en cours...</p>
</div>

<style>
/* Styles pour l'index amélioré */
.features-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
}

.feature-card {
  flex: 1 1 200px;
  background-color: var(--color-sidebar-background);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.feature-card h3 {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.feature-card p {
  margin: 0;
  font-size: 0.9rem;
  color: #586069;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.grid-item {
  min-width: 0;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.link-card {
  display: flex;
  background-color: var(--color-sidebar-background);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
}

/* .auto-link {
  background-color: #f0f7ff;
} */

.card-icon {
  font-size: 2rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
}

.card-content {
  flex: 1;
  min-width: 0;
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.card-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #586069;
}

/* Mode sombre */
body.dark-theme .feature-card,
body.dark-theme .link-card {
  background-color: #161b22;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

body.dark-theme .auto-link {
  background-color: #0d2548;
}

body.dark-theme .feature-card p,
body.dark-theme .card-content p {
  color: #8b949e;
}

body.dark-theme .feature-card:hover,
body.dark-theme .link-card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  
  .features-container {
    flex-direction: column;
  }
}
</style>

<!-- Scripts JavaScript -->
<script src="{{ '/assets/js/stats.js' | relative_url }}"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
<!-- <script src="{{ '/assets/js/debug-helper.js' | relative_url }}"></script> -->
<!-- <script src="{{ '/assets/js/theme-toggle.js' | relative_url }}"></script> -->


---
