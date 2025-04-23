---
title: "Dashboard analytique"
layout: page
permalink: /dashboard/
nav_order: 11
---

# <span>📊</span> Dashboard analytique de veille technologique

Cette page présente une vue analytique complète de ma veille technologique, avec visualisation des données, tendances et statistiques.

<div class="dashboard-container">
  <div class="dashboard-controls">
    <div class="timeframe-selector">
      <button class="timeframe-btn active" data-period="all">Tout</button>
      <button class="timeframe-btn" data-period="month">Ce mois</button>
      <button class="timeframe-btn" data-period="week">Cette semaine</button>
    </div>
    <div class="view-controls">
      <button id="toggle-theme-dashboard" class="dashboard-btn">Mode sombre</button>
      <button id="export-data" class="dashboard-btn primary">Exporter (CSV)</button>
    </div>
  </div>

  <div class="dashboard-grid">
    <!-- Vue générale -->
    <div class="dashboard-card overview">
      <h3>Vue d'ensemble</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value" id="total-article-count">--</div>
          <div class="stat-label">Articles au total</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="categories-count">--</div>
          <div class="stat-label">Catégories</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="tags-count">--</div>
          <div class="stat-label">Tags uniques</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="recent-count">--</div>
          <div class="stat-label">Ce mois</div>
        </div>
      </div>
    </div>

    <!-- Distribution des catégories -->
    <div class="dashboard-card chart-card">
      <h3>Répartition par catégorie</h3>
      <div class="chart-controls">
        <button class="chart-type-btn active" data-type="bar">Barres</button>
        <button class="chart-type-btn" data-type="pie">Camembert</button>
      </div>
      <div class="chart-container">
        <canvas id="categories-chart"></canvas>
      </div>
    </div>

    <!-- Nuage de tags -->
    <div class="dashboard-card">
      <h3>Tags populaires</h3>
      <div class="tag-cloud" id="tag-cloud">
        <div class="tag-cloud-loading">Chargement des tags...</div>
      </div>
    </div>

    <!-- Articles récents -->
    <div class="dashboard-card recent-articles-card">
      <h3>Articles récents</h3>
      <div id="recent-articles" class="recent-articles">
        <div class="loading-message">Chargement des articles récents...</div>
      </div>
    </div>
  </div>

  <!-- Chronologie -->
  <div class="dashboard-card timeline-card">
    <h3>Activité de veille au fil du temps</h3>
    <div class="chart-container">
      <canvas id="timeline-chart"></canvas>
    </div>
  </div>
</div>

