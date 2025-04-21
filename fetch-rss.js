/**
 * Script de récupération de flux RSS amélioré
 * Supporte l'extraction des tags et le système de catégorisation
 */
const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

// Configuration du parser avec options étendues
const parser = new Parser({
	customFields: {
		item: [
			['category', 'categories'], // Récupère les catégories comme tableau
			'content:encoded', // Pour récupérer le contenu complet si disponible
			'dc:creator', // Pour récupérer l'auteur si disponible
		],
	},
});

// Configuration des flux avec tags prédéfinis
const feeds = [
	{
		name: 'Librairies de test',
		file: 'auto_tests.md',
		permalink: '/auto_tests/',
		rss: 'https://feeds.feedburner.com/SoftwareTestingHelp',
		defaultTags: ['test', 'qa', 'automation'],
		emoji: '🧪',
	},
	{
		name: 'Librairies UI',
		file: 'auto_ui.md',
		permalink: '/auto_ui/',
		rss: 'https://blog.bitsrc.io/feed',
		defaultTags: ['ui', 'frontend', 'design'],
		emoji: '🎨',
	},
	{
		name: 'Paradigmes de programmation',
		file: 'auto_paradigmes.md',
		permalink: '/auto_paradigmes/',
		rss: 'https://overreacted.io/rss.xml',
		defaultTags: ['paradigm', 'architecture', 'patterns'],
		emoji: '🧠',
	},
	{
		name: 'Stack Java / Angular',
		file: 'auto_stack.md',
		permalink: '/auto_stack/',
		rss: 'https://feeds.feedburner.com/Baeldung',
		defaultTags: ['java', 'angular', 'spring', 'backend', 'frontend'],
		emoji: '🌐',
	},
];

// Fonction pour extraire les tags du contenu des articles
function extractTags(item, defaultTags) {
	// Tags à partir des catégories disponibles dans le RSS
	const categoryTags = item.categories || [];

	// Extraire des mots-clés du titre
	const titleTags = item.title
		? item.title
				.toLowerCase()
				.replace(/[^\w\s]/g, '')
				.split(' ')
				.filter(
					word =>
						word.length > 3 &&
						[
							'test',
							'java',
							'angular',
							'react',
							'vue',
							'spring',
							'junit',
							'mock',
							'api',
							'rest',
							'web',
							'code',
							'dev',
							'app',
							'ui',
							'ux',
						].includes(word)
				)
		: [];

	// Combiner tous les tags, supprimer les doublons, et limiter à 5 tags
	const allTags = [
		...new Set([...defaultTags, ...categoryTags, ...titleTags]),
	].slice(0, 5);

	return allTags;
}

// Fonction pour formater les tags pour l'affichage markdown
function formatTags(tags) {
	if (!tags || tags.length === 0) return '';

	return tags.map(tag => `\`#${tag}\``).join(' ');
}

// Fonction pour créer le répertoire de données JSON
function setupDataDirectory() {
	const dataDir = path.join(__dirname, 'data');
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir);
	}
	return dataDir;
}

// Fonction pour générer le fichier latest-updates.md
function generateLatestUpdatesFile(allArticles) {
	// Tri des articles par date (du plus récent au plus ancien)
	allArticles.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));

	// Prendre les 10 articles les plus récents
	const latestArticles = allArticles.slice(0, 10);

	// Générer le contenu Markdown
	let content = `---
title: "Dernières mises à jour"
layout: page
permalink: /latest-updates/
nav_order: 2
---

# 📰 Dernières mises à jour de la veille

🕒 *Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})}*

Cette page présente les articles les plus récents, toutes catégories confondues.

`;

	latestArticles.forEach(article => {
		const formattedDate = new Date(article.isoDate).toLocaleDateString(
			'fr-FR',
			{
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}
		);

		content += `## ${article.emoji} [${article.title}](${article.link})\n\n`;
		content += `*Publié le ${formattedDate} dans ${article.category}*\n\n`;

		if (article.tags && article.tags.length > 0) {
			content += `${formatTags(article.tags)}\n\n`;
		}

		// Ajouter un extrait si disponible
		if (article.contentSnippet) {
			const snippet =
				article.contentSnippet.split('\n')[0].substring(0, 200) + '...';
			content += `> ${snippet}\n\n`;
		}

		content += `[Lire l'article complet](${article.link})\n\n---\n\n`;
	});

	fs.writeFileSync('latest-updates.md', content);
	console.log('✅ Fichier latest-updates.md généré avec succès');
}

