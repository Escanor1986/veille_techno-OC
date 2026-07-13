---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 13 juillet 2026*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"LLM Tool Call Reasoning Using Embabel Agentic AI Framework","link":"https://feeds.feedblitz.com/~/960158825/0/baeldung","date":"Sun, 12 Jul 2026 09:57:58 +0000","tags":["java","angular","spring","backend","frontend"]}'>[LLM Tool Call Reasoning Using Embabel Agentic AI Framework](https://feeds.feedblitz.com/~/960158825/0/baeldung) – *Sun, 12 Jul 2026 09:57:58 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Testing Spring MVC HandlerInterceptor","link":"https://feeds.feedblitz.com/~/960129299/0/baeldung","date":"Sat, 11 Jul 2026 21:18:07 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Testing Spring MVC HandlerInterceptor](https://feeds.feedblitz.com/~/960129299/0/baeldung) – *Sat, 11 Jul 2026 21:18:07 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 654","link":"https://feeds.feedblitz.com/~/960038423/0/baeldung","date":"Fri, 10 Jul 2026 21:30:52 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 654](https://feeds.feedblitz.com/~/960038423/0/baeldung) – *Fri, 10 Jul 2026 21:30:52 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Building up a SQL Query String in Java","link":"https://feeds.feedblitz.com/~/959091590/0/baeldung","date":"Sat, 04 Jul 2026 21:28:22 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Building up a SQL Query String in Java](https://feeds.feedblitz.com/~/959091590/0/baeldung) – *Sat, 04 Jul 2026 21:28:22 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Building LLM-as-a-Judge Using Recursive Advisors in Spring AI","link":"https://feeds.feedblitz.com/~/959091593/0/baeldung","date":"Sat, 04 Jul 2026 21:18:53 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Building LLM-as-a-Judge Using Recursive Advisors in Spring AI](https://feeds.feedblitz.com/~/959091593/0/baeldung) – *Sat, 04 Jul 2026 21:18:53 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 653","link":"https://feeds.feedblitz.com/~/958918577/0/baeldung","date":"Fri, 03 Jul 2026 13:12:53 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 653](https://feeds.feedblitz.com/~/958918577/0/baeldung) – *Fri, 03 Jul 2026 13:12:53 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Spring AI’s Dynamic Tool Discovery","link":"https://feeds.feedblitz.com/~/958677014/0/baeldung","date":"Mon, 29 Jun 2026 02:50:03 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Spring AI’s Dynamic Tool Discovery](https://feeds.feedblitz.com/~/958677014/0/baeldung) – *Mon, 29 Jun 2026 02:50:03 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"New Features in Java 26","link":"https://feeds.feedblitz.com/~/958677017/0/baeldung","date":"Mon, 29 Jun 2026 02:46:15 +0000","tags":["java","angular","spring","backend","frontend"]}'>[New Features in Java 26](https://feeds.feedblitz.com/~/958677017/0/baeldung) – *Mon, 29 Jun 2026 02:46:15 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"A Guide to Apache Paimon Java API","link":"https://feeds.feedblitz.com/~/958675751/0/baeldung","date":"Mon, 29 Jun 2026 02:37:29 +0000","tags":["java","angular","spring","backend","frontend"]}'>[A Guide to Apache Paimon Java API](https://feeds.feedblitz.com/~/958675751/0/baeldung) – *Mon, 29 Jun 2026 02:37:29 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Understanding and Avoiding CommitFailedException in Kafka","link":"https://feeds.feedblitz.com/~/958534139/0/baeldung","date":"Sat, 27 Jun 2026 18:53:49 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Understanding and Avoiding CommitFailedException in Kafka](https://feeds.feedblitz.com/~/958534139/0/baeldung) – *Sat, 27 Jun 2026 18:53:49 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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