<style>
  /* Styles du dashboard */
  .dashboard-container {
    background-color: var(--color-sidebar-background);
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
  }

  .dashboard-controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .timeframe-selector, .view-controls {
    display: flex;
    gap: 0.5rem;
  }

  .timeframe-btn, .chart-type-btn {
    background-color: #1b1d21;
    border: 1px solid #30363d;
    color: var(--color-text);
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, box-shadow 0.2s;
  }

  .timeframe-btn:hover, .chart-type-btn:hover {
    background-color: #30363d;
  }

  .timeframe-btn.active, .chart-type-btn.active {
    background-color: var(--color-accent);
    color: var(--color-background);
    border-color: var(--color-accent);
  }

  .dashboard-btn {
    background-color: #1b1d21;
    border: 1px solid #30363d;
    color: var(--color-text);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s, box-shadow 0.2s;
  }

  .dashboard-btn.primary {
    background-color: var(--color-accent);
    color: var(--color-background);
    border-color: var(--color-accent);
  }

  .dashboard-btn:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .dashboard-card {
    background-color: #1b1d21;
    border-radius: 6px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .dashboard-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-accent);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }

  .stat-card {
    background-color: #131415;
    padding: 1rem;
    border-radius: 4px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, var(--color-accent), var(--color-accent-alt));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #8b949e;
  }

  .chart-card {
    grid-column: span 2;
  }

  .chart-controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.75rem;
    gap: 0.5rem;
  }

  .chart-container {
    height: 250px;
    position: relative;
  }

  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem;
    min-height: 150px;
  }

  .tag-cloud-item {
    display: inline-block;
    margin: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    background-color: rgba(8, 247, 254, 0.1);
    color: var(--color-text);
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
  }

  .tag-cloud-item:hover {
    transform: scale(1.1);
    background-color: rgba(8, 247, 254, 0.2);
  }

  .tag-cloud-item.size-1 { font-size: 0.85rem; }
  .tag-cloud-item.size-2 { font-size: 1rem; }
  .tag-cloud-item.size-3 { font-size: 1.15rem; }
  .tag-cloud-item.size-4 { font-size: 1.3rem; font-weight: 600; }

  .tag-cloud-loading, .loading-message {
    color: #8b949e;
    text-align: center;
    padding: 2rem 0;
  }

  .recent-articles {
    max-height: 350px;
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .recent-articles-card {
    grid-row: span 2;
  }

  .article-item {
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background-color: #131415;
    border-radius: 4px;
    transition: transform 0.2s;
  }

  .article-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }

  .article-title {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 500;
  }

  .article-title a {
    color: var(--color-accent);
    text-decoration: none;
  }

  .article-title a:hover {
    text-decoration: underline;
  }

  .article-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #8b949e;
  }

  .article-category {
    padding: 0.15rem 0.5rem;
    border-radius: 10px;
    color: var(--color-background);
    font-weight: 500;
  }

  .timeline-card {
    margin-top: 1rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .dashboard-controls {
      flex-direction: column;
    }

    .chart-card {
      grid-column: span 1;
    }

    .stat-card {
      padding: 0.75rem;
    }

    .stat-value {
      font-size: 1.5rem;
    }
  }
</style>

