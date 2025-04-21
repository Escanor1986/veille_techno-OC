/**
 * dashboard.js - Dashboard amélioré avec graphiques et analyse de tags
 */

document.addEventListener("DOMContentLoaded", () => {
  // Vérifier si nous sommes sur la page d'accueil avec dashboard
  const dashboardElement = document.getElementById("dashboard-stats");
  if (!dashboardElement) return;
  
  // Initialiser le dashboard
  initDashboard(dashboardElement);
});

async function initDashboard(dashboardElement) {
  // Configuration des catégories
  const categories = [
    { id: "auto_tests.md", label: "🧪 Tests", color: "#4285F4", tag: "test" },
    { id: "auto_ui.md", label: "🎨 UI", color: "#EA4335", tag: "ui" },
    { id: "auto_paradigmes.md", label: "🧠 Paradigmes", color: "#FBBC05", tag: "paradigm" },
    { id: "auto_stack.md", label: "🌐 Java/Angular", color: "#34A853", tag: "stack" }
  ];
  
  // Créer la structure du dashboard
  createDashboardStructure(dashboardElement);
  
  // Charger les styles CSS
  loadDashboardStyles();
  
  // Initialiser les onglets
  initTabs();
  
  // Variables pour stocker les données
  const categoryStats = [];
  const allTags = {};
  let allArticles = [];
  let totalCount = 0;
  
  // Récupérer les données de chaque catégorie
  const baseUrl = window.location.origin + window.location.pathname.replace(/\/$/, "/");
  
  for (const category of categories) {
    try {
      const response = await fetch(baseUrl + category.id);
      const text = await response.text();
      
      // Extraction des articles
      const articleMatches = text.match(/^- \[(.*?)\]\((.*?)\)(.*?)$/gm) || [];
      const count = articleMatches.length;
      totalCount += count;
      
      // Extraire les articles et leurs tags
      const articles = articleMatches.map(match => {
        const titleMatch = match.match(/^- \[(.*?)\]\((.*?)\)(.*)$/);
        if (titleMatch) {
          const title = titleMatch[1];
          const url = titleMatch[2];
          const dateMatch = titleMatch[3].match(/\*([^*]+)\*/);
          const date = dateMatch ? dateMatch[1].trim() : 'Date inconnue';
          
          // Extraire les tags
          const tagsMatches = titleMatch[3].match(/`#([^`]+)`/g) || [];
          const tags = tagsMatches.map(tag => tag.replace(/`#|`/g, ''));
          
          // Mettre à jour le compteur de tags global
          tags.forEach(tag => {
            if (!allTags[tag]) allTags[tag] = 0;
            allTags[tag]++;
          });
          
          return { 
            title, 
            url, 
            date, 
            tags,
            category: category.label,
            categoryTag: category.tag,
            color: category.color
          };
        }
        return null;
      }).filter(article => article !== null);
      
      // Stocker les articles
      allArticles = [...allArticles, ...articles];
      
      // Stocker les statistiques par catégorie
      categoryStats.push({
        label: category.label,
        count: count,
        color: category.color,
        tag: category.tag
      });
      
      // Mettre à jour la table des statistiques
      const statsTable = document.getElementById("stats-table-body");
      if (statsTable) {
        const row = document.createElement("tr");
        row.setAttribute('data-category', category.tag);
        row.innerHTML = `
          <td>
            <span class="category-badge" style="background-color: ${category.color}">
              ${category.label}
            </span>
          </td>
          <td>${count}</td>
          <td>${new Date().toLocaleDateString()}</td>
        `;
        statsTable.appendChild(row);
      }
      
      // Mettre à jour le total
      document.getElementById("total-count").textContent = totalCount;
      
    } catch (error) {
      console.error(`Erreur lors du chargement de ${category.id}:`, error);
      
      // Ajouter quand même une ligne pour la catégorie
      const statsTable = document.getElementById("stats-table-body");
      if (statsTable) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>
            <span class="category-badge" style="background-color: ${category.color}">
              ${category.label}
            </span>
          </td>
          <td>⚠️ Erreur</td>
          <td>-</td>
        `;
        statsTable.appendChild(row);
      }
    }
  }
  
  // Si nous avons des données
  if (categoryStats.length > 0) {
    // Générer les graphiques
    await loadChartsLibrary();
    renderCharts(categoryStats);
    
    // Afficher les tags populaires
    displayPopularTags(allTags);
    
    // Afficher les articles récents
    displayRecentArticles(allArticles);
  }
  
  // Initialiser le bouton de basculement du thème
  initThemeToggle();
}

function createDashboardStructure(dashboardElement) {
  dashboardElement.innerHTML = `
    <div class="dashboard-header">
      <h2>📊 Tableau de bord de veille technologique</h2>
      <div class="dashboard-controls">
        <button id="toggle-theme-btn" class="dashboard-btn">Mode sombre</button>
        <button id="export-data-btn" class="dashboard-btn">Exporter</button>
      </div>
    </div>
    
    <div class="dashboard-tabs">
      <button class="tab-btn active" data-tab="stats-tab">Statistiques</button>
      <button class="tab-btn" data-tab="recent-tab">Articles récents</button>
      <button class="tab-btn" data-tab="tags-tab">Tags populaires</button>
      <button class="tab-btn" data-tab="charts-tab">Graphiques</button>
    </div>
    
    <div class="tab-content">
      <!-- Onglet Statistiques -->
      <div id="stats-tab" class="tab-pane active">
        <table class="stats-table">
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Nombre d'articles</th>
              <th>Dernière mise à jour</th>
            </tr>
          </thead>
          <tbody id="stats-table-body"></tbody>
          <tfoot>
            <tr>
              <td><strong>📚 Total</strong></td>
              <td id="total-count">0</td>
              <td>-</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <!-- Onglet Articles récents -->
      <div id="recent-tab" class="tab-pane">
        <div class="search-filter">
          <input type="text" id="recent-search" placeholder="Filtrer les articles..." class="search-input">
        </div>
        <div id="recent-articles" class="recent-articles-container">
          <p class="loading">Chargement des articles récents...</p>
        </div>
      </div>
      
      <!-- Onglet Tags populaires -->
      <div id="tags-tab" class="tab-pane">
        <div class="tag-cloud-container">
          <div id="tag-cloud" class="tag-cloud">
            <p class="loading">Analyse des tags en cours...</p>
          </div>
          <div id="tag-stats" class="tag-stats">
            <h3>Top 10 des tags</h3>
            <div id="top-tags-list" class="top-tags-list"></div>
          </div>
        </div>
      </div>
      
      <!-- Onglet Graphiques -->
      <div id="charts-tab" class="tab-pane">
        <div class="chart-controls">
          <button id="toggle-chart-type" class="chart-btn">Changer de graphique</button>
        </div>
        <div class="charts-container">
          <div class="chart-wrapper">
            <canvas id="categories-chart"></canvas>
          </div>
          <div class="chart-wrapper">
            <canvas id="tags-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initTabs() {
  // Ajouter des écouteurs d'événements aux onglets
  const tabButtons = document.querySelectorAll(".tab-btn");
  
  tabButtons.forEach(button => {
    button.addEventListener("click", function() {
      // Retirer la classe active de tous les onglets
      tabButtons.forEach(btn => btn.classList.remove("active"));
      
      // Ajouter la classe active à l'onglet cliqué
      this.classList.add("active");
      
      // Masquer tous les contenus d'onglet
      document.querySelectorAll(".tab-pane").forEach(pane => {
        pane.classList.remove("active");
      });
      
      // Afficher le contenu de l'onglet correspondant
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

function initThemeToggle() {
  const themeButton = document.getElementById("toggle-theme-btn");
  
  themeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-theme");
    
    // Sauvegarder le thème dans le localStorage
    const isDarkTheme = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    
    // Mettre à jour le texte du bouton
    this.textContent = isDarkTheme ? "Mode clair" : "Mode sombre";
    
    // Mettre à jour les graphiques si nécessaire
    updateChartsTheme(isDarkTheme);
  });
  
  // Appliquer le thème sauvegardé
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeButton.textContent = "Mode clair";
  }
}

async function loadChartsLibrary() {
  // Vérifier si Chart.js est déjà chargé
  if (typeof Chart !== 'undefined') return;
  
  // Charger Chart.js
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js";
    script.integrity = "sha512-ElRFoEQdI5Ht6kZvyzXhYG9NqjtkmlkfYk0wr6wHxU9JEHakS7UJZNeml5ALk+8IKlU6jDgMabC3vkumRokgJA==";
    script.crossOrigin = "anonymous";
    script.referrerPolicy = "no-referrer";
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Échec du chargement de Chart.js"));
    
    document.head.appendChild(script);
  });
}

function renderCharts(categoryStats) {
  // Graphique des catégories
  renderCategoryChart(categoryStats);
  
  // Écouteur pour changer le type de graphique
  document.getElementById("toggle-chart-type").addEventListener("click", function() {
    const chart = Chart.getChart("categories-chart");
    if (!chart) return;
    
    // Alterner entre bar et pie
    const newType = chart.config.type === 'bar' ? 'pie' : 'bar';
    chart.destroy();
    
    // Recréer le graphique avec le nouveau type
    renderCategoryChart(categoryStats, newType);
  });
}

function renderCategoryChart(categoryStats, type = 'bar') {
  const ctx = document.getElementById("categories-chart").getContext("2d");
  const isDarkTheme = document.body.classList.contains("dark-theme");
  
  // Configurer les options en fonction du thème
  const textColor = isDarkTheme ? '#c9d1d9' : '#333';
  const gridColor = isDarkTheme ? '#30363d' : '#e1e4e8';
  
  // Données du graphique
  const labels = categoryStats.map(stat => stat.label);
  const data = categoryStats.map(stat => stat.count);
  const colors = categoryStats.map(stat => stat.color);
  
  // Options communes
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Répartition des articles par catégorie',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: textColor,
        padding: 20
      },
      legend: {
        display: type === 'pie',
        position: 'bottom',
        labels: {
          color: textColor,
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            if (type === 'pie') {
              return ` ${context.label}: ${context.raw} articles`;
            }
            return ` ${context.raw} articles`;
          }
        }
      }
    }
  };
  
  // Options spécifiques au type de graphique
  let specificOptions = {};
  
  if (type === 'bar') {
    specificOptions = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
            color: textColor
          },
          grid: {
            color: gridColor
          },
          title: {
            display: true,
            text: 'Nombre d\'articles',
            color: textColor
          }
        },
        x: {
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
          }
        }
      }
    };
  } else if (type === 'pie') {
    specificOptions = {
      cutout: '0%',
      radius: '90%'
    };
  }
  
  // Fusionner les options
  const options = { ...commonOptions, ...specificOptions };
  
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
  
  // Rendre le graphique des tags
  renderTagsChart(type);
}

