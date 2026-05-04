---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 4 mai 2026*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"JDBC Series","link":"https://feeds.feedblitz.com/~/955198892/0/baeldung~JDBC-Series","date":"Mon, 04 May 2026 07:42:55 +0000","tags":["java","angular","spring","backend","frontend"]}'>[JDBC Series](https://feeds.feedblitz.com/~/955198892/0/baeldung~JDBC-Series) – *Mon, 04 May 2026 07:42:55 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 644","link":"https://feeds.feedblitz.com/~/954947657/0/baeldung~Java-Weekly-Issue","date":"Fri, 01 May 2026 08:59:37 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 644](https://feeds.feedblitz.com/~/954947657/0/baeldung~Java-Weekly-Issue) – *Fri, 01 May 2026 08:59:37 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"IntelliJ Series","link":"https://feeds.feedblitz.com/~/954893270/0/baeldung~IntelliJ-Series","date":"Thu, 30 Apr 2026 18:18:17 +0000","tags":["java","angular","spring","backend","frontend"]}'>[IntelliJ Series](https://feeds.feedblitz.com/~/954893270/0/baeldung~IntelliJ-Series) – *Thu, 30 Apr 2026 18:18:17 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Jakarta EE Series","link":"https://feeds.feedblitz.com/~/954893273/0/baeldung~Jakarta-EE-Series","date":"Thu, 30 Apr 2026 18:07:58 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Jakarta EE Series](https://feeds.feedblitz.com/~/954893273/0/baeldung~Jakarta-EE-Series) – *Thu, 30 Apr 2026 18:07:58 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Maps Series","link":"https://feeds.feedblitz.com/~/954859364/0/baeldung~Java-Maps-Series","date":"Thu, 30 Apr 2026 08:12:05 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Maps Series](https://feeds.feedblitz.com/~/954859364/0/baeldung~Java-Maps-Series) – *Thu, 30 Apr 2026 08:12:05 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java List Series","link":"https://feeds.feedblitz.com/~/954857483/0/baeldung~Java-List-Series","date":"Thu, 30 Apr 2026 07:50:21 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java List Series](https://feeds.feedblitz.com/~/954857483/0/baeldung~Java-List-Series) – *Thu, 30 Apr 2026 07:50:21 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Store Java Objects in HttpSession","link":"https://feeds.feedblitz.com/~/954837605/0/baeldung~Store-Java-Objects-in-HttpSession","date":"Thu, 30 Apr 2026 00:07:54 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Store Java Objects in HttpSession](https://feeds.feedblitz.com/~/954837605/0/baeldung~Store-Java-Objects-in-HttpSession) – *Thu, 30 Apr 2026 00:07:54 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Algorithms in Java Series","link":"https://feeds.feedblitz.com/~/954821783/0/baeldung~Algorithms-in-Java-Series","date":"Wed, 29 Apr 2026 17:40:01 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Algorithms in Java Series](https://feeds.feedblitz.com/~/954821783/0/baeldung~Algorithms-in-Java-Series) – *Wed, 29 Apr 2026 17:40:01 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Spring AI Series","link":"https://feeds.feedblitz.com/~/954792065/0/baeldung~Spring-AI-Series","date":"Wed, 29 Apr 2026 08:43:50 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Spring AI Series](https://feeds.feedblitz.com/~/954792065/0/baeldung~Spring-AI-Series) – *Wed, 29 Apr 2026 08:43:50 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"AI in Java Series","link":"https://feeds.feedblitz.com/~/954788495/0/baeldung~AI-in-Java-Series","date":"Wed, 29 Apr 2026 06:59:57 +0000","tags":["java","angular","spring","backend","frontend"]}'>[AI in Java Series](https://feeds.feedblitz.com/~/954788495/0/baeldung~AI-in-Java-Series) – *Wed, 29 Apr 2026 06:59:57 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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