<script>
/**
 * Dashboard analytique avancé - Script corrigé
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initialisation du dashboard analytique avancé");
  
  // Vérifier si nous sommes sur la page dashboard
  const dashboardContainer = document.querySelector(".dashboard-container");
  if (!dashboardContainer) {
    console.log("Conteneur de dashboard non trouvé");
    return;
  }
  
  initDashboard();
});
let siteRoot;
// Replace the existing initDashboard function with this improved version
async function initDashboard() {

    // Construction of base URL
  siteRoot = window.location.origin + (window.location.pathname.includes("/veille_techno-OC") ? "/veille_techno-OC/" : "/");

  // Configuration des catégories
  const categories = [
    { id: "auto_tests", label: "🧪 Tests", color: "#4285F4", tag: "test" },
    { id: "auto_ui", label: "🎨 UI", color: "#EA4335", tag: "ui" },
    { id: "auto_paradigmes", label: "🧠 Paradigmes", color: "#FBBC05", tag: "paradigm" },
    { id: "auto_stack", label: "🌐 Java/Angular", color: "#34A853", tag: "stack" }
  ];
  
  // Construction de l'URL de base plus robuste pour GitHub Pages
  const siteRoot = window.location.origin + (window.location.pathname.includes("/veille_techno-OC") 
    ? "/veille_techno-OC/" 
    : "/");
  
  console.log("URL de base pour récupérer les données:", siteRoot);
  
  // Variables pour stocker les données
  let totalArticleCount = 0;
  let allArticles = [];
  let allTags = {};
  const categoryStats = [];
  
  // Charger les données pour toutes les catégories
  for (const category of categories) {
    try {
      // Simplifier pour n'utiliser que les URL qui fonctionnent selon la console
const possibleUrls = [
  `${siteRoot}${category.id}/`,
  `${siteRoot}${category.id}`,
  `${siteRoot}${category.id}.html`
];
      
      console.log(`Tentatives d'URLs pour ${category.label}:`, possibleUrls);
      console.log(`Full URL being attempted: ${possibleUrls[0]}`);
      // Tester les URLs jusqu'à ce qu'une fonctionne
      let text = null;
      for (const url of possibleUrls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            text = await response.text();
            console.log(`URL fonctionnelle trouvée pour ${category.label}: ${url}`);
            break;
          }
        } catch (error) {
          console.warn(`Échec de fetch pour ${url}:`, error.message);
        }
      }
      
      if (!text) {
        throw new Error(`Aucune URL n'a fonctionné pour ${category.id}`);
      }
      
      // Créer un parser pour traiter le HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      
      // Extraire les articles des éléments li
      const listItems = doc.querySelectorAll("li");
      const articles = [];
      
      listItems.forEach(item => {
        // Vérifier si c'est un article
        const linkElement = item.querySelector("a");
        if (!linkElement) return;
        
        const title = linkElement.textContent.trim();
        const url = linkElement.getAttribute("href");
        
        // Tenter d'extraire les données depuis l'attribut data-article si disponible
        const dataSpan = item.querySelector('span[data-article]');
        if (dataSpan) {
          try {
            const articleData = JSON.parse(dataSpan.getAttribute('data-article').replace(/&apos;/g, "'"));
            
            // Extraire les tags
            const tags = articleData.tags || [];
            
            // Mettre à jour le compteur de tags global
            tags.forEach(tag => {
              if (!allTags[tag]) allTags[tag] = 0;
              allTags[tag]++;
            });
            
            // Créer l'objet article
            articles.push({
              title: articleData.title,
              url: articleData.link || url,
              date: new Date(articleData.date),
              dateStr: articleData.date || "Date inconnue",
              tags,
              category: category.label,
              categoryId: category.id,
              categoryColor: category.color
            });
            
            return;
          } catch (e) {
            console.warn("Erreur parsing data-article:", e);
          }
        }
        
        // Méthode alternative si data-article n'est pas disponible
        // Extraire la date (généralement en italique ou entre *)
        let dateStr = "Date inconnue";
        const italicDate = item.querySelector("em");
        if (italicDate) {
          dateStr = italicDate.textContent.trim();
        } else {
          const content = item.textContent;
          const dateMatch = content.match(/\*([^*]+)\*/);
          if (dateMatch) {
            dateStr = dateMatch[1].trim();
          }
        }
        
        // Extraire les tags (généralement en `#tag`)
        const tags = [];
        const codeElements = item.querySelectorAll("code");
        codeElements.forEach(code => {
          const text = code.textContent.trim();
          if (text.startsWith("#")) {
            const tag = text.substring(1);
            tags.push(tag);
            
            // Mettre à jour le compteur de tags global
            if (!allTags[tag]) allTags[tag] = 0;
            allTags[tag]++;
          }
        });
        
        let date = null;
        try {
          date = new Date(dateStr);
          if (isNaN(date.getTime())) date = null;
        } catch (e) {
          date = null;
        }
        
        articles.push({
          title,
          url,
          date,
          dateStr,
          tags,
          category: category.label,
          categoryId: category.id,
          categoryColor: category.color
        });
      });
      
      // Ajouter les articles à l'array global
      allArticles = [...allArticles, ...articles];
      const count = articles.length;
      totalArticleCount += count;
      
      console.log(`Articles extraits pour ${category.label}: ${count}`);
      
      // Ajouter les stats de catégorie
      categoryStats.push({
        label: category.label,
        count,
        color: category.color,
        tag: category.tag
      });
      
    } catch (error) {
      console.error(`Erreur lors du chargement de ${category.id}:`, error);
      
      // Ajouter des données fictives en cas d'erreur
      categoryStats.push({
        label: category.label,
        count: 0,
        color: category.color,
        tag: category.tag
      });
    }
  }
  
  console.log("Toutes les données sont chargées");
  console.log("Articles totaux:", totalArticleCount);
  console.log("Stats des catégories:", categoryStats);
  console.log("Tags uniques:", Object.keys(allTags).length);
  
  // Continuer avec le reste de la fonction pour mettre à jour l'UI
  updateDashboardStats(totalArticleCount, categories.length, Object.keys(allTags).length, allArticles);
  
  // Charger Chart.js si nécessaire et créer les visualisations
  if (typeof Chart === 'undefined') {
    console.log("Chargement de Chart.js...");
    await loadChartJS();
  }
  
  createCategoryChart(categoryStats);
  createTagCloud(allTags);
  displayRecentArticles(allArticles);
  createTimelineChart(allArticles);
  
  // Initialiser les contrôles du dashboard
  initDashboardControls(allArticles, categoryStats, allTags);
}