function renderTagsChart(type = 'bar') {
  const ctx = document.getElementById("tags-chart").getContext("2d");
  const isDarkTheme = document.body.classList.contains("dark-theme");
  
  // Récupérer les données de tags depuis l'élément DOM (créé par displayPopularTags)
  const tagItems = document.querySelectorAll('.top-tag-item');
  if (!tagItems || tagItems.length === 0) return;
  
  // Extraire les données
  const tags = [];
  const counts = [];
  const colors = [];
  
  tagItems.forEach((item, index) => {
    const tagName = item.querySelector('.tag-name').textContent;
    const tagCount = parseInt(item.querySelector('.tag-count').textContent);
    
    tags.push(tagName);
    counts.push(tagCount);
    
    // Générer une couleur à partir d'une palette prédéfinie ou calculée
    const hue = (index * 137.5) % 360; // Distribution uniforme des teintes
    colors.push(`hsl(${hue}, 70%, 60%)`);
  });
  
  // Configurer les options en fonction du thème
  const textColor = isDarkTheme ? '#c9d1d9' : '#333';
  const gridColor = isDarkTheme ? '#30363d' : '#e1e4e8';
  
  // Options communes
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Tags les plus populaires',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: textColor,
        padding: 20
      },
      legend: {
        display: type === 'pie' || type === 'doughnut',
        position: 'bottom',
        labels: {
          color: textColor,
          padding: 15,
          usePointStyle: true,
          boxWidth: 8
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            if (type === 'pie' || type === 'doughnut') {
              return ` ${context.label}: ${context.raw} articles`;
            }
            return ` ${context.raw} articles`;
          }
        }
      }
    }
  };
  
  // Options spécifiques au type de graphique
  let specificOptions = {};
  
  if (type === 'bar') {
    specificOptions = {
      indexAxis: 'y', // Bar horizontale pour mieux afficher les noms de tags
      scales: {
        y: {
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
          }
        },
        x: {
          beginAtZero: true,
          ticks: {
            precision: 0,
            color: textColor
          },
          grid: {
            color: gridColor
          },
          title: {
            display: true,
            text: 'Nombre d\'articles',
            color: textColor
          }
        }
      }
    };
  } else if (type === 'pie' || type === 'doughnut') {
    specificOptions = {
      cutout: type === 'doughnut' ? '50%' : '0%',
      radius: '90%'
    };
  }
  
  // Fusionner les options
  const options = { ...commonOptions, ...specificOptions };
  
  // Créer le graphique
  new Chart(ctx, {
    type: type === 'bar' ? 'bar' : 'doughnut', // Utiliser doughnut pour les tags
    data: {
      labels: tags,
      datasets: [{
        label: 'Nombre d\'articles',
        data: counts,
        backgroundColor: colors,
        borderColor: type === 'bar' ? colors.map(color => adjustColor(color, -20)) : '#fff',
        borderWidth: type === 'bar' ? 1 : 2,
        hoverOffset: type !== 'bar' ? 15 : 0
      }]
    },
    options: options
  });
}

