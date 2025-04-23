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
  
  // Configuration des fichiers sources avec plus de robustesse
  const sources = [
    { id: "auto_tests", category: "test", label: "🧪 Tests", color: "#4285F4" },
    { id: "auto_ui", category: "ui", label: "🎨 UI", color: "#EA4335" },
    { id: "auto_paradigmes", category: "paradigm", label: "🧠 Paradigmes", color: "#FBBC05" },
    { id: "auto_stack", category: "stack", label: "🌐 Java/Angular", color: "#34A853" }
  ];
  
  // Obtenir l'URL de base de manière plus robuste
  const siteRoot = window.location.origin + (window.location.pathname.includes("/veille_techno-OC") 
    ? "/veille_techno-OC/" 
    : "/");
  
  console.log("URL de base:", siteRoot);
  
  let allArticles = [];
  let allTags = new Set();
  
  // Charger tous les articles avec une meilleure gestion d'erreurs
  Promise.all(sources.map(source => {
    // Simplifier pour ne garder que les URLs qui fonctionnent
    const possibleUrls = [
      `${siteRoot}${source.id}/`,
      `${siteRoot}${source.id}`
    ];
    
    console.log(`Tentative de chargement pour ${source.label}:`, possibleUrls);
    
    // Essayer chaque URL jusqu'à ce qu'une fonctionne
    return tryFetchUrls(possibleUrls)
      .then(html => {
        if (!html) {
          console.error(`Aucune URL n'a fonctionné pour ${source.id}`);
          return [];
        }
        
        // Analyser l'HTML pour extraire les articles
        const articles = extractArticlesFromHTML(html, source);
        console.log(`Articles extraits pour ${source.label}:`, articles.length);
        return articles;
      })
      .catch(error => {
        console.error(`Erreur lors du chargement de ${source.id}:`, error);
        return [];
      });
  }))
  .then(articlesArrays => {
    // Continuer avec le code existant...
    allArticles = articlesArrays.flat();
    console.log("Tous les articles récupérés:", allArticles.length);
    
    if (allArticles.length === 0) {
      document.getElementById("articles-container").innerHTML = 
        "<p>Aucun article n'a pu être récupéré. Veuillez vérifier la console pour les erreurs.</p>";
      return;
    }
    
    // Extraire tous les tags
    allArticles.forEach(article => {
      article.tags.forEach(tag => allTags.add(tag));
    });
    
    // Trier par date
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
    
    // Initialiser les filtres
    initFilters();
  })
  .catch(error => {
    console.error("Erreur globale:", error);
    document.getElementById("articles-container").innerHTML = 
      `<p>Une erreur s'est produite lors du chargement des articles: ${error.message}</p>`;
  });
  
  // Fonction pour essayer plusieurs URLs jusqu'à ce qu'une fonctionne
  async function tryFetchUrls(urls) {
    for (const url of urls) {
      try {
        console.log(`Essai de fetch sur: ${url}`);
        const response = await fetch(url);
        if (response.ok) {
          console.log(`Succès pour URL: ${url}`);
          return await response.text();
        }
      } catch (error) {
        console.warn(`Échec de fetch pour ${url}:`, error.message);
      }
    }
    return null;
  }
  
  function extractArticlesFromHTML(html, source) {
    const articles = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Trouver tous les éléments li qui contiennent des articles
    const listItems = doc.querySelectorAll('li');
    console.log(`Found ${listItems.length} list items for ${source.label}`);
    
    listItems.forEach(item => {
      // Vérifier si c'est un élément d'article
      const linkElement = item.querySelector('a');
      if (!linkElement) return;
      
      const title = linkElement.textContent.trim();
      const url = linkElement.getAttribute('href');
      
      // Essayer d'extraire les données depuis l'attribut data-article si disponible
      const dataSpan = item.querySelector('span[data-article]');
      if (dataSpan) {
        try {
          const articleData = JSON.parse(dataSpan.getAttribute('data-article').replace(/&apos;/g, "'"));
          
          // Extraire les tags et la date
          const tags = articleData.tags || [];
          const dateStr = articleData.date || "Date inconnue";
          let date = null;
          
          try {
            if (dateStr) {
              date = new Date(dateStr);
              if (isNaN(date.getTime())) date = null;
            }
          } catch (e) {
            console.warn(`Date invalide: ${dateStr}`);
          }
          
          articles.push({
            title: articleData.title,
            url: articleData.link || url,
            date,
            dateStr,
            tags,
            category: source.category,
            categoryLabel: source.label,
            color: source.color
          });
          
          return;
        } catch (e) {
          console.warn("Erreur parsing data-article:", e);
        }
      }
      
      // Méthode alternative si data-article n'est pas disponible
      // Extraire la date
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
      
      // Extraire les tags
      const tags = [];
      const codeElements = item.querySelectorAll("code");
      codeElements.forEach(code => {
        const text = code.textContent.trim();
        if (text.startsWith("#")) {
          tags.push(text.substring(1));
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
        category: source.category,
        categoryLabel: source.label,
        color: source.color
      });
    });
    
    console.log(`Extracted ${articles.length} articles from ${source.label}`);
    return articles;
  }
  
  function generateTagFilters(tags) {
    const tagsContainer = document.getElementById("tag-filters");
    if (!tagsContainer) return;
    
    // Vider d'abord le conteneur (au cas où)
    tagsContainer.innerHTML = "";
    
    // Trier les tags
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
    
    // Bouton d'effacement
    const clearButton = document.getElementById("search-clear");
    if (clearButton) {
      clearButton.addEventListener("click", function() {
        if (searchInput) {
          searchInput.value = "";
          filterArticles();
        }
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
    
    // Paramètre de filtrage dans l'URL
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
      const articleTags = article.getAttribute("data-tags").split(" ").filter(t => t);
      
      // Vérifier la correspondance aux critères
      const matchesSearch = searchTerm === "" || title.includes(searchTerm);
      const matchesCategory = category === "all" || articleCategory === category;
      const matchesTags = activeTags.length === 0 || 
        activeTags.some(tag => articleTags.includes(tag));
      
      // Afficher ou masquer l'article
      const isVisible = matchesSearch && matchesCategory && matchesTags;
      article.style.display = isVisible ? "block" : "none";
      
      if (isVisible) visibleCount++;
    });
    
    // Afficher/masquer "Aucun résultat"
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