function updateDashboardStats(totalCount, categoriesCount, tagsCount, articles) {
  const totalArticleCount = document.getElementById('total-article-count');
  const categoriesCountElement = document.getElementById('categories-count');
  const tagsCountElement = document.getElementById('tags-count');
  const recentCountElement = document.getElementById('recent-count');
  
  // Vérifier que les éléments existent
  if (!totalArticleCount || !categoriesCountElement || !tagsCountElement || !recentCountElement) {
    console.error("Éléments de statistiques non trouvés dans le DOM");
    return;
  }
  
  // Mettre à jour les cartes de statistiques
  totalArticleCount.textContent = totalCount;
  categoriesCountElement.textContent = categoriesCount;
  tagsCountElement.textContent = tagsCount;
  
  // Compter les articles de ce mois
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  
  const recentArticles = articles.filter(article => {
    if (!article.date) return false;
    return article.date.getMonth() === thisMonth && article.date.getFullYear() === thisYear;
  });
  
  recentCountElement.textContent = recentArticles.length;
}

async function loadChartJS() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js";
    script.integrity = "sha512-ElRFoEQdI5Ht6kZvyzXhYG9NqjtkmlkfYk0wr6wHxU9JEHakS7UJZNeml5ALk+8IKlU6jDgMabC3vkumRokgJA==";
    script.crossOrigin = "anonymous";
    script.referrerPolicy = "no-referrer";
    
    script.onload = () => {
      console.log("Chart.js chargé avec succès");
      resolve();
    };
    script.onerror = () => {
      console.error("Échec du chargement de Chart.js");
      reject(new Error("Échec du chargement de Chart.js"));
    };
    
    document.head.appendChild(script);
  });
}

function createCategoryChart(categoryStats) {
  const ctx = document.getElementById('categories-chart')?.getContext('2d');
  if (!ctx) {
    console.error("Contexte du canvas pour le graphique des catégories non trouvé");
    return;
  }
  
  // Vérifier si nous avons des données à afficher
  if (categoryStats.length === 0) {
    console.warn("Pas de données pour le graphique des catégories");
    return;
  }
  
  // Graphique initial (diagramme à barres)
  createChart('bar');
  
  // Boutons de changement de type de graphique
  const chartTypeButtons = document.querySelectorAll('.chart-type-btn');
  chartTypeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Mettre à jour l'état actif
      chartTypeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Créer un nouveau graphique avec le type sélectionné
      createChart(this.getAttribute('data-type'));
    });
  });
  
  function createChart(type) {
    // Détruire le graphique existant s'il y en a un
    const existingChart = Chart.getChart(ctx.canvas);
    if (existingChart) {
      existingChart.destroy();
    }
    
    // Préparer les données
    const labels = categoryStats.map(item => item.label);
    const data = categoryStats.map(item => item.count);
    const colors = categoryStats.map(item => item.color);
    
    console.log(`Création du graphique de type ${type} avec données:`, { labels, data, colors });
    
    // Options communes
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: type === 'pie',
          position: 'bottom',
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text'),
            padding: 15,
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              return `${label}: ${value} article${value !== 1 ? 's' : ''}`;
            }
          }
        }
      }
    };
    
    // Options spécifiques au type
    if (type === 'bar') {
      Object.assign(options, {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              color: getComputedStyle(document.documentElement).getPropertyValue('--color-text')
            },
            grid: {
              color: '#30363d'
            }
          },
          x: {
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--color-text')
            },
            grid: {
              color: '#30363d'
            }
          }
        }
      });
    }
    
    // Créer le graphique
    new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombre d\'articles',
          data: data,
          backgroundColor: colors,
          borderColor: type === 'bar' ? colors.map(color => adjustColor(color, -20)) : '#fff',
          borderWidth: type === 'bar' ? 1 : 2,
          hoverOffset: type === 'pie' ? 15 : 0
        }]
      },
      options: options
    });
  }
}

