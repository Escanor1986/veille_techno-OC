/**
 * Dashboard analytique pour la veille technologique
 * Version améliorée avec graphique et fonctionnalités responsives
 */
document.addEventListener("DOMContentLoaded", () => {
  // Configuration des catégories et fichiers
  const categories = [
    { id: "auto_tests.md", label: "🧪 Librairies de test", color: "#4285F4", tag: "test" },
    { id: "auto_ui.md", label: "🎨 Librairies UI", color: "#EA4335", tag: "ui" },
    { id: "auto_paradigmes.md", label: "🧠 Paradigmes", color: "#FBBC05", tag: "paradigm" },
    { id: "auto_stack.md", label: "🌐 Stack Java / Angular", color: "#34A853", tag: "stack" }
  ];

  const baseUrl = window.location.origin + window.location.pathname.replace(/\/$/, "/");
  const dashboardElement = document.getElementById("dashboard-stats");
  
  if (!dashboardElement) return;
  
  // Création de la structure de base du dashboard
  dashboardElement.innerHTML = `
    <div class="dashboard-header">
      <h3>📊 Tableau de bord analytique</h3>
      <div class="dashboard-controls">
        <button id="toggle-chart" class="dashboard-btn">Afficher graphique</button>
        <button id="toggle-theme" class="dashboard-btn">Mode sombre</button>
      </div>
    </div>
    
    <div class="stats-container">
      <table class="stats-table">
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Nombre d'articles</th>
            <th>Dernière mise à jour</th>
          </tr>
        </thead>
        <tbody id="stats-body"></tbody>
        <tfoot>
          <tr>
            <td><strong>🧮 Total</strong></td>
            <td id="total-count">0</td>
            <td>-</td>
          </tr>
        </tfoot>
      </table>
      
      <div id="chart-container" style="display: none; height: 300px; margin-top: 20px;">
        <canvas id="stats-chart"></canvas>
      </div>
    </div>
    
    <div id="latest-articles" class="latest-articles">
      <h4>📰 Articles récents</h4>
      <div id="latest-articles-content" class="loading">Chargement des articles...</div>
    </div>
  `;

  // Variables pour stocker les données
  let totalCount = 0;
  let chartInstance = null;
  let allArticles = [];
  const categoryStats = [];
  
  // Ajout des styles CSS dynamiques
  addCustomStyles();
  
  // Récupération des données pour chaque catégorie
  categories.forEach(category => {
    fetch(baseUrl + category.id.replace('.md', '/'))
      .then(res => res.text())
      .then(text => {
        // Extraction des articles avec regex améliorée pour capturer plus d'informations
        const articleMatches = text.match(/^- \[(.*?)\]\((.*?)\)(.*?)$/gm) || [];
        const count = articleMatches.length;
        totalCount += count;
        
        // Extraction des dates et informations des articles
        const articles = articleMatches.map(match => {
          const titleMatch = match.match(/^- \[(.*?)\]\((.*?)\)(.*)$/);
          if (titleMatch) {
            const title = titleMatch[1];
            const url = titleMatch[2];
            const dateMatch = titleMatch[3].match(/\*([^*]+)\*/);
            const date = dateMatch ? dateMatch[1].trim() : 'Date inconnue';
            return { 
              title, 
              url, 
              date, 
              category: category.label,
              categoryTag: category.tag
            };
          }
          return null;
        }).filter(article => article !== null);
        
        // Stocker les articles pour l'affichage récent
        allArticles = [...allArticles, ...articles];
        
        // Mettre à jour les statistiques
        categoryStats.push({
          label: category.label,
          count: count,
          color: category.color,
          tag: category.tag
        });
        
        // Ajouter à la table
        const row = document.createElement("tr");
        row.setAttribute('data-category', category.tag);
        row.innerHTML = `
          <td><span class="category-badge" style="background-color: ${category.color}">${category.label}</span></td>
          <td>${count}</td>
          <td>${new Date().toLocaleDateString()}</td>
        `;
        document.getElementById("stats-body")?.appendChild(row);
        document.getElementById("total-count").textContent = totalCount;
        
        // Si toutes les catégories sont chargées
        if (categoryStats.length === categories.length) {
          // Trier et afficher les articles récents
          displayLatestArticles();
          // Préparer le graphique
          prepareChart();
        }
      })
      .catch(error => {
        console.error(`Erreur lors du chargement de ${category.id}:`, error);
        
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><span class="category-badge" style="background-color: ${category.color}">${category.label}</span></td>
          <td>⚠️ Erreur</td>
          <td>-</td>
        `;
        document.getElementById("stats-body")?.appendChild(row);
        
        // Continuer à vérifier si toutes les catégories sont traitées
        categoryStats.push({
          label: category.label,
          count: 0,
          color: category.color,
          tag: category.tag
        });
        
        if (categoryStats.length === categories.length) {
          displayLatestArticles();
          prepareChart();
        }
      });
  });
  
  // Fonction pour afficher les articles les plus récents
  function displayLatestArticles() {
    // Trier les articles par date (supposant que les dates sont au format standard)
    allArticles.sort((a, b) => {
      // Tentative de conversion des dates en objets Date pour comparaison
      const dateA = new Date(a.date.replace('*', '').trim());
      const dateB = new Date(b.date.replace('*', '').trim());
      
      // Si la conversion échoue, utiliser une comparaison de chaîne
      if (isNaN(dateA) || isNaN(dateB)) {
        return a.date.localeCompare(b.date);
      }
      
      return dateB - dateA; // ordre décroissant (plus récent d'abord)
    });
    
    // Afficher les 5 articles les plus récents
    const latestArticlesElement = document.getElementById("latest-articles-content");
    if (latestArticlesElement) {
      if (allArticles.length === 0) {
        latestArticlesElement.innerHTML = "<p>Aucun article trouvé.</p>";
        return;
      }
      
      latestArticlesElement.classList.remove("loading");
      latestArticlesElement.innerHTML = "";
      
      const articleList = document.createElement("ul");
      articleList.className = "latest-articles-list";
      
      allArticles.slice(0, 5).forEach(article => {
        const li = document.createElement("li");
        li.className = `article-item ${article.categoryTag}`;
        li.innerHTML = `
          <a href="${article.url}" class="article-link" target="_blank" rel="noopener">
            ${article.title}
          </a>
          <span class="article-meta">
            <span class="article-category-tag" data-category="${article.categoryTag}">${article.category}</span>
            <span class="article-date">${article.date}</span>
          </span>
        `;
        articleList.appendChild(li);
      });
      
      latestArticlesElement.appendChild(articleList);
    }
  }
  
  // Fonction pour préparer et afficher le graphique
  function prepareChart() {
    const chartToggle = document.getElementById("toggle-chart");
    
    chartToggle.addEventListener("click", () => {
      const chartContainer = document.getElementById("chart-container");
      if (chartContainer.style.display === "none") {
        chartContainer.style.display = "block";
        chartToggle.textContent = "Masquer graphique";
        
        if (!chartInstance) {
          createChart();
        }
      } else {
        chartContainer.style.display = "none";
        chartToggle.textContent = "Afficher graphique";
      }
    });
  }
  
  // Création du graphique avec Chart.js
  function createChart() {
    const ctx = document.getElementById("stats-chart").getContext("2d");
    
    // Vérifier si Chart.js est chargé
    if (typeof Chart === 'undefined') {
      // Charger Chart.js dynamiquement
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js";
      script.integrity = "sha512-ElRFoEQdI5Ht6kZvyzXhYG9NqjtkmlkfYk0wr6wHxU9JEHakS7UJZNeml5ALk+8IKlU6jDgMabC3vkumRokgJA==";
      script.crossOrigin = "anonymous";
      script.referrerPolicy = "no-referrer";
      
      script.onload = () => {
        // Une fois Chart.js chargé, créer le graphique
        renderChart(ctx);
      };
      
      document.head.appendChild(script);
    } else {
      // Si Chart.js est déjà disponible
      renderChart(ctx);
    }
  }
  
  function renderChart(ctx) {
    // Données pour le graphique
    const labels = categoryStats.map(stat => stat.label);
    const data = categoryStats.map(stat => stat.count);
    const colors = categoryStats.map(stat => stat.color);
    
    // Création du graphique
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombre d\'articles',
          data: data,
          backgroundColor: colors,
          borderColor: colors.map(color => adjustColor(color, -20)),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Répartition des articles par catégorie',
            font: {
              size: 16
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
  
  // Toggle du thème clair/sombre
  document.getElementById("toggle-theme").addEventListener("click", function() {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    
    // Mettre à jour le texte du bouton
    this.textContent = document.body.classList.contains("dark-theme") ? "Mode clair" : "Mode sombre";
    
    // Recréer le graphique si nécessaire pour adapter les couleurs
    if (chartInstance) {
      chartInstance.destroy();
      createChart();
    }
  });
  
  // Appliquer le thème sauvegardé
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    document.getElementById("toggle-theme").textContent = "Mode clair";
  }
  
  // Utilité pour ajuster la luminosité des couleurs
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
  
  // Ajouter des styles CSS pour le dashboard
  function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Styles de base du dashboard */
      .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      
      .dashboard-controls {
        display: flex;
        gap: 10px;
      }
      
      .dashboard-btn {
        background-color: #1f6feb;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 12px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.2s;
      }
      
      .dashboard-btn:hover {
        background-color: #0d5bdb;
      }
      
      /* Table des statistiques */
      .stats-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-radius: 6px;
        overflow: hidden;
      }
      
      .stats-table th, .stats-table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e1e4e8;
      }
      
      .stats-table th {
        background-color: #f6f8fa;
        font-weight: 600;
      }
      
      .stats-table tr:last-child td {
        border-bottom: none;
      }
      
      .stats-table tbody tr:hover {
        background-color: #f6f8fa;
      }
      
      /* Badges de catégorie */
      .category-badge {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 12px;
        color: white;
        font-size: 0.85rem;
        font-weight: 500;
      }
      
      /* Section des articles récents */
      .latest-articles {
        margin-top: 30px;
        padding: 15px;
        background-color: #f6f8fa;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .latest-articles h4 {
        margin-top: 0;
        margin-bottom: 15px;
        color: #24292e;
      }
      
      .latest-articles-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .article-item {
        padding: 12px 0;
        border-bottom: 1px solid #e1e4e8;
      }
      
      .article-item:last-child {
        border-bottom: none;
      }
      
      .article-link {
        display: block;
        font-weight: 500;
        margin-bottom: 5px;
        color: #0366d6;
        text-decoration: none;
      }
      
      .article-link:hover {
        text-decoration: underline;
      }
      
      .article-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.85rem;
        color: #586069;
      }
      
      .article-category-tag {
        font-weight: 500;
      }
      
      .article-date {
        font-style: italic;
      }
      
      .loading {
        text-align: center;
        padding: 20px;
        color: #586069;
      }
      
      /* Mode sombre */
      body.dark-theme {
        background-color: #0d1117;
        color: #c9d1d9;
      }
      
      body.dark-theme .stats-table {
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      }
      
      body.dark-theme .stats-table th {
        background-color: #161b22;
        color: #c9d1d9;
      }
      
      body.dark-theme .stats-table td {
        border-bottom: 1px solid #30363d;
      }
      
      body.dark-theme .stats-table tbody tr:hover {
        background-color: #161b22;
      }
      
      body.dark-theme .latest-articles {
        background-color: #161b22;
      }
      
      body.dark-theme .article-item {
        border-bottom: 1px solid #30363d;
      }
      
      body.dark-theme .article-link {
        color: #58a6ff;
      }
      
      body.dark-theme .article-meta {
        color: #8b949e;
      }
      
      body.dark-theme h3, body.dark-theme h4 {
        color: #c9d1d9;
      }
      
      /* Responsive design */
      @media (max-width: 768px) {
        .dashboard-header {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .dashboard-controls {
          margin-top: 10px;
          width: 100%;
          justify-content: space-between;
        }
        
        .stats-table th, .stats-table td {
          padding: 8px;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
});