function updateChartsTheme(isDarkTheme) {
  // Mettre à jour les graphiques existants avec les nouveaux paramètres de thème
  const charts = Object.values(Chart.instances);
  
  charts.forEach(chart => {
    const textColor = isDarkTheme ? '#c9d1d9' : '#333';
    const gridColor = isDarkTheme ? '#30363d' : '#e1e4e8';
    
    // Mettre à jour les couleurs du texte et de la grille
    if (chart.options.plugins && chart.options.plugins.title) {
      chart.options.plugins.title.color = textColor;
    }
    
    if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
      chart.options.plugins.legend.labels.color = textColor;
    }
    
    if (chart.options.scales && chart.options.scales.y) {
      chart.options.scales.y.ticks.color = textColor;
      chart.options.scales.y.grid.color = gridColor;
      if (chart.options.scales.y.title) {
        chart.options.scales.y.title.color = textColor;
      }
    }
    
    if (chart.options.scales && chart.options.scales.x) {
      chart.options.scales.x.ticks.color = textColor;
      chart.options.scales.x.grid.color = gridColor;
      if (chart.options.scales.x.title) {
        chart.options.scales.x.title.color = textColor;
      }
    }
    
    chart.update();
  });
}

function displayPopularTags(allTags) {
  const tagCloudElement = document.getElementById("tag-cloud");
  const topTagsElement = document.getElementById("top-tags-list");
  
  if (!tagCloudElement || !topTagsElement) return;
  
  // Convertir l'objet de tags en tableau pour le tri
  const tagsArray = Object.entries(allTags)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
  
  // Afficher le nuage de tags
  tagCloudElement.innerHTML = "";
  
  if (tagsArray.length === 0) {
    tagCloudElement.innerHTML = "<p>Aucun tag trouvé.</p>";
    return;
  }
  
  // Trouver la valeur maximale pour calculer les tailles relatives
  const maxCount = tagsArray[0].count;
  
  // Créer le nuage de tags
  tagsArray.forEach(({ tag, count }) => {
    // Calculer la taille relative (de 1 à 4)
    const size = 1 + Math.floor((count / maxCount) * 3);
    
    // Calculer la couleur (du plus clair au plus foncé en fonction de la popularité)
    const intensity = Math.floor(40 + (count / maxCount) * 60);
    const color = `hsl(210, 100%, ${intensity}%)`;
    
    const tagElement = document.createElement("span");
    tagElement.className = `tag-cloud-item size-${size}`;
    tagElement.setAttribute("data-count", count);
    tagElement.style.color = color;
    tagElement.textContent = tag;
    
    // Ajouter un écouteur d'événements pour la recherche
    tagElement.addEventListener("click", function() {
      // Rediriger vers la page de résultats avec ce tag préselectionné
      window.location.href = `latest-updates.html?tag=${encodeURIComponent(tag)}`;
    });
    
    tagCloudElement.appendChild(tagElement);
  });
  
  // Afficher le top 10 des tags
  topTagsElement.innerHTML = "";
  
  // Créer la liste des 10 tags les plus populaires
  tagsArray.slice(0, 10).forEach(({ tag, count }, index) => {
    const tagItem = document.createElement("div");
    tagItem.className = "top-tag-item";
    
    // Calculer la couleur pour la barre de progression
    const hue = (index * 36) % 360; // 360 / 10 = 36 degrés par tag
    const color = `hsl(${hue}, 70%, 60%)`;
    
    // Calculer le pourcentage par rapport au maximum
    const percentage = Math.floor((count / maxCount) * 100);
    
    tagItem.innerHTML = `
      <div class="tag-rank">${index + 1}</div>
      <div class="tag-info">
        <div class="tag-name">${tag}</div>
        <div class="tag-progress">
          <div class="progress-bar" style="width: ${percentage}%; background-color: ${color}"></div>
        </div>
      </div>
      <div class="tag-count">${count}</div>
    `;
    
    topTagsElement.appendChild(tagItem);
  });
}