function createTagCloud(tags) {
  const tagCloudElement = document.getElementById('tag-cloud');
  if (!tagCloudElement) {
    console.error("Conteneur pour le nuage de tags non trouvé");
    return;
  }
  
  // Effacer le message de chargement
  tagCloudElement.innerHTML = '';
  
  // Convertir en tableau et trier par fréquence
  const tagArray = Object.entries(tags)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
  
  if (tagArray.length === 0) {
    tagCloudElement.innerHTML = '<div class="tag-cloud-loading">Aucun tag trouvé</div>';
    return;
  }
  
  console.log("Tags les plus populaires:", tagArray.slice(0, 5));
  
  // Trouver le compte maximum pour le dimensionnement
  const maxCount = tagArray[0].count;
  
  // Créer les éléments du nuage de tags
  tagArray.forEach(({ tag, count }) => {
    // Calculer la classe de taille (1-4) basée sur le compte relatif
    const sizeClass = Math.max(1, Math.min(4, Math.ceil((count / maxCount) * 4)));
    
    // Calculer la couleur en fonction de la fréquence
    const hue = (count / maxCount) * 180 + 180; // Du cyan au rose
    const color = `hsl(${hue}, 80%, 65%)`;
    
    const tagElement = document.createElement('span');
    tagElement.className = `tag-cloud-item size-${sizeClass}`;
    tagElement.style.color = color;
    tagElement.textContent = tag;
    tagElement.setAttribute('data-count', count);
    tagElement.setAttribute('title', `${count} article${count !== 1 ? 's' : ''}`);
    
    tagElement.addEventListener('click', () => {
      window.location.href = `${siteRoot}latest-updates?tag=${encodeURIComponent(tag)}`;
    });
    
    tagCloudElement.appendChild(tagElement);
  });
}

function displayRecentArticles(articles) {
  const container = document.getElementById('recent-articles');
  if (!container) {
    console.error("Conteneur pour les articles récents non trouvé");
    return;
  }
  
  // Effacer le message de chargement
  container.innerHTML = '';
  
  if (articles.length === 0) {
    container.innerHTML = '<div class="loading-message">Aucun article trouvé</div>';
    return;
  }
  
  // Trier par date (plus récent d'abord)
  const sortedArticles = [...articles].sort((a, b) => {
    if (a.date && b.date) return b.date - a.date;
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });
  
  console.log("Articles récents à afficher:", sortedArticles.slice(0, 3).map(a => a.title));
  
  // Afficher les 10 articles les plus récents
  sortedArticles.slice(0, 10).forEach(article => {
    const itemElement = document.createElement('div');
    itemElement.className = 'article-item';
    itemElement.setAttribute('data-category', article.categoryId);
    
    // Formater la date proprement si possible
    let formattedDate = article.dateStr;
    if (article.date) {
      try {
        formattedDate = article.date.toLocaleDateString();
      } catch (e) {
        // Garder le format original si le formatage échoue
      }
    }
    
    itemElement.innerHTML = `
      <h4 class="article-title">
        <a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a>
      </h4>
      <div class="article-meta">
        <span class="article-category" style="background-color: ${article.categoryColor}">
          ${article.category}
        </span>
        <span class="article-date">${formattedDate}</span>
      </div>
    `;
    
    container.appendChild(itemElement);
  });
}

