/**
 * Dashboard analytique pour la veille technologique - Version corrigée
 */
document.addEventListener("DOMContentLoaded", () => {
  const dashboardElement = document.getElementById("dashboard-stats");
  if (!dashboardElement) return;
  
  // Message de débogage initial
  console.log("Initialisation du dashboard analytique");
  
  // Configuration des catégories avec des chemins corrigés
  const categories = [
    { id: "auto_tests", label: "🧪 Librairies de test", color: "#4285F4", tag: "test" },
    { id: "auto_ui", label: "🎨 Librairies UI", color: "#EA4335", tag: "ui" },
    { id: "auto_paradigmes", label: "🧠 Paradigmes", color: "#FBBC05", tag: "paradigm" },
    { id: "auto_stack", label: "🌐 Stack Java / Angular", color: "#34A853", tag: "stack" }
  ];
  
  // Création de la structure du dashboard
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
  
  // Ajouter les styles CSS
  addCustomStyles();
  
  // Variables pour stocker les données
  let totalCount = 0;
  let chartInstance = null;
  let allArticles = [];
  const categoryStats = [];
  
  // Construction de l'URL de base plus robuste pour GitHub Pages
  const siteRoot = window.location.origin + (window.location.pathname.includes("/veille_techno-OC") 
    ? "/veille_techno-OC/" 
    : "/");
  
  console.log("URL de base du site:", siteRoot);
  
  // Récupération des données pour chaque catégorie
  categories.forEach(category => {
    // Tester plusieurs formats d'URL possibles
    const possibleUrls = [
      `${siteRoot}${category.id}/`,
      `${siteRoot}${category.id}`,
      `${siteRoot}${category.id}.html`
    ];
    
    console.log(`Tentative de chargement pour ${category.label}:`, possibleUrls);
    
    // Essayer les URLs jusqu'à ce qu'une fonctionne
    tryFetchUrls(possibleUrls)
      .then(text => {
        if (!text) {
          throw new Error(`Aucune URL n'a fonctionné pour ${category.id}`);
        }
        
        // Extraction des articles avec regex
        const articleMatches = text.match(/^- \[(.*?)\]\((.*?)\)(.*?)$/gm) || [];
        const count = articleMatches.length;
        totalCount += count;
        
        console.log(`Articles trouvés pour ${category.label}: ${count}`);
        
        // Extraction des détails des articles
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
        
        // Stocker les articles
        allArticles = [...allArticles, ...articles];
        
        // Stocker les statistiques
        categoryStats.push({
          label: category.label,
          count: count,
          color: category.color,
          tag: category.tag
        });
        
        // Mettre à jour la table des statistiques
        const statsBody = document.getElementById("stats-body");
        if (statsBody) {
          const row = document.createElement("tr");
          row.setAttribute('data-category', category.tag);
          row.innerHTML = `
            <td><span class="category-badge" style="background-color: ${category.color}">${category.label}</span></td>
            <td>${count}</td>
            <td>${new Date().toLocaleDateString()}</td>
          `;
          statsBody.appendChild(row);
          
          // Mettre à jour le total
          document.getElementById("total-count").textContent = totalCount;
        }
        
        // Si toutes les catégories sont chargées, afficher les résultats
        if (categoryStats.length === categories.length) {
          displayLatestArticles();
          prepareChart();
        }
      })
      .catch(error => {
        console.error(`Erreur lors du chargement de ${category.id}:`, error);
        
        // Ajouter une ligne d'erreur à la table
        const statsBody = document.getElementById("stats-body");
        if (statsBody) {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td><span class="category-badge" style="background-color: ${category.color}">${category.label}</span></td>
            <td>⚠️ Erreur</td>
            <td>-</td>
          `;
          statsBody.appendChild(row);
        }
        
        // Ajouter quand même aux statistiques avec compte à 0
        categoryStats.push({
          label: category.label,
          count: 0,
          color: category.color,
          tag: category.tag
        });
        
        // Vérifier si toutes les catégories ont été traitées
        if (categoryStats.length === categories.length) {
          displayLatestArticles();
          prepareChart();
        }
      });
  });
  
  // Fonction pour essayer plusieurs URLs jusqu'à ce qu'une fonctionne
  async function tryFetchUrls(urls) {
    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return await response.text();
        }
      } catch (error) {
        console.warn(`Échec de fetch pour ${url}:`, error.message);
      }
    }
    return null;
  }
  
  // Fonction pour afficher les articles les plus récents
  function displayLatestArticles() {
    const latestArticlesElement = document.getElementById("latest-articles-content");
    if (!latestArticlesElement) return;
    
    // Trier les articles par date
    allArticles.sort((a, b) => {
      // Tentative de conversion des dates
      try {
        const dateA = new Date(a.date.replace(/^\*|\*$/g, ""));
        const dateB = new Date(b.date.replace(/^\*|\*$/g, ""));
        
        if (!isNaN(dateA) && !isNaN(dateB)) {
          return dateB - dateA;
        }
      } catch (e) {
        // En cas d'erreur, utiliser la comparaison de chaînes
      }
      
      return b.date.localeCompare(a.date);
    });
    
    // Vider l'élément et enlever l'indicateur de chargement
    latestArticlesElement.classList.remove("loading");
    latestArticlesElement.innerHTML = "";
    
    if (allArticles.length === 0) {
      latestArticlesElement.innerHTML = "<p>Aucun article trouvé.</p>";
      return;
    }
    
    // Créer la liste d'articles
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
  
  // Fonction pour préparer le graphique
  function prepareChart() {
    const chartToggle = document.getElementById("toggle-chart");
    const chartContainer = document.getElementById("chart-container");
    
    if (!chartToggle || !chartContainer) return;
    
    chartToggle.addEventListener("click", () => {
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
  
  // Création du graphique
  function createChart() {
    const ctx = document.getElementById("stats-chart")?.getContext("2d");
    if (!ctx) return;
    
    // Vérifier si Chart.js est chargé
    if (typeof Chart === 'undefined') {
      // Charger Chart.js dynamiquement
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js";
      script.integrity = "sha512-ElRFoEQdI5Ht6kZvyzXhYG9NqjtkmlkfYk0wr6wHxU9JEHakS7UJZNeml5ALk+8IKlU6jDgMabC3vkumRokgJA==";
      script.crossOrigin = "anonymous";
      script.referrerPolicy = "no-referrer";
      
      script.onload = () => {
        console.log("Chart.js chargé avec succès");
        renderChart(ctx);
      };
      
      script.onerror = () => {
        console.error("Erreur lors du chargement de Chart.js");
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
    
    console.log("Données du graphique:", { labels, data, colors });
    
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
  const themeToggle = document.getElementById("toggle-theme");
  if (themeToggle) {
    themeToggle.addEventListener("click", function() {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
      
      // Mettre à jour le texte du bouton
      this.textContent = document.body.classList.contains("dark-theme") ? "Mode clair" : "Mode sombre";
      
      // Recréer le graphique si nécessaire
      if (chartInstance) {
        chartInstance.destroy();
        createChart();
      }
    });
    
    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      themeToggle.textContent = "Mode clair";
    }
  }
  
  // Fonction pour ajuster la luminosité des couleurs
  function adjustColor(color, percent) {
    if (!color) return '#000000';
    
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
  
  // Ajouter les styles CSS pour le dashboard
  function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
    /* Styles de base du dashboard */
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
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
    
    /* Table des statistiques */
    .stats-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1.5rem;
      background-color: var(--color-sidebar-background);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
      border-radius: 6px;
      overflow: hidden;
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
    
    /* Badges de catégorie */
    .category-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--color-accent), var(--color-accent-alt));
      color: var(--color-background);
      font-size: 0.85rem;
      font-weight: 500;
    }
    
    /* Section des articles récents */
    .latest-articles {
      margin-top: 2rem;
      padding: 1rem;
      background-color: var(--color-sidebar-background);
      border: 1px solid #30363d;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
    }
    .latest-articles h4 {
      margin: 0 0 1rem;
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--color-accent);
    }
    .latest-articles-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .article-item {
      padding: 0.75rem 0;
      border-bottom: 1px solid #30363d;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .article-item:last-child {
      border-bottom: none;
    }
    .article-link {
      color: var(--color-text);
      text-decoration: none;
      font-weight: 500;
    }
    .article-link:hover {
      color: var(--color-accent);
    }
    .article-meta {
      font-size: 0.85rem;
      color: #8b949e;
      display: flex;
      gap: 1rem;
    }
    .article-category-tag {
      background: linear-gradient(135deg, var(--color-accent-alt), var(--color-accent));
      color: var(--color-background);
      padding: 0.2rem 0.5rem;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    .article-date {
      font-style: italic;
    }
    
    .loading {
      text-align: center;
      padding: 1rem;
      color: #8b949e;
    }
    
    /* Responsive design */
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
      .stats-table th,
      .stats-table td {
        padding: 0.5rem;
      }
      .article-meta {
        flex-direction: column;
        font-size: 0.8rem;
      }
    }
    `;
    document.head.appendChild(style);
  }
});