// Fonction principale asynchrone
(async () => {
	// Date formatée pour l'affichage
	const date = new Date().toLocaleDateString('fr-FR', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const dataDir = setupDataDirectory();
	const allArticles = [];

	// Récupérer les flux RSS pour chaque catégorie
	for (const feed of feeds) {
		try {
			const data = await parser.parseURL(feed.rss);

			// Préparation du contenu markdown
			let content = `---
title: "Veille auto : ${feed.name}"
layout: page
permalink: ${feed.permalink}
---

# ${feed.emoji} Veille automatique – ${feed.name}

🕒 *Dernière mise à jour : ${date}*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article..." onkeyup="filterArticles()">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

`;

			if (data.items.length === 0) {
				content += `> Aucune publication trouvée pour le moment.`;
			} else {
				// Générer les articles avec leurs tags
				data.items.slice(0, 10).forEach(item => {
					// Extraction des tags
					const tags = extractTags(item, feed.defaultTags);

					// Ajouter l'article au tableau global pour latest-updates.md
					allArticles.push({
						title: item.title,
						link: item.link,
						pubDate: item.pubDate,
						isoDate:
							item.isoDate ||
							new Date(item.pubDate).toISOString(),
						contentSnippet: item.contentSnippet,
						category: feed.name,
						emoji: feed.emoji,
						tags: tags,
					});

					// Ajout de l'article au contenu markdown avec ses tags
					content += `- [${item.title}](${item.link}) – *${
						item.pubDate
					}* ${formatTags(tags)}\n`;
				});

				// Ajout du script de recherche et filtrage à la fin du fichier
				content += `\n<script>
function filterArticles() {
  const input = document.getElementById('article-search');
  const filter = input.value.toLowerCase();
  const items = document.getElementsByTagName('li');
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const text = item.textContent.toLowerCase();
    if (text.indexOf(filter) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Extraction de tous les tags présents dans les articles
  const tagElements = document.querySelectorAll('code');
  const tags = new Set();
  
  tagElements.forEach(el => {
    if (el.textContent.startsWith('#')) {
      tags.add(el.textContent.substring(1));
    }
  });
  
  // Génération des filtres par tag
  const tagFiltersContainer = document.getElementById('tag-filters');
  tags.forEach(tag => {
    const tagBtn = document.createElement('button');
    tagBtn.className = 'tag-filter-btn';
    tagBtn.textContent = '#' + tag;
    tagBtn.onclick = function() {
      document.getElementById('article-search').value = tag;
      filterArticles();
    };
    tagFiltersContainer.appendChild(tagBtn);
  });
});
</script>`;
			}

			// Écriture du fichier markdown
			fs.writeFileSync(feed.file, content);
			console.log(`✅ Flux "${feed.name}" traité avec succès`);

			// Fonction pour créer un nom de fichier sûr
      // Remplace les caractères spéciaux par des underscores
			function createSafeFilename(name) {
				return name
					.toLowerCase()
					.replace(/[^\w\s]/g, '_') 
					.replace(/\s+/g, '_')
					.replace(/_+/g, '_') 
					.replace(/^_|_$/g, '');
			}

			// Ensuite, on génère le fichier JSON
      // Créer un nom de fichier sûr pour le flux
			fs.writeFileSync(
				path.join(dataDir, `${createSafeFilename(feed.name)}.json`),
				JSON.stringify(data.items.slice(0, 10), null, 2)
			);
		} catch (error) {
			console.error(`❌ Erreur flux "${feed.name}" : ${error.message}`);

			// Générer un fichier markdown d'erreur
			const fallback = `---
title: "Veille auto : ${feed.name}"
layout: page
permalink: ${feed.permalink}
---

# ${feed.emoji} Veille automatique – ${feed.name}

> ⚠️ Erreur lors de la récupération du flux RSS.
> Détail : ${error.message}
> 
> Veuillez réessayer ultérieurement ou vérifier l'URL du flux RSS.`;

			fs.writeFileSync(feed.file, fallback);
		}
	}

	// Générer le fichier des dernières mises à jour si nous avons des articles
	if (allArticles.length > 0) {
		generateLatestUpdatesFile(allArticles);
	}

	console.log('🎉 Traitement terminé !');
})();