function createTimelineChart(articles) {
  const ctx = document.getElementById('timeline-chart')?.getContext('2d');
  if (!ctx || articles.length === 0) {
    console.warn("Contexte du graphique de chronologie non trouvé ou pas d'articles");
    return;
  }
  
  // Regrouper les articles par mois
  const articlesByMonth = {};
  const articlesByMonthCategory = {};
  
  articles.forEach(article => {
    if (!article.date) return;
    
    const month = `${article.date.getFullYear()}-${String(article.date.getMonth() + 1).padStart(2, '0')}`;
    
    // Compter le total par mois
    if (!articlesByMonth[month]) {
      articlesByMonth[month] = 0;
    }
    articlesByMonth[month]++;
    
    // Compter par catégorie et mois
    if (!articlesByMonthCategory[month]) {
      articlesByMonthCategory[month] = {};
    }
    
    const categoryId = article.categoryId;
    if (!articlesByMonthCategory[month][categoryId]) {
      articlesByMonthCategory[month][categoryId] = 0;
    }
    articlesByMonthCategory[month][categoryId]++;
  });
  
  // Trier les mois
  const months = Object.keys(articlesByMonth).sort();
  
  // Préparer la structure du dataset 
  const sortedArticles = [];
  months.forEach(month => {
    const [year, monthNumber] = month.split('-');
    const date = new Date(year, monthNumber - 1, 1);
    const label = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' });
    
    sortedArticles.push({
      month,
      label,
      count: articlesByMonth[month],
      counts: articlesByMonthCategory[month]
    });
  });
  
  // Prendre les 12 derniers mois (ou moins s'il n'y a pas assez de données)
  const timelineData = sortedArticles.slice(-12);
  
  console.log("Données de chronologie:", timelineData);
  
  // Obtenir les catégories
  const categories = [
    { id: "auto_tests", label: "Tests", color: "#4285F4" },
    { id: "auto_ui", label: "UI", color: "#EA4335" },
    { id: "auto_paradigmes", label: "Paradigmes", color: "#FBBC05" },
    { id: "auto_stack", label: "Java/Angular", color: "#34A853" }
  ];
  
  // Préparer les datasets pour chaque catégorie
  const datasets = categories.map(category => {
    return {
      label: category.label,
      data: timelineData.map(item => item.counts && item.counts[category.id] ? item.counts[category.id] : 0),
      backgroundColor: category.color,
      borderColor: category.color,
      borderWidth: 2,
      tension: 0.3,
      fill: false
    };
  });
  
  // Créer le graphique
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: timelineData.map(item => item.label),
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text'),
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          stacked: true,
          ticks: {
            precision: 0,
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text')
          },
          grid: {
            color: '#30363d'
          }
        },
        x: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text')
          },
          grid: {
            color: '#30363d'
          }
        }
      }
    }
  });
}

function initDashboardControls(allArticles, categoryStats, allTags) {
  // Bascule de thème
  const themeToggle = document.getElementById('toggle-theme-dashboard');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      themeToggle.textContent = document.body.classList.contains('dark-theme') 
        ? 'Mode clair' 
        : 'Mode sombre';
      localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
    
    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggle.textContent = 'Mode clair';
    }
  }
  
  // Filtrage par période
  const timeframeButtons = document.querySelectorAll('.timeframe-btn');
  timeframeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Mettre à jour l'état actif
      timeframeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filtrer les données selon la période sélectionnée
      const period = this.getAttribute('data-period');
      filterArticlesByPeriod(period, allArticles, categoryStats, allTags);
    });
  });
  
  // Export CSV
  const exportButton = document.getElementById('export-data');
  if (exportButton) {
    exportButton.addEventListener('click', () => {
      exportCSV(allArticles, categoryStats, allTags);
    });
  }
}

