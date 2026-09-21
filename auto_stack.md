---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 21 septembre 2026*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"Introduction to Solon","link":"https://feeds.feedblitz.com/~/969398114/0/baeldung","date":"Mon, 21 Sep 2026 04:05:19 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Introduction to Solon](https://feeds.feedblitz.com/~/969398114/0/baeldung) – *Mon, 21 Sep 2026 04:05:19 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 664","link":"https://feeds.feedblitz.com/~/969333680/0/baeldung","date":"Sun, 20 Sep 2026 07:55:45 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 664](https://feeds.feedblitz.com/~/969333680/0/baeldung) – *Sun, 20 Sep 2026 07:55:45 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Prompt Caching Support in Spring AI with Anthropic Claude","link":"https://feeds.feedblitz.com/~/969174386/0/baeldung","date":"Wed, 16 Sep 2026 07:49:56 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Prompt Caching Support in Spring AI with Anthropic Claude](https://feeds.feedblitz.com/~/969174386/0/baeldung) – *Wed, 16 Sep 2026 07:49:56 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Gson Deserialization and the InaccessibleObjectException","link":"https://feeds.feedblitz.com/~/969124883/0/baeldung","date":"Tue, 15 Sep 2026 05:32:46 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Gson Deserialization and the InaccessibleObjectException](https://feeds.feedblitz.com/~/969124883/0/baeldung) – *Tue, 15 Sep 2026 05:32:46 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Resolving Exception: Cannot Deserialize From Object Value (No Delegate- Or Property-Based Creator)","link":"https://feeds.feedblitz.com/~/969076403/0/baeldung","date":"Mon, 14 Sep 2026 04:21:09 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Resolving Exception: Cannot Deserialize From Object Value (No Delegate- Or Property-Based Creator)](https://feeds.feedblitz.com/~/969076403/0/baeldung) – *Mon, 14 Sep 2026 04:21:09 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 663","link":"https://feeds.feedblitz.com/~/969048446/0/baeldung","date":"Sun, 13 Sep 2026 11:00:00 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 663](https://feeds.feedblitz.com/~/969048446/0/baeldung) – *Sun, 13 Sep 2026 11:00:00 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"What’s New in Jackson 3?","link":"https://feeds.feedblitz.com/~/968938295/0/baeldung","date":"Thu, 10 Sep 2026 19:10:48 +0000","tags":["java","angular","spring","backend","frontend"]}'>[What’s New in Jackson 3?](https://feeds.feedblitz.com/~/968938295/0/baeldung) – *Thu, 10 Sep 2026 19:10:48 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"HTTP/3 Support in HTTP Client API in Java 26","link":"https://feeds.feedblitz.com/~/968937662/0/baeldung","date":"Thu, 10 Sep 2026 18:50:56 +0000","tags":["java","angular","spring","backend","frontend"]}'>[HTTP/3 Support in HTTP Client API in Java 26](https://feeds.feedblitz.com/~/968937662/0/baeldung) – *Thu, 10 Sep 2026 18:50:56 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"MCP Logging in Spring AI","link":"https://feeds.feedblitz.com/~/968567129/0/baeldung","date":"Sun, 06 Sep 2026 23:19:21 +0000","tags":["java","angular","spring","backend","frontend"]}'>[MCP Logging in Spring AI](https://feeds.feedblitz.com/~/968567129/0/baeldung) – *Sun, 06 Sep 2026 23:19:21 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 662","link":"https://feeds.feedblitz.com/~/968560595/0/baeldung","date":"Sun, 06 Sep 2026 09:25:19 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 662](https://feeds.feedblitz.com/~/968560595/0/baeldung) – *Sun, 06 Sep 2026 09:25:19 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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