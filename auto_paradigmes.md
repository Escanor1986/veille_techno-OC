---
title: "Veille auto : Paradigmes de programmation"
layout: page
permalink: /auto_paradigmes/
---

# 🧠 Veille automatique – Paradigmes de programmation

🕒 *Dernière mise à jour : lundi 17 novembre 2025*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"Hire Me in Japan","link":"https://overreacted.io/hire-me-in-japan/","date":"Tue, 11 Nov 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[Hire Me in Japan](https://overreacted.io/hire-me-in-japan/) – *Tue, 11 Nov 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"How to Fix Any Bug","link":"https://overreacted.io/how-to-fix-any-bug/","date":"Tue, 21 Oct 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[How to Fix Any Bug](https://overreacted.io/how-to-fix-any-bug/) – *Tue, 21 Oct 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"Where It&apos;s at://","link":"https://overreacted.io/where-its-at/","date":"Thu, 02 Oct 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[Where It's at://](https://overreacted.io/where-its-at/) – *Thu, 02 Oct 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"Open Social","link":"https://overreacted.io/open-social/","date":"Fri, 26 Sep 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[Open Social](https://overreacted.io/open-social/) – *Fri, 26 Sep 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"A Lean Syntax Primer","link":"https://overreacted.io/a-lean-syntax-primer/","date":"Tue, 02 Sep 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[A Lean Syntax Primer](https://overreacted.io/a-lean-syntax-primer/) – *Tue, 02 Sep 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"Beyond Booleans","link":"https://overreacted.io/beyond-booleans/","date":"Sat, 16 Aug 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[Beyond Booleans](https://overreacted.io/beyond-booleans/) – *Sat, 16 Aug 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"The Math Is Haunted","link":"https://overreacted.io/the-math-is-haunted/","date":"Wed, 30 Jul 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[The Math Is Haunted](https://overreacted.io/the-math-is-haunted/) – *Wed, 30 Jul 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"Suppressions of Suppressions","link":"https://overreacted.io/suppressions-of-suppressions/","date":"Wed, 11 Jun 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[Suppressions of Suppressions](https://overreacted.io/suppressions-of-suppressions/) – *Wed, 11 Jun 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"I&apos;m Doing a Little Consulting","link":"https://overreacted.io/im-doing-a-little-consulting/","date":"Wed, 11 Jun 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[I'm Doing a Little Consulting](https://overreacted.io/im-doing-a-little-consulting/) – *Wed, 11 Jun 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>
- <span data-article='{"title":"How Imports Work in RSC","link":"https://overreacted.io/how-imports-work-in-rsc/","date":"Thu, 05 Jun 2025 00:00:00 GMT","tags":["paradigm","architecture","patterns"]}'>[How Imports Work in RSC](https://overreacted.io/how-imports-work-in-rsc/) – *Thu, 05 Jun 2025 00:00:00 GMT* `#paradigm` `#architecture` `#patterns`</span>


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