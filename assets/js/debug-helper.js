/**
 * debug-helper.js - Aide au diagnostic des problèmes JavaScript
 * Placez ce script dans assets/js/ et incluez-le dans vos pages pour déboguer
 */

// Fonction auto-exécutante pour éviter les conflits de noms
(function() {
  // Créer un conteneur de debug qui peut être affiché/masqué
  function createDebugConsole() {
    const debugContainer = document.createElement('div');
    debugContainer.id = 'debug-console';
    debugContainer.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 300px;
      overflow-y: auto;
      background-color: rgba(0, 0, 0, 0.8);
      color: #33ff33;
      font-family: monospace;
      font-size: 12px;
      padding: 10px;
      z-index: 10000;
      border-top: 2px solid #33ff33;
      display: none;
    `;
    
    // Ajouter un bouton pour afficher/masquer le debug
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Debug';
    toggleButton.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      padding: 5px 10px;
      background-color: #333;
      color: #33ff33;
      border: 1px solid #33ff33;
      border-radius: 4px;
      cursor: pointer;
      z-index: 10001;
      font-family: monospace;
    `;
    toggleButton.onclick = function() {
      const console = document.getElementById('debug-console');
      if (console) {
        console.style.display = console.style.display === 'none' ? 'block' : 'none';
      }
    };
    
    // Ajouter au document
    document.body.appendChild(debugContainer);
    document.body.appendChild(toggleButton);
    
    return debugContainer;
  }
  
  // Intercepter et enregistrer les messages console
  function interceptConsole() {
    const debugContainer = document.getElementById('debug-console') || createDebugConsole();
    
    // Sauvegarder les méthodes console originales
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    };
    
    // Fonction pour ajouter un message au conteneur de debug
    function addMessage(type, args) {
      const entry = document.createElement('div');
      entry.className = `debug-${type}`;
      
      // Formatage en fonction du type
      switch (type) {
        case 'error':
          entry.style.color = '#ff5555';
          break;
        case 'warn':
          entry.style.color = '#ffff55';
          break;
        case 'info':
          entry.style.color = '#5555ff';
          break;
        default:
          entry.style.color = '#33ff33';
      }
      
      // Heure actuelle
      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
      
      // Convertir les arguments en texte
      const argsText = Array.from(args).map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' ');
      
      entry.textContent = `[${timestamp}] [${type.toUpperCase()}] ${argsText}`;
      debugContainer.appendChild(entry);
      
      // Auto-scroll vers le bas
      debugContainer.scrollTop = debugContainer.scrollHeight;
    }
    
    // Remplacer les méthodes console
    console.log = function() {
      originalConsole.log.apply(console, arguments);
      addMessage('log', arguments);
    };
    
    console.error = function() {
      originalConsole.error.apply(console, arguments);
      addMessage('error', arguments);
    };
    
    console.warn = function() {
      originalConsole.warn.apply(console, arguments);
      addMessage('warn', arguments);
    };
    
    console.info = function() {
      originalConsole.info.apply(console, arguments);
      addMessage('info', arguments);
    };
  }
  
  // Capturer les erreurs globales
  function captureGlobalErrors() {
    window.addEventListener('error', function(event) {
      console.error(`ERREUR: ${event.message} à ${event.filename}:${event.lineno}:${event.colno}`);
      return false; // Laisser l'erreur se propager
    });
    
    window.addEventListener('unhandledrejection', function(event) {
      console.error(`PROMESSE REJETÉE: ${event.reason}`);
      return false; // Laisser l'erreur se propager
    });
  }
  
  // Diagnostiquer les problèmes de script
  function diagnoseScriptProblems() {
    // Vérifier la présence de scripts importants
    const scripts = document.querySelectorAll('script');
    console.info(`Scripts chargés: ${scripts.length}`);
    
    scripts.forEach(script => {
      if (script.src) {
        console.info(`Script externe: ${script.src}`);
        
        // Vérifier si des scripts ne se sont pas chargés
        if (script.readyState === 'loading' || script.readyState === 'uninitialized') {
          console.warn(`Script non chargé: ${script.src}`);
        }
      } else if (script.textContent.length > 0) {
        console.info(`Script intégré (${script.textContent.length} caractères)`);
        
        // Vérifier les erreurs de syntaxe évidentes
        try {
          new Function(script.textContent);
        } catch (e) {
          console.error(`Erreur de syntaxe possible dans un script intégré: ${e.message}`);
        }
      }
    });
    
    // Vérifier si Chart.js est chargé
    if (typeof Chart === 'undefined') {
      console.warn("Chart.js n'est pas chargé");
    } else {
      console.info("Chart.js est disponible");
    }
    
    // Vérifier d'autres bibliothèques courantes
    if (typeof jQuery === 'undefined') {
      console.info("jQuery n'est pas chargé (normal si non utilisé)");
    }
  }
  
  // Vérifier l'URL et les chemins
  function checkURLs() {
    console.info(`URL actuelle: ${window.location.href}`);
    console.info(`Chemin: ${window.location.pathname}`);
    console.info(`Origine: ${window.location.origin}`);
    
    // Tester si nous sommes sur GitHub Pages
    if (window.location.hostname.includes('github.io')) {
      console.info("Environnement détecté: GitHub Pages");
    } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.info("Environnement détecté: Développement local");
    } else {
      console.info(`Environnement détecté: Autre (${window.location.hostname})`);
    }
    
    // Vérifier les fichiers clés
    const keysFiles = [
      'auto_tests.md', 
      'auto_ui.md', 
      'auto_paradigmes.md', 
      'auto_stack.md',
      'assets/js/stats.js',
      'assets/js/search.js'
    ];
    
    console.info("Tentative de vérification de disponibilité des fichiers clés...");
    
    // Construire la base URL
    let baseUrl = window.location.origin;
    if (window.location.pathname.includes('/veille_techno-OC')) {
      baseUrl += '/veille_techno-OC/';
    } else if (!window.location.pathname.endsWith('/')) {
      baseUrl += '/';
    }
    
    // Utiliser fetch pour vérifier l'existence des fichiers
    keysFiles.forEach(file => {
      fetch(`${baseUrl}${file}`)
        .then(response => {
          console.info(`Fichier ${file}: ${response.ok ? 'OK' : 'Non trouvé'} (${response.status})`);
        })
        .catch(error => {
          console.warn(`Erreur lors de la vérification de ${file}: ${error.message}`);
        });
    });
  }
  
  // Fonction principale d'initialisation du debug
  function initDebugHelper() {
    // Ne rien faire si nous ne sommes pas en mode développement
    if (window.location.hostname !== 'localhost' && 
        window.location.hostname !== '127.0.0.1' && 
        !window.location.search.includes('debug=true')) {
      return;
    }
    
    console.info("Initialisation de l'assistant de débogage...");
    
    // Mettre en place les outils de debug
    interceptConsole();
    captureGlobalErrors();
    
    // Attendre que la page soit complètement chargée
    window.addEventListener('load', function() {
      console.info("Page entièrement chargée, exécution du diagnostic...");
      diagnoseScriptProblems();
      checkURLs();
    });
  }
  
  // Lancer l'initialisation
  document.addEventListener('DOMContentLoaded', initDebugHelper);
})();
