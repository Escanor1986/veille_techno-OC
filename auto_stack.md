---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 9 novembre 2026*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"How to Fix the Error: Missing Artifact com.sun:tools:jar in pom.xml Files","link":"https://feeds.feedblitz.com/~/972630176/0/baeldung","date":"Sun, 08 Nov 2026 13:31:31 +0000","tags":["java","angular","spring","backend","frontend"]}'>[How to Fix the Error: Missing Artifact com.sun:tools:jar in pom.xml Files](https://feeds.feedblitz.com/~/972630176/0/baeldung) – *Sun, 08 Nov 2026 13:31:31 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Automating Shadow DOM in Selenium WebDriver","link":"https://feeds.feedblitz.com/~/972628949/0/baeldung","date":"Sun, 08 Nov 2026 13:20:05 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Automating Shadow DOM in Selenium WebDriver](https://feeds.feedblitz.com/~/972628949/0/baeldung) – *Sun, 08 Nov 2026 13:20:05 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 670","link":"https://feeds.feedblitz.com/~/972505319/0/baeldung","date":"Fri, 06 Nov 2026 17:35:09 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 670](https://feeds.feedblitz.com/~/972505319/0/baeldung) – *Fri, 06 Nov 2026 17:35:09 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 669","link":"https://feeds.feedblitz.com/~/972125879/0/baeldung","date":"Fri, 30 Oct 2026 16:16:14 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 669](https://feeds.feedblitz.com/~/972125879/0/baeldung) – *Fri, 30 Oct 2026 16:16:14 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Query Transformation in Spring AI Modular RAG","link":"https://feeds.feedblitz.com/~/972117848/0/baeldung","date":"Fri, 30 Oct 2026 11:51:20 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Query Transformation in Spring AI Modular RAG](https://feeds.feedblitz.com/~/972117848/0/baeldung) – *Fri, 30 Oct 2026 11:51:20 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Handle Forwarded Headers in Spring Boot","link":"https://feeds.feedblitz.com/~/972117851/0/baeldung","date":"Fri, 30 Oct 2026 11:42:54 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Handle Forwarded Headers in Spring Boot](https://feeds.feedblitz.com/~/972117851/0/baeldung) – *Fri, 30 Oct 2026 11:42:54 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Safeguarding LLM Output in Spring AI","link":"https://feeds.feedblitz.com/~/971759387/0/baeldung","date":"Sun, 18 Oct 2026 17:55:03 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Safeguarding LLM Output in Spring AI](https://feeds.feedblitz.com/~/971759387/0/baeldung) – *Sun, 18 Oct 2026 17:55:03 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 668","link":"https://feeds.feedblitz.com/~/971746664/0/baeldung","date":"Sun, 18 Oct 2026 07:13:23 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 668](https://feeds.feedblitz.com/~/971746664/0/baeldung) – *Sun, 18 Oct 2026 07:13:23 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Building Graph-Based Workflows With Spring AI Alibaba","link":"https://feeds.feedblitz.com/~/971204387/0/baeldung","date":"Sat, 10 Oct 2026 01:04:27 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Building Graph-Based Workflows With Spring AI Alibaba](https://feeds.feedblitz.com/~/971204387/0/baeldung) – *Sat, 10 Oct 2026 01:04:27 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 667","link":"https://feeds.feedblitz.com/~/971192846/0/baeldung","date":"Fri, 09 Oct 2026 15:26:39 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 667](https://feeds.feedblitz.com/~/971192846/0/baeldung) – *Fri, 09 Oct 2026 15:26:39 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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