function displayRecentArticles(articles) {
  const recentArticlesElement = document.getElementById("recent-articles");
  
  if (!recentArticlesElement) return;
  
  // Trier les articles par date (du plus récent au plus ancien)
  articles.sort((a, b) => {
    const dateA = new Date(a.date.replace(/^\*|\*$/g, ""));
    const dateB = new Date(b.date.replace(/^\*|\*$/g, ""));
    
    // Si la conversion échoue, utiliser la chaîne originale
    if (isNaN(dateA) || isNaN(dateB)) {
      return a.date.localeCompare(b.date);
    }
    
    return dateB - dateA;
  });
  
  // Vider l'élément et enlever l'indicateur de chargement
  recentArticlesElement.innerHTML = "";
  recentArticlesElement.classList.remove("loading");
  
  if (articles.length === 0) {
    recentArticlesElement.innerHTML = "<p>Aucun article trouvé.</p>";
    return;
  }
  
  // Afficher les 10 articles les plus récents
  const recentList = document.createElement("div");
  recentList.className = "recent-articles-list";
  
  articles.slice(0, 10).forEach(article => {
    const articleElement = document.createElement("div");
    articleElement.className = `article-card ${article.categoryTag}`;
    articleElement.setAttribute("data-tags", article.tags.join(" "));
    
    // Formater la date si possible
    let formattedDate = article.date;
    try {
      const dateObj = new Date(article.date.replace(/^\*|\*$/g, ""));
      if (!isNaN(dateObj)) {
        formattedDate = dateObj.toLocaleDateString();
      }
    } catch (e) {
      // Garder le format original en cas d'erreur
    }
    
    // Formater les tags
    const tagsHtml = article.tags.length > 0
      ? `<div class="article-tags">${article.tags.map(tag => `<span class="article-tag">#${tag}</span>`).join(" ")}</div>`
      : "";
    
    articleElement.innerHTML = `
      <div class="article-header">
        <span class="article-category" style="background-color: ${article.color}">
          ${article.category}
        </span>
        <span class="article-date">${formattedDate}</span>
      </div>
      <h3 class="article-title">
        <a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a>
      </h3>
      ${tagsHtml}
    `;
    
    recentList.appendChild(articleElement);
  });
  
  recentArticlesElement.appendChild(recentList);
  
  // Ajouter la fonctionnalité de recherche pour les articles récents
  document.getElementById("recent-search").addEventListener("input", function() {
    const searchTerm = this.value.toLowerCase();
    const articleCards = document.querySelectorAll(".article-card");
    
    articleCards.forEach(card => {
      const title = card.querySelector(".article-title").textContent.toLowerCase();
      const tags = card.getAttribute("data-tags").toLowerCase();
      const category = card.querySelector(".article-category").textContent.toLowerCase();
      
      if (title.includes(searchTerm) || tags.includes(searchTerm) || category.includes(searchTerm)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// Gestionnaire pour l'exportation des données
function initExportButton() {
  const exportButton = document.getElementById("export-data-btn");
  
  if (!exportButton) return;
  
  exportButton.addEventListener("click", function() {
    // Rassembler les données
    const data = {
      title: "Statistiques de veille technologique",
      date: new Date().toLocaleDateString(),
      categories: [],
      tags: [],
      recentArticles: []
    };
    
    // Récupérer les données des catégories
    document.querySelectorAll("#stats-table-body tr").forEach(row => {
      const categoryCell = row.querySelector("td:first-child");
      const countCell = row.querySelector("td:nth-child(2)");
      
      if (categoryCell && countCell) {
        data.categories.push({
          name: categoryCell.textContent.trim(),
          count: countCell.textContent.trim()
        });
      }
    });
    
    // Récupérer les tags populaires
    document.querySelectorAll(".top-tag-item").forEach(item => {
      const tagName = item.querySelector(".tag-name").textContent;
      const tagCount = item.querySelector(".tag-count").textContent;
      
      data.tags.push({
        name: tagName,
        count: parseInt(tagCount)
      });
    });
    
    // Récupérer les articles récents
    document.querySelectorAll(".article-card").forEach(card => {
      const title = card.querySelector(".article-title a").textContent;
      const url = card.querySelector(".article-title a").getAttribute("href");
      const category = card.querySelector(".article-category").textContent.trim();
      const date = card.querySelector(".article-date").textContent.trim();
      
      data.recentArticles.push({
        title,
        url,
        category,
        date
      });
    });
    
    // Générer le contenu CSV
    let csv = "Statistiques de veille technologique - " + data.date + "\n\n";
    
    // Ajouter les catégories
    csv += "CATÉGORIES\n";
    csv += "Nom,Nombre d'articles\n";
    data.categories.forEach(cat => {
      csv += `"${cat.name}","${cat.count}"\n`;
    });
    
    csv += "\nTAGS POPULAIRES\n";
    csv += "Tag,Nombre d'occurrences\n";
    data.tags.forEach(tag => {
      csv += `"${tag.name}","${tag.count}"\n`;
    });
    
    csv += "\nARTICLES RÉCENTS\n";
    csv += "Titre,Catégorie,Date,URL\n";
    data.recentArticles.forEach(article => {
      csv += `"${article.title}","${article.category}","${article.date}","${article.url}"\n`;
    });
    
    // Créer un élément de lien pour le téléchargement
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", "veille_technologique_" + new Date().toISOString().split("T")[0] + ".csv");
    link.style.display = "none";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// Fonction utilitaire pour ajuster les couleurs
function adjustColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
  
  return "#" + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

function loadDashboardStyles() {
  const style = document.createElement('style');
  style.textContent = `
  /* Styles pour le dashboard – Demon Slayer × Ghost in the Shell */
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .dashboard-controls {
    display: flex;
    gap: 0.75rem;
  }

  .dashboard-btn {
    background-color: var(--color-accent);
    color: var(--color-background);
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    transition: background-color 0.2s, box-shadow 0.2s;
  }
  .dashboard-btn:hover {
    background-color: var(--color-accent-alt);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
  }

  /* Tabs */
  .dashboard-tabs {
    display: flex;
    border-bottom: 1px solid #30363d;
    margin-bottom: 1rem;
  }
  .tab-btn {
    padding: 0.5rem 1rem;
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    font-weight: 500;
    color: var(--color-text);
    transition: color 0.2s, border-color 0.2s;
  }
  .tab-btn:hover {
    color: var(--color-accent);
  }
  .tab-btn.active {
    color: var(--color-accent-alt);
    border-bottom-color: var(--color-accent-alt);
  }

  /* Tab content */
  .tab-content {
    position: relative;
  }
  .tab-pane {
    display: none;
    animation: fadeIn 0.3s;
  }
  .tab-pane.active {
    display: block;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Tableau de statistiques */
  .stats-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
    border-radius: 6px;
    overflow: hidden;
    background-color: var(--color-sidebar-background);
  }
  .stats-table th,
  .stats-table td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #30363d;
    color: var(--color-text);
  }
  .stats-table th {
    background-color: #1b1d21;
    color: var(--color-accent);
    font-weight: 600;
  }
  .stats-table tr:last-child td {
    border-bottom: none;
  }
  .stats-table tbody tr:hover {
    background-color: #131415;
  }

  /* Badge de catégorie */
  .category-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--color-accent), var(--color-accent-alt));
    color: var(--color-background);
    font-size: 0.85rem;
    font-weight: 500;
  }

  /* Graphiques */
  .charts-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .chart-wrapper {
    flex: 1 1 45%;
    min-width: 300px;
    height: 350px;
    background-color: var(--color-sidebar-background);
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  }
  .chart-controls {
    margin-bottom: 0.75rem;
  }
  .chart-btn {
    background-color: #1b1d21;
    border: 1px solid #30363d;
    border-radius: 4px;
    padding: 0.4rem 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--color-text);
    transition: background-color 0.2s;
  }
  .chart-btn:hover {
    background-color: #30363d;
  }

  /* Tags populaires */
  .tag-cloud-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .tag-cloud,
  .tag-stats {
    background-color: var(--color-sidebar-background);
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  }
  .tag-cloud {
    flex: 2;
    min-width: 300px;
    text-align: center;
  }
  .tag-stats {
    flex: 1;
    min-width: 250px;
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

  .top-tags-list {
    margin-top: 1rem;
  }
  .top-tag-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .tag-rank {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: var(--color-accent);
    color: var(--color-background);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
    margin-right: 0.75rem;
  }
  .tag-info {
    flex: 1;
    margin-right: 0.75rem;
  }
  .tag-name {
    font-weight: 500;
    color: var(--color-text);
    margin-bottom: 0.25rem;
  }
  .tag-progress {
    height: 0.4rem;
    background-color: #1b1d21;
    border-radius: 0.2rem;
    overflow: hidden;
  }
  .progress-bar {
    height: 100%;
    border-radius: 0.2rem;
    background-color: var(--color-accent-alt);
  }
  .tag-count {
    font-weight: 500;
    color: var(--color-text);
    font-size: 0.85rem;
  }

  /* Articles récents */
  .search-filter {
    margin-bottom: 1rem;
  }
  .search-input {
    background-color: var(--color-background);
    border: 1px solid #30363d;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    width: 100%;
    color: var(--color-text);
    font-size: 0.9rem;
  }
  .recent-articles-container {
    max-height: 500px;
    overflow-y: auto;
    padding-right: 0.5rem;
    scrollbar-color: var(--color-accent) #1b1d21;
  }
  .recent-articles-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .article-card {
    background-color: var(--color-sidebar-background);
    border: 1px solid #30363d;
    border-radius: 6px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .article-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.8);
  }
  .article-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .article-category {
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    background: linear-gradient(135deg, var(--color-accent-alt), var(--color-accent));
    color: var(--color-background);
  }
  .article-date {
    font-size: 0.75rem;
    color: #8b949e;
  }
  .article-title {
    margin: 0 0 0.5rem;
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
  .article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  .article-tag {
    background-color: rgba(8, 247, 254, 0.1);
    color: var(--color-accent);
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
    font-size: 0.75rem;
  }
  .loading {
    text-align: center;
    padding: 1rem;
    color: #8b949e;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
    }
    .dashboard-controls {
      margin-top: 1rem;
      width: 100%;
      justify-content: space-between;
    }
    .charts-container {
      flex-direction: column;
    }
    .chart-wrapper {
      flex: 1 1 100%;
    }
    .tag-cloud-container {
      flex-direction: column;
    }
  }
`;

  
  document.head.appendChild(style);
}
