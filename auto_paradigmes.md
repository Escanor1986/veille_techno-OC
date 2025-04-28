---
title: "Veille auto : Paradigmes de programmation"
layout: page
permalink: /auto_paradigmes/
---

# 🧠 Veille automatique – Paradigmes de programmation

🕒 *Dernière mise à jour : lundi 28 avril 2025*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"What Does \"use client\" Do?","link":"https://overreacted.io/what-does-use-client-do/","date":"Fri, 25 Apr 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[What Does "use client" Do?](https://overreacted.io/what-does-use-client-do/) – *Fri, 25 Apr 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"Impossible Components","link":"https://overreacted.io/impossible-components/","date":"Tue, 22 Apr 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[Impossible Components](https://overreacted.io/impossible-components/) – *Tue, 22 Apr 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"JSX Over The Wire","link":"https://overreacted.io/jsx-over-the-wire/","date":"Wed, 16 Apr 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[JSX Over The Wire](https://overreacted.io/jsx-over-the-wire/) – *Wed, 16 Apr 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"React for Two Computers","link":"https://overreacted.io/react-for-two-computers/","date":"Wed, 09 Apr 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns","react"]}'>[React for Two Computers](https://overreacted.io/react-for-two-computers/) – *Wed, 09 Apr 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns` `#react`</span>
- <span data-article='{"title":"The Two Reacts","link":"https://overreacted.io/the-two-reacts/","date":"Thu, 04 Jan 2024 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[The Two Reacts](https://overreacted.io/the-two-reacts/) – *Thu, 04 Jan 2024 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"A Chain Reaction","link":"https://overreacted.io/a-chain-reaction/","date":"Mon, 11 Dec 2023 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[A Chain Reaction](https://overreacted.io/a-chain-reaction/) – *Mon, 11 Dec 2023 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"npm audit: Broken by Design","link":"https://overreacted.io/npm-audit-broken-by-design/","date":"Wed, 07 Jul 2021 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[npm audit: Broken by Design](https://overreacted.io/npm-audit-broken-by-design/) – *Wed, 07 Jul 2021 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"Before You memo()","link":"https://overreacted.io/before-you-memo/","date":"Tue, 23 Feb 2021 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[Before You memo()](https://overreacted.io/before-you-memo/) – *Tue, 23 Feb 2021 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"The WET Codebase","link":"https://overreacted.io/the-wet-codebase/","date":"Mon, 13 Jul 2020 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[The WET Codebase](https://overreacted.io/the-wet-codebase/) – *Mon, 13 Jul 2020 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"Goodbye, Clean Code","link":"https://overreacted.io/goodbye-clean-code/","date":"Sat, 11 Jan 2020 00:00:00 GMT","tags":["paradigm","architecture","patterns","code"]}'>[Goodbye, Clean Code](https://overreacted.io/goodbye-clean-code/) – *Sat, 11 Jan 2020 00:00:00 GMT* `#paradigm` `#architecture` `#patterns` `#code`</span>


<script>
document.addEventListener('DOMContentLoaded', function() {
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
  if (tagFiltersContainer) {
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
  }
  
  // Attacher l'événement de filtrage au champ de recherche
  const searchInput = document.getElementById('article-search');
  if (searchInput) {
    searchInput.addEventListener('input', filterArticles);
  }
});
</script>