document.addEventListener("DOMContentLoaded", () => {
  // Initialiser le système de recherche s'il est présent sur la page
  initSearchSystem();
});

function initSearchSystem() {
  // Vérifier si nous sommes sur une page d'articles
  const articleContainer = document.querySelector(".main-content");
  if (!articleContainer) return;
  
  // Créer et insérer la barre de recherche en haut de la page
  const searchContainer = createSearchInterface();
  
  // Trouver un emplacement approprié pour insérer la recherche
  const h1 = articleContainer.querySelector("h1");
  if (h1) {
    h1.parentNode.insertBefore(searchContainer, h1.nextSibling);
  } else {
    articleContainer.prepend(searchContainer);
  }
  
  // Analyser la page pour extraire les tags des articles
  const tags = extractTagsFromPage();
  
  // Générer les filtres de tags
  generateTagFilters(tags);
  
  // Ajouter les écouteurs d'événements
  setupEventListeners();
}

function createSearchInterface() {
  const container = document.createElement("div");
  container.className = "search-container";
  container.innerHTML = `
    <div class="search-header">
      <div class="search-input-wrapper">
        <input 
          type="text" 
          id="article-search" 
          class="search-input" 
          placeholder="Rechercher un article..."
          aria-label="Rechercher un article">
        <button id="search-clear" class="search-clear" aria-label="Effacer la recherche">×</button>
      </div>
      <div class="search-options">
        <label class="search-option">
          <input type="checkbox" id="search-title-only"> Titre uniquement
        </label>
        <button id="toggle-advanced-search" class="toggle-btn">Options avancées</button>
      </div>
    </div>
    <div id="advanced-search-options" class="advanced-search-options" style="display: none;">
      <div class="advanced-search-row">
        <div class="advanced-search-group">
          <label for="date-filter">Date de publication:</label>
          <select id="date-filter" class="date-filter">
            <option value="all">Toutes les dates</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
        </div>
        <div class="advanced-search-group">
          <label for="category-filter">Catégorie:</label>
          <select id="category-filter" class="category-filter">
            <option value="all">Toutes les catégories</option>
            <option value="test">Librairies de test</option>
            <option value="ui">Librairies UI</option>
            <option value="paradigm">Paradigmes</option>
            <option value="stack">Java / Angular</option>
          </select>
        </div>
      </div>
    </div>
    <div id="tag-filters" class="tag-filters"></div>
    <div id="search-results-info" class="search-results-info"></div>
  `;
  
  // Ajouter les styles pour la recherche
  addSearchStyles();
  
  return container;
}

function extractTagsFromPage() {
  // Rechercher tous les tags dans les articles
  const tags = new Set();
  const tagElements = document.querySelectorAll("code");
  
  tagElements.forEach(el => {
    const text = el.textContent.trim();
    if (text.startsWith("#")) {
      tags.add(text.substring(1)); // Enlever le #
    }
  });
  
  return Array.from(tags);
}

function generateTagFilters(tags) {
  const tagFiltersContainer = document.getElementById("tag-filters");
  if (!tagFiltersContainer || tags.length === 0) return;
  
  // Trier les tags par ordre alphabétique
  tags.sort();
  
  // Créer un bouton pour chaque tag
  tags.forEach(tag => {
    const tagBtn = document.createElement("button");
    tagBtn.className = "tag-filter-btn";
    tagBtn.setAttribute("data-tag", tag);
    tagBtn.textContent = "#" + tag;
    tagFiltersContainer.appendChild(tagBtn);
  });
}

function setupEventListeners() {
  // Écouteur pour la recherche en temps réel
  const searchInput = document.getElementById("article-search");
  if (searchInput) {
    searchInput.addEventListener("input", performSearch);
  }
  
  // Écouteur pour le bouton d'effacement
  const clearButton = document.getElementById("search-clear");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      searchInput.value = "";
      performSearch();
    });
  }
  
  // Écouteur pour les boutons de tags
  const tagButtons = document.querySelectorAll(".tag-filter-btn");
  tagButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const tag = this.getAttribute("data-tag");
      
      // Toggle active state
      this.classList.toggle("active");
      
      performSearch();
    });
  });
  
  // Écouteur pour le toggle des options avancées
  const toggleAdvanced = document.getElementById("toggle-advanced-search");
  const advancedOptions = document.getElementById("advanced-search-options");
  if (toggleAdvanced && advancedOptions) {
    toggleAdvanced.addEventListener("click", function() {
      const isHidden = advancedOptions.style.display === "none";
      advancedOptions.style.display = isHidden ? "block" : "none";
      this.textContent = isHidden ? "Masquer les options" : "Options avancées";
    });
  }
  
  // Écouteurs pour les filtres avancés
  const dateFilter = document.getElementById("date-filter");
  const categoryFilter = document.getElementById("category-filter");
  const titleOnlyCheckbox = document.getElementById("search-title-only");
  
  if (dateFilter) dateFilter.addEventListener("change", performSearch);
  if (categoryFilter) categoryFilter.addEventListener("change", performSearch);
  if (titleOnlyCheckbox) titleOnlyCheckbox.addEventListener("change", performSearch);
}

