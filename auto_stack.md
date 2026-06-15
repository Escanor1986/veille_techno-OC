---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 15 juin 2026*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"Java Weekly, Issue 650","link":"https://feeds.feedblitz.com/~/957980303/0/baeldung","date":"Fri, 12 Jun 2026 12:45:26 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 650](https://feeds.feedblitz.com/~/957980303/0/baeldung) – *Fri, 12 Jun 2026 12:45:26 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Introduction to Cross-Platform Java Development With Codename One","link":"https://feeds.feedblitz.com/~/957869417/0/baeldung","date":"Mon, 08 Jun 2026 16:34:00 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Introduction to Cross-Platform Java Development With Codename One](https://feeds.feedblitz.com/~/957869417/0/baeldung) – *Mon, 08 Jun 2026 16:34:00 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 649","link":"https://feeds.feedblitz.com/~/957780032/0/baeldung","date":"Fri, 05 Jun 2026 15:34:50 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 649](https://feeds.feedblitz.com/~/957780032/0/baeldung) – *Fri, 05 Jun 2026 15:34:50 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Introduction to Alibaba Nacos","link":"https://feeds.feedblitz.com/~/957626876/0/baeldung","date":"Mon, 01 Jun 2026 22:08:16 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Introduction to Alibaba Nacos](https://feeds.feedblitz.com/~/957626876/0/baeldung) – *Mon, 01 Jun 2026 22:08:16 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"How to Solve the Sock Merchant Problem in Java","link":"https://feeds.feedblitz.com/~/957603419/0/baeldung","date":"Mon, 01 Jun 2026 07:59:55 +0000","tags":["java","angular","spring","backend","frontend"]}'>[How to Solve the Sock Merchant Problem in Java](https://feeds.feedblitz.com/~/957603419/0/baeldung) – *Mon, 01 Jun 2026 07:59:55 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Waiting for Complex Page With JavaScript to Load in Selenium WebDriver","link":"https://feeds.feedblitz.com/~/957590264/0/baeldung","date":"Sun, 31 May 2026 17:27:48 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Waiting for Complex Page With JavaScript to Load in Selenium WebDriver](https://feeds.feedblitz.com/~/957590264/0/baeldung) – *Sun, 31 May 2026 17:27:48 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Guide to Subagent Orchestration in Spring AI","link":"https://feeds.feedblitz.com/~/957590267/0/baeldung","date":"Sun, 31 May 2026 17:19:02 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Guide to Subagent Orchestration in Spring AI](https://feeds.feedblitz.com/~/957590267/0/baeldung) – *Sun, 31 May 2026 17:19:02 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Embedding HTML UIs in MCP Servers With Spring AI","link":"https://feeds.feedblitz.com/~/957590270/0/baeldung","date":"Sun, 31 May 2026 17:16:19 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Embedding HTML UIs in MCP Servers With Spring AI](https://feeds.feedblitz.com/~/957590270/0/baeldung) – *Sun, 31 May 2026 17:16:19 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 648","link":"https://feeds.feedblitz.com/~/957491033/0/baeldung","date":"Fri, 29 May 2026 17:00:42 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 648](https://feeds.feedblitz.com/~/957491033/0/baeldung) – *Fri, 29 May 2026 17:00:42 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"How to Fix the Communications link failure Error in Java Applications With MySQL","link":"https://feeds.feedblitz.com/~/957397595/0/baeldung","date":"Thu, 28 May 2026 02:00:36 +0000","tags":["java","angular","spring","backend","frontend"]}'>[How to Fix the Communications link failure Error in Java Applications With MySQL](https://feeds.feedblitz.com/~/957397595/0/baeldung) – *Thu, 28 May 2026 02:00:36 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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