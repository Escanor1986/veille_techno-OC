---
title: Dernières mises à jour
layout: page
permalink: /latest-updates/
nav_order: 2
---

# <span>📰</span> Dernières mises à jour de la veille

<div class="latest-updates-header">
  <p>Cette page présente les articles les plus récents, toutes catégories confondues.</p>
  <p class="last-updated">🕒 <em id="last-updated-date">Chargement de la date...</em></p>
</div>

<div class="search-container">
  <div class="search-input-wrapper">
    <input 
      type="text" 
      id="articles-search" 
      class="search-input" 
      placeholder="Rechercher un article..."
      aria-label="Rechercher un article">
    <button id="search-clear" class="search-clear" aria-label="Effacer la recherche">×</button>
  </div>
  <div class="filter-options">
    <div class="filter-group">
      <label for="category-filter">Filtrer par catégorie:</label>
      <select id="category-filter" class="filter-select">
        <option value="all">Toutes les catégories</option>
        <option value="test">🧪 Tests</option>
        <option value="ui">🎨 UI</option>
        <option value="paradigm">🧠 Paradigmes</option>
        <option value="stack">🌐 Java/Angular</option>
      </select>
    </div>
    <div class="filter-group">
      <label for="tag-filter">Filtrer par tag:</label>
      <div id="tag-filters" class="tag-filters"></div>
    </div>
  </div>
</div>

<div id="articles-container" class="articles-container">
  <p class="loading">Chargement des articles récents...</p>
</div>

