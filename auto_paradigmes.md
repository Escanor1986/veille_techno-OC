---
title: "Veille auto : Paradigmes de programmation"
layout: page
permalink: /auto_paradigmes/
---

# 🧠 Veille automatique – Paradigmes de programmation

🕒 *Dernière mise à jour : lundi 11 août 2025*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"The Math Is Haunted","link":"https://overreacted.io/the-math-is-haunted/","date":"Wed, 30 Jul 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[The Math Is Haunted](https://overreacted.io/the-math-is-haunted/) – *Wed, 30 Jul 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"Suppressions of Suppressions","link":"https://overreacted.io/suppressions-of-suppressions/","date":"Wed, 11 Jun 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[Suppressions of Suppressions](https://overreacted.io/suppressions-of-suppressions/) – *Wed, 11 Jun 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"I&apos;m Doing a Little Consulting","link":"https://overreacted.io/im-doing-a-little-consulting/","date":"Wed, 11 Jun 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[I'm Doing a Little Consulting](https://overreacted.io/im-doing-a-little-consulting/) – *Wed, 11 Jun 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"How Imports Work in RSC","link":"https://overreacted.io/how-imports-work-in-rsc/","date":"Thu, 05 Jun 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[How Imports Work in RSC](https://overreacted.io/how-imports-work-in-rsc/) – *Thu, 05 Jun 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"RSC for LISP Developers","link":"https://overreacted.io/rsc-for-lisp-developers/","date":"Sun, 01 Jun 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[RSC for LISP Developers](https://overreacted.io/rsc-for-lisp-developers/) – *Sun, 01 Jun 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"Progressive JSON","link":"https://overreacted.io/progressive-json/","date":"Sat, 31 May 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[Progressive JSON](https://overreacted.io/progressive-json/) – *Sat, 31 May 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"Why Does RSC Integrate with a Bundler?","link":"https://overreacted.io/why-does-rsc-integrate-with-a-bundler/","date":"Fri, 30 May 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[Why Does RSC Integrate with a Bundler?](https://overreacted.io/why-does-rsc-integrate-with-a-bundler/) – *Fri, 30 May 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"One Roundtrip Per Navigation","link":"https://overreacted.io/one-roundtrip-per-navigation/","date":"Thu, 29 May 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[One Roundtrip Per Navigation](https://overreacted.io/one-roundtrip-per-navigation/) – *Thu, 29 May 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"Static as a Server","link":"https://overreacted.io/static-as-a-server/","date":"Thu, 08 May 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[Static as a Server](https://overreacted.io/static-as-a-server/) – *Thu, 08 May 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"RSC for Astro Developers","link":"https://overreacted.io/rsc-for-astro-developers/","date":"Tue, 06 May 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[RSC for Astro Developers](https://overreacted.io/rsc-for-astro-developers/) – *Tue, 06 May 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>


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