function performSearch() {
  // Récupérer la valeur de recherche
  const searchInput = document.getElementById("article-search");
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  
  // Récupérer les filtres actifs
  const titleOnly = document.getElementById("search-title-only")?.checked || false;
  const dateFilter = document.getElementById("date-filter")?.value || "all";
  const categoryFilter = document.getElementById("category-filter")?.value || "all";
  
  // Récupérer les tags actifs
  const activeTagButtons = document.querySelectorAll(".tag-filter-btn.active");
  const activeTags = Array.from(activeTagButtons).map(btn => 
    btn.getAttribute("data-tag")
  );
  
  // Récupérer tous les articles
  let articles;
  
  // Adapter en fonction de la structure de la page
  if (document.querySelector("ul")) {
    // Pour les pages avec une liste <ul>
    articles = document.querySelectorAll("ul > li");
  } else {
    // Pour les articles sous forme de paragraphes
    articles = document.querySelectorAll("p");
  }
  
  // Compteur pour les résultats
  let visibleCount = 0;
  
  // Filtrer les articles
  articles.forEach(article => {
    // Vérifier si c'est bien un article (contient un lien et du texte)
    if (!article.querySelector("a") && !article.textContent.includes("[")) {
      return; // Ignorer les éléments qui ne sont pas des articles
    }
    
    const articleText = article.textContent.toLowerCase();
    const articleTitle = article.querySelector("a") 
      ? article.querySelector("a").textContent.toLowerCase()
      : articleText.split("](")[0].replace("[", "").toLowerCase();
    
    // Filtrage par texte
    const textMatch = titleOnly 
      ? articleTitle.includes(searchTerm)
      : articleText.includes(searchTerm);
    
    // Filtrage par tags
    let tagsMatch = true;
    if (activeTags.length > 0) {
      tagsMatch = activeTags.some(tag => 
        articleText.includes(`#${tag}`) || 
        articleText.includes(`tag:${tag}`)
      );
    }
    
    // Filtrage par date (simulation car les dates ne sont pas structurées)
    let dateMatch = true;
    if (dateFilter !== "all") {
      const dateText = articleText.match(/\*([^*]+)\*/);
      if (dateText) {
        const articleDate = new Date(dateText[1].trim());
        const now = new Date();
        
        switch (dateFilter) {
          case "today":
            dateMatch = articleDate.toDateString() === now.toDateString();
            break;
          case "week":
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 7);
            dateMatch = articleDate >= weekAgo;
            break;
          case "month":
            dateMatch = articleDate.getMonth() === now.getMonth() && 
                       articleDate.getFullYear() === now.getFullYear();
            break;
          case "year":
            dateMatch = articleDate.getFullYear() === now.getFullYear();
            break;
        }
      }
    }
    
    // Filtrage par catégorie
    let categoryMatch = true;
    if (categoryFilter !== "all") {
      // Adapter en fonction de la structure de votre page
      categoryMatch = article.closest("[data-category]") 
        ? article.closest("[data-category]").getAttribute("data-category") === categoryFilter
        : articleText.includes(categoryFilter);
    }
    
    // Appliquer tous les filtres
    const isVisible = textMatch && tagsMatch && dateMatch && categoryMatch;
    article.style.display = isVisible ? "" : "none";
    
    if (isVisible) visibleCount++;
  });
  
  // Mettre à jour le compteur de résultats
  updateResultsCount(visibleCount, articles.length);
  
  // Afficher/masquer le bouton d'effacement
  const clearButton = document.getElementById("search-clear");
  if (clearButton) {
    clearButton.style.display = searchInput.value.length > 0 ? "block" : "none";
  }
}

function updateResultsCount(visibleCount, totalCount) {
  const resultsInfo = document.getElementById("search-results-info");
  if (!resultsInfo) return;
  
  if (visibleCount === totalCount) {
    resultsInfo.textContent = `Affichage de tous les articles (${totalCount})`;
  } else {
    resultsInfo.textContent = `${visibleCount} articles sur ${totalCount}`;
  }
}

function addSearchStyles() {
  const style = document.createElement("style");
  style.textContent = `
  /* Styles pour le système de recherche – thème Demon Slayer × Ghost in the Shell */
  .search-container {
    margin: 1.5rem 0;
    background-color: var(--color-sidebar-background);
    border: 1px solid #2c3e50;
    border-radius: 6px;
    padding: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    position: relative;
    z-index: 1;
  }

  .search-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .search-input-wrapper {
    position: relative;
    flex: 1;
    min-width: 200px;
    margin-right: 1rem;
  }

  .search-input {
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 0.75rem;
    background-color: var(--color-background);
    border: 1px solid #30363d;
    border-radius: 4px;
    font-size: 1rem;
    color: var(--color-text);
    transition: border-color 0.2s;
  }
  .search-input::placeholder {
    color: #8b949e;
  }
  .search-input:focus {
    border-color: var(--color-accent);
    outline: none;
    box-shadow: 0 0 0 2px rgba(8, 247, 254, 0.3);
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

  .search-options {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .search-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--color-text);
  }

  .toggle-btn {
    background-color: #1b1d21;
    border: 1px solid #30363d;
    border-radius: 4px;
    padding: 0.4rem 0.75rem;
    font-size: 0.9rem;
    cursor: pointer;
    color: var(--color-text);
    transition: background-color 0.2s;
  }
  .toggle-btn:hover {
    background-color: #30363d;
  }

  .advanced-search-options {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #1b1d21;
    border-radius: 4px;
    border: 1px solid #30363d;
  }

  .advanced-search-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .advanced-search-group {
    display: flex;
    flex-direction: column;
    min-width: 200px;
  }
  .advanced-search-group label {
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text);
  }
  .advanced-search-group select {
    padding: 0.4rem;
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

  .search-results-info {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #8b949e;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .search-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .search-input-wrapper {
      width: 100%;
      margin-right: 0;
      margin-bottom: 1rem;
    }

    .search-options {
      width: 100%;
      justify-content: space-between;
    }

    .advanced-search-group {
      width: 100%;
    }
  }
`;
  document.head.appendChild(style);
}