<div id="no-results" class="no-results" style="display: none;">
  <p>Aucun article ne correspond à votre recherche.</p>
  <button id="reset-filters" class="reset-btn">Réinitialiser les filtres</button>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  // Mettre à jour la date
  document.getElementById("last-updated-date").textContent = 
    `Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`;
  
  // Configuration des fichiers sources
  const sources = [
    { id: "auto_tests.md", category: "test", label: "🧪 Tests", color: "#4285F4" },
    { id: "auto_ui.md", category: "ui", label: "🎨 UI", color: "#EA4335" },
    { id: "auto_paradigmes.md", category: "paradigm", label: "🧠 Paradigmes", color: "#FBBC05" },
    { id: "auto_stack.md", category: "stack", label: "🌐 Java/Angular", color: "#34A853" }
  ];
  
  const baseUrl = window.location.origin + window.location.pathname.replace("latest-updates/", "").replace(/\/$/, "/");
  let allArticles = [];
  let allTags = new Set();
  
  // Charger tous les articles
  Promise.all(sources.map(source => 
    fetch(baseUrl + source.id)
      .then(res => res.text())
      .then(text => {
        // Extraire les articles avec regex
        const articles = [];
        const matches = text.match(/^- \[(.*?)\]\((.*?)\)(.*?)$/gm) || [];
        
        matches.forEach(match => {
          const parts = match.match(/^- \[(.*?)\]\((.*?)\)(.*)$/);
          if (parts) {
            const title = parts[1];
            const url = parts[2];
            const metadata = parts[3];
            
            // Extraire la date
            const dateMatch = metadata.match(/\*([^*]+)\*/);
            const dateStr = dateMatch ? dateMatch[1].trim() : null;
            let date = null;
            
            try {
              if (dateStr) {
                date = new Date(dateStr);
                if (isNaN(date)) date = null;
              }
            } catch (e) {
              date = null;
            }
            
            // Extraire les tags
            const tags = [];
            const tagMatches = metadata.match(/`#([^`]+)`/g) || [];
            tagMatches.forEach(tag => {
              const tagName = tag.replace(/`#|`/g, '');
              tags.push(tagName);
              allTags.add(tagName);
            });
            
            articles.push({
              title,
              url,
              date,
              dateStr: dateStr || "Date inconnue",
              tags,
              category: source.category,
              categoryLabel: source.label,
              color: source.color
            });
          }
        });
        
        return articles;
      })
      .catch(error => {
        console.error(`Erreur lors du chargement de ${source.id}:`, error);
        return [];
      })
  )).then(articlesArrays => {
    // Fusionner tous les articles
    allArticles = articlesArrays.flat();
    
    // Trier par date (du plus récent au plus ancien)
    allArticles.sort((a, b) => {
      if (a.date && b.date) return b.date - a.date;
      if (a.date) return -1;
      if (b.date) return 1;
      return 0;
    });
    
    // Générer les filtres de tags
    generateTagFilters(Array.from(allTags));
    
    // Afficher les articles
    displayArticles(allArticles);
    
    // Initialiser les écouteurs d'événements pour les filtres
    initFilters();
  });
  
  function generateTagFilters(tags) {
    const tagsContainer = document.getElementById("tag-filters");
    if (!tagsContainer) return;
    
    // Trier les tags par ordre alphabétique
    tags.sort();
    
    tags.forEach(tag => {
      const tagBtn = document.createElement("button");
      tagBtn.className = "tag-filter-btn";
      tagBtn.setAttribute("data-tag", tag);
      tagBtn.textContent = "#" + tag;
      tagBtn.addEventListener("click", function() {
        this.classList.toggle("active");
        filterArticles();
      });
      tagsContainer.appendChild(tagBtn);
    });
  }
  
  function displayArticles(articles) {
    const container = document.getElementById("articles-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    if (articles.length === 0) {
      document.getElementById("no-results").style.display = "block";
      return;
    }
    
    document.getElementById("no-results").style.display = "none";
    
    articles.forEach(article => {
      const articleCard = document.createElement("div");
      articleCard.className = `article-card ${article.category}`;
      articleCard.setAttribute("data-category", article.category);
      articleCard.setAttribute("data-tags", article.tags.join(" "));
      
      // Formatage des tags
      const tagsHtml = article.tags.length > 0
        ? `<div class="article-tags">${article.tags.map(tag => `<span class="article-tag">#${tag}</span>`).join(" ")}</div>`
        : "";
      
      articleCard.innerHTML = `
        <div class="article-header">
          <span class="article-category" style="background-color: ${article.color}">
            ${article.categoryLabel}
          </span>
          <span class="article-date">${article.dateStr}</span>
        </div>
        <h3 class="article-title">
          <a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a>
        </h3>
        ${tagsHtml}
      `;
      
      container.appendChild(articleCard);
    });
  }
  
  function initFilters() {
    // Recherche par texte
    const searchInput = document.getElementById("articles-search");
    if (searchInput) {
      searchInput.addEventListener("input", filterArticles);
    }
    
    // Bouton d'effacement de la recherche
    const clearButton = document.getElementById("search-clear");
    if (clearButton) {
      clearButton.addEventListener("click", function() {
        searchInput.value = "";
        filterArticles();
      });
    }
    
    // Filtre par catégorie
    const categoryFilter = document.getElementById("category-filter");
    if (categoryFilter) {
      categoryFilter.addEventListener("change", filterArticles);
    }
    
    // Bouton de réinitialisation
    const resetButton = document.getElementById("reset-filters");
    if (resetButton) {
      resetButton.addEventListener("click", function() {
        // Réinitialiser tous les filtres
        if (searchInput) searchInput.value = "";
        if (categoryFilter) categoryFilter.value = "all";
        
        // Désactiver tous les filtres de tags
        document.querySelectorAll(".tag-filter-btn.active").forEach(btn => {
          btn.classList.remove("active");
        });
        
        // Réafficher tous les articles
        filterArticles();
      });
    }
    
    // Vérifier si on arrive avec un paramètre de filtrage dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const tagParam = urlParams.get("tag");
    
    if (tagParam) {
      // Activer le filtre de tag correspondant
      const tagButton = document.querySelector(`.tag-filter-btn[data-tag="${tagParam}"]`);
      if (tagButton) {
        tagButton.classList.add("active");
        filterArticles();
      }
    }
  }
  
  function filterArticles() {
    const searchInput = document.getElementById("articles-search");
    const categoryFilter = document.getElementById("category-filter");
    const activeTagButtons = document.querySelectorAll(".tag-filter-btn.active");
    const articles = document.querySelectorAll(".article-card");
    const clearButton = document.getElementById("search-clear");
    
    // Récupérer les valeurs des filtres
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    const category = categoryFilter ? categoryFilter.value : "all";
    const activeTags = Array.from(activeTagButtons).map(btn => 
      btn.getAttribute("data-tag")
    );
    
    // Afficher/masquer le bouton d'effacement
    if (clearButton) {
      clearButton.style.display = searchTerm.length > 0 ? "block" : "none";
    }
    
    let visibleCount = 0;
    
    articles.forEach(article => {
      const title = article.querySelector(".article-title").textContent.toLowerCase();
      const articleCategory = article.getAttribute("data-category");
      const articleTags = article.getAttribute("data-tags").split(" ");
      
      // Vérifier si l'article correspond aux critères de recherche
      const matchesSearch = searchTerm === "" || title.includes(searchTerm);
      
      // Vérifier si l'article correspond à la catégorie sélectionnée
      const matchesCategory = category === "all" || articleCategory === category;
      
      // Vérifier si l'article a au moins un des tags sélectionnés
      const matchesTags = activeTags.length === 0 || 
        activeTags.some(tag => articleTags.includes(tag));
      
      // Afficher ou masquer l'article en fonction des filtres
      const isVisible = matchesSearch && matchesCategory && matchesTags;
      article.style.display = isVisible ? "block" : "none";
      
      if (isVisible) visibleCount++;
    });
    
    // Afficher ou masquer le message "Aucun résultat"
    document.getElementById("no-results").style.display = 
      visibleCount === 0 ? "block" : "none";
  }
});
</script>