function filterArticlesByPeriod(period, allArticles, categoryStats, allTags) {
  let filteredArticles = [];
  const now = new Date();
  
  switch (period) {
    case 'week':
      // 7 derniers jours
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      filteredArticles = allArticles.filter(article => 
        article.date && article.date >= weekAgo
      );
      break;
      
    case 'month':
      // Mois en cours
      filteredArticles = allArticles.filter(article => 
        article.date && 
        article.date.getMonth() === now.getMonth() && 
        article.date.getFullYear() === now.getFullYear()
      );
      break;
      
    case 'all':
    default:
      // Tous les articles
      filteredArticles = [...allArticles];
      break;
  }
  
  console.log(`Filtrage par période '${period}': ${filteredArticles.length} articles`);
  
  // Recalculer les statistiques basées sur les articles filtrés
  let filteredCategoryStats = JSON.parse(JSON.stringify(categoryStats));
  let filteredTags = {};
  
  // Réinitialiser les compteurs
  filteredCategoryStats.forEach(cat => { cat.count = 0; });
  
  // Compter les articles par catégorie et collecter les tags
  filteredArticles.forEach(article => {
    // Mettre à jour les compteurs de catégorie
    const catIndex = filteredCategoryStats.findIndex(cat => 
      cat.label === article.category
    );
    if (catIndex !== -1) {
      filteredCategoryStats[catIndex].count++;
    }
    
    // Collecter les tags
    article.tags.forEach(tag => {
      if (!filteredTags[tag]) filteredTags[tag] = 0;
      filteredTags[tag]++;
    });
  });
  
  // Mettre à jour l'UI avec les données filtrées
  updateDashboardStats(
    filteredArticles.length, 
    categoryStats.length, 
    Object.keys(filteredTags).length,
    filteredArticles
  );
  
  // Mettre à jour les graphiques et visualisations
  if (typeof Chart !== 'undefined') {
    // Mettre à jour le graphique des catégories
    const categoryChart = Chart.getChart(document.getElementById('categories-chart'));
    if (categoryChart) {
      categoryChart.data.datasets[0].data = filteredCategoryStats.map(cat => cat.count);
      categoryChart.update();
    }
    
    // Mettre à jour la chronologie si elle existe
    const timelineChart = Chart.getChart(document.getElementById('timeline-chart'));
    if (timelineChart) {
      // Pour simplifier, on ne met pas à jour la chronologie ici
    }
  }
  
  // Mettre à jour le nuage de tags
  createTagCloud(filteredTags);
  
  // Mettre à jour les articles récents
  displayRecentArticles(filteredArticles);
}

function exportCSV(articles, categoryStats, tags) {
  // Préparer le contenu CSV
  let csv = 'Dashboard de veille technologique - Export\n\n';
  
  // Ajouter la date
  csv += `Date d'exportation,${new Date().toLocaleDateString()}\n\n`;
  
  // Ajouter les compteurs de catégorie
  csv += 'CATÉGORIES\n';
  csv += 'Catégorie,Nombre d\'articles\n';
  categoryStats.forEach(cat => {
    csv += `"${cat.label}",${cat.count}\n`;
  });
  
  csv += '\nTAGS POPULAIRES\n';
  csv += 'Tag,Nombre d\'occurrences\n';
  
  // Convertir l'objet tags en tableau trié
  const tagArray = Object.entries(tags)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
  
  tagArray.forEach(item => {
    csv += `"${item.tag}",${item.count}\n`;
  });
  
  csv += '\nARTICLES\n';
  csv += 'Titre,Catégorie,Date,URL\n';
  
  // Trier les articles par date (plus récent d'abord)
  const sortedArticles = [...articles].sort((a, b) => {
    if (a.date && b.date) return b.date - a.date;
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });
  
  sortedArticles.forEach(article => {
    const formattedDate = article.date 
      ? article.date.toLocaleDateString() 
      : article.dateStr;
    
    csv += `"${article.title}","${article.category}","${formattedDate}","${article.url}"\n`;
  });
  
  // Créer et déclencher le téléchargement
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `veille-techno-export-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  console.log("Export CSV généré et téléchargé");
}

// Fonction utilitaire pour ajuster la luminosité des couleurs
function adjustColor(color, percent) {
  if (!color) return '#cccccc';
  
  // Convertir hex en RGB
  let R = parseInt(color.substring(1,3), 16);
  let G = parseInt(color.substring(3,5), 16);
  let B = parseInt(color.substring(5,7), 16);

  // Ajuster les valeurs
  R = Math.max(0, Math.min(255, R + percent));
  G = Math.max(0, Math.min(255, G + percent));
  B = Math.max(0, Math.min(255, B + percent));

  // Reconvertir en hex
  const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
  const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
  const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

  return "#" + RR + GG + BB;
}

</script>
