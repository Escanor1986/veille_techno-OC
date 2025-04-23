/**
 * dashboard-loader.js - Chargement optimisé des ressources du dashboard
 */

// Fonction pour charger une ressource JavaScript de manière asynchrone
function loadScript(url, integrity = null) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    
    if (integrity) {
      script.integrity = integrity;
      script.crossOrigin = "anonymous";
      script.referrerPolicy = "no-referrer";
    }
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Échec du chargement de ${url}`));
    
    document.head.appendChild(script);
  });
}

// Fonction pour charger une ressource CSS
function loadCSS(url) {
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = () => resolve();
    document.head.appendChild(link);
  });
}

// Fonction principale pour charger toutes les ressources nécessaires
async function loadDashboardResources() {
  try {
    // Vérifier si nous sommes sur une page qui nécessite des ressources du dashboard
    const isDashboardPage = document.getElementById('dashboard-stats') || 
                           document.querySelector('.dashboard-container');
    
    if (!isDashboardPage) return;
    
    // Charger Chart.js si nécessaire
    if (typeof Chart === 'undefined') {
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js",
        "sha512-ElRFoEQdI5Ht6kZvyzXhYG9NqjtkmlkfYk0wr6wHxU9JEHakS7UJZNeml5ALk+8IKlU6jDgMabC3vkumRokgJA=="
      );
      console.log("Chart.js chargé avec succès");
    }
    
    // Initialiser les ressources spécifiques selon la page
    if (window.location.pathname.includes('/dashboard')) {
      console.log("Initialisation du dashboard analytique avancé");
      // Vous pourriez charger ici d'autres scripts spécifiques au dashboard analytique
    } else {
      console.log("Initialisation du dashboard standard");
      // Initialiser les fonctionnalités de base du dashboard
    }
  } catch (error) {
    console.error("Erreur lors du chargement des ressources:", error);
  }
}

// Exécuter au chargement de la page
document.addEventListener("DOMContentLoaded", loadDashboardResources);
