/**
 * theme-toggle.js - Système de basculement entre thème clair et sombre
 */

// Fonction exécutée au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  initThemeSystem();
});

function initThemeSystem() {
  // Créer le bouton de basculement et l'insérer dans l'en-tête du site
  createToggleButton();
  
  // Charger les préférences de thème
  loadThemePreference();
  
  // Ajouter un écouteur pour les changements de préférence du système
  listenToSystemPreference();
}

function createToggleButton() {
  // Trouver l'en-tête du site
  const header = document.querySelector(".site-header") || document.querySelector("header");
  
  if (!header) {
    console.warn("L'en-tête du site n'a pas été trouvé pour ajouter le bouton de thème");
    return;
  }
  
  // Créer le conteneur du bouton
  const themeContainer = document.createElement("div");
  themeContainer.className = "theme-switch-container";
  
  // Déterminer le thème actuel
  const isDarkTheme = document.body.classList.contains("dark-theme");
  
  // Créer le bouton avec l'icône appropriée
  themeContainer.innerHTML = `
    <button id="theme-toggle" class="theme-toggle-btn" aria-label="Basculer entre le mode clair et sombre">
      <span class="theme-toggle-light${isDarkTheme ? ' hidden' : ''}">☀️</span>
      <span class="theme-toggle-dark${isDarkTheme ? '' : ' hidden'}">🌙</span>
    </button>
  `;
  
  // Insérer dans l'en-tête
  // Adapter en fonction de la structure spécifique du thème Jekyll
  const utilityNav = header.querySelector(".utility-nav") || header.querySelector(".aux-nav");
  
  if (utilityNav) {
    // S'il y a une navigation d'utilitaire, insérer là
    utilityNav.prepend(themeContainer);
  } else {
    // Sinon, créer un conteneur et l'ajouter à l'en-tête
    const wrapper = document.createElement("div");
    wrapper.className = "theme-toggle-wrapper";
    wrapper.appendChild(themeContainer);
    header.appendChild(wrapper);
  }
  
  // Ajouter l'écouteur d'événements au bouton
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  
  // Ajouter les styles CSS pour le bouton
  addToggleStyles();
}

function toggleTheme() {
  // Basculer la classe du thème sur le body
  document.body.classList.toggle("dark-theme");
  
  // Mettre à jour les icônes du bouton
  const isDarkTheme = document.body.classList.contains("dark-theme");
  document.querySelector(".theme-toggle-light").classList.toggle("hidden", isDarkTheme);
  document.querySelector(".theme-toggle-dark").classList.toggle("hidden", !isDarkTheme);
  
  // Sauvegarder la préférence
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  
  // Mettre à jour les graphiques si présents
  updateChartsIfPresent(isDarkTheme);
}

function loadThemePreference() {
  // Vérifier s'il y a une préférence sauvegardée
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme) {
    // Appliquer le thème sauvegardé
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  } else {
    // Si aucune préférence n'est sauvegardée, utiliser la préférence du système
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (prefersDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }
  
  // Mettre à jour les icônes du bouton
  const isDarkTheme = document.body.classList.contains("dark-theme");
  
  const lightIcon = document.querySelector(".theme-toggle-light");
  const darkIcon = document.querySelector(".theme-toggle-dark");
  
  if (lightIcon && darkIcon) {
    lightIcon.classList.toggle("hidden", isDarkTheme);
    darkIcon.classList.toggle("hidden", !isDarkTheme);
  }
}

function listenToSystemPreference() {
  // Écouter les changements de préférence du système
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  
  mediaQuery.addEventListener("change", event => {
    // Ne faire le changement que si l'utilisateur n'a pas de préférence sauvegardée
    if (!localStorage.getItem("theme")) {
      if (event.matches) {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
      
      // Mettre à jour les icônes du bouton
      const isDarkTheme = document.body.classList.contains("dark-theme");
      document.querySelector(".theme-toggle-light").classList.toggle("hidden", isDarkTheme);
      document.querySelector(".theme-toggle-dark").classList.toggle("hidden", !isDarkTheme);
      
      // Mettre à jour les graphiques si présents
      updateChartsIfPresent(isDarkTheme);
    }
  });
}

function updateChartsIfPresent(isDarkTheme) {
  // Si Chart.js est chargé et la fonction de mise à jour des graphiques existe
  if (typeof Chart !== 'undefined' && typeof window.updateChartsTheme === 'function') {
    window.updateChartsTheme(isDarkTheme);
  }
}

function addToggleStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* Styles pour le bouton de basculement de thème */
    .theme-switch-container {
      margin-right: 1rem;
      display: flex;
      align-items: center;
    }
    
    .theme-toggle-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      transition: background-color 0.2s;
    }
    
    .theme-toggle-btn:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    body.dark-theme .theme-toggle-btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .theme-toggle-light, .theme-toggle-dark {
      display: block;
      transition: transform 0.5s;
    }
    
    .hidden {
      display: none;
    }
    
    /* Styles globaux pour le mode sombre */
    body.dark-theme {
      background-color: #0d1117;
      color: #c9d1d9;
    }
    
    body.dark-theme a {
      color: #58a6ff;
    }
    
    body.dark-theme .main-content h1,
    body.dark-theme .main-content h2,
    body.dark-theme .main-content h3,
    body.dark-theme .main-content h4,
    body.dark-theme .main-content h5,
    body.dark-theme .main-content h6 {
      color: #c9d1d9;
    }
    
    body.dark-theme .site-header,
    body.dark-theme .sidebar,
    body.dark-theme .site-footer {
      background-color: #161b22;
      border-color: #30363d;
    }
    
    body.dark-theme .navigation-list-item .navigation-list-child-list {
      background-color: #161b22;
    }
    
    body.dark-theme .search-input {
      background-color: #0d1117;
      border-color: #30363d;
      color: #c9d1d9;
    }
    
    body.dark-theme table th {
      background-color: #161b22;
    }
    
    body.dark-theme table td {
      background-color: #0d1117;
      border-color: #30363d;
    }
    
    body.dark-theme hr {
      border-color: #30363d;
    }
    
    body.dark-theme code {
      background-color: #161b22;
      border-color: #30363d;
    }
    
    body.dark-theme .btn {
      background-color: #21262d;
      color: #c9d1d9;
      border-color: #30363d;
    }
    
    body.dark-theme .btn:hover {
      background-color: #30363d;
    }
    
    body.dark-theme blockquote {
      color: #8b949e;
      border-left-color: #30363d;
    }
    
    /* Ajustement pour mobile */
    @media (max-width: 768px) {
      .theme-toggle-wrapper {
        position: absolute;
        top: 1rem;
        right: 4rem;
      }
      
      .theme-switch-container {
        margin-right: 0;
      }
    }
  `;
  
  document.head.appendChild(style);
}