<style>
  .latest-updates-header {
    margin-bottom: 1.5rem;
  }
  .last-updated {
    color: #8b949e;
    font-size: 0.9rem;
    font-style: italic;
  }

  .search-container {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: var(--color-sidebar-background);
    border: 1px solid #30363d;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  }

  .search-input-wrapper {
    position: relative;
    margin-bottom: 1rem;
  }
  .search-input {
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 0.75rem;
    background-color: var(--color-background);
    border: 1px solid #30363d;
    border-radius: 4px;
    color: var(--color-text);
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-input::placeholder {
    color: #586069;
  }
  .search-input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(8, 247, 254, 0.3);
    outline: none;
  }

  .search-clear {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    color: var(--color-accent-alt);
    display: none;
  }
  .search-clear.visible {
    display: block;
  }

  .filter-options {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .filter-group {
    flex: 1;
    min-width: 200px;
  }
  .filter-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--color-text);
  }
  .filter-select {
    width: 100%;
    padding: 0.5rem;
    background-color: var(--color-background);
    border: 1px solid #30363d;
    border-radius: 4px;
    color: var(--color-text);
  }

  .tag-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .tag-filter-btn {
    background-color: #1b1d21;
    border: 1px solid #30363d;
    border-radius: 12px;
    padding: 0.25rem 0.75rem;
    font-size: 0.85rem;
    cursor: pointer;
    color: var(--color-text);
    transition: background-color 0.2s, color 0.2s;
  }
  .tag-filter-btn:hover {
    background-color: #30363d;
  }
  .tag-filter-btn.active {
    background-color: var(--color-accent);
    color: var(--color-background);
    border-color: var(--color-accent);
  }

  .articles-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .article-card {
    background-color: var(--color-sidebar-background);
    border: 1px solid #30363d;
    border-radius: 8px;
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
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .article-category {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--color-accent-alt), var(--color-accent));
    color: var(--color-background);
    font-size: 0.75rem;
    font-weight: 500;
  }
  .article-date {
    font-size: 0.85rem;
    color: #8b949e;
  }

  .article-title {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
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
    gap: 0.5rem;
  }
  .article-tag {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    border-radius: 12px;
    background-color: rgba(8, 247, 254, 0.1);
    color: var(--color-accent);
    font-size: 0.75rem;
  }

  .no-results {
    text-align: center;
    padding: 2rem;
    background-color: var(--color-sidebar-background);
    border: 1px solid #30363d;
    border-radius: 8px;
    color: var(--color-text);
  }

  .reset-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: var(--color-accent);
    color: var(--color-background);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  }
  .reset-btn:hover {
    background-color: var(--color-accent-alt);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
  }

  .loading {
    text-align: center;
    padding: 2rem;
    color: #8b949e;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .filter-options {
      flex-direction: column;
    }
    .filter-group {
      width: 100%;
    }
  }
</style>
