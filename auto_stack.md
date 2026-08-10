---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 10 août 2026*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"Java Weekly, Issue 658","link":"https://feeds.feedblitz.com/~/967388204/0/baeldung","date":"Sat, 08 Aug 2026 10:07:32 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 658](https://feeds.feedblitz.com/~/967388204/0/baeldung) – *Sat, 08 Aug 2026 10:07:32 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Introduction to Google GenAI Chat and Spring AI","link":"https://feeds.feedblitz.com/~/967131092/0/baeldung","date":"Fri, 07 Aug 2026 03:22:20 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Introduction to Google GenAI Chat and Spring AI](https://feeds.feedblitz.com/~/967131092/0/baeldung) – *Fri, 07 Aug 2026 03:22:20 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Spring AI AutoMemoryTools","link":"https://feeds.feedblitz.com/~/967131095/0/baeldung","date":"Fri, 07 Aug 2026 03:11:28 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Spring AI AutoMemoryTools](https://feeds.feedblitz.com/~/967131095/0/baeldung) – *Fri, 07 Aug 2026 03:11:28 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Exploring Agent2Agent Protocol (A2A) With Spring AI","link":"https://feeds.feedblitz.com/~/967127630/0/baeldung","date":"Fri, 07 Aug 2026 02:59:48 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Exploring Agent2Agent Protocol (A2A) With Spring AI](https://feeds.feedblitz.com/~/967127630/0/baeldung) – *Fri, 07 Aug 2026 02:59:48 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 657","link":"https://feeds.feedblitz.com/~/965486156/0/baeldung","date":"Sat, 01 Aug 2026 15:56:58 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 657](https://feeds.feedblitz.com/~/965486156/0/baeldung) – *Sat, 01 Aug 2026 15:56:58 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Check if Spark Dataframe Is Empty","link":"https://feeds.feedblitz.com/~/965089607/0/baeldung","date":"Fri, 31 Jul 2026 18:24:51 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Check if Spark Dataframe Is Empty](https://feeds.feedblitz.com/~/965089607/0/baeldung) – *Fri, 31 Jul 2026 18:24:51 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Building Intelligent Document Processing with Apache Camel, Docling and LangChain4j","link":"https://feeds.feedblitz.com/~/964749371/0/baeldung","date":"Thu, 30 Jul 2026 23:35:25 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Building Intelligent Document Processing with Apache Camel, Docling and LangChain4j](https://feeds.feedblitz.com/~/964749371/0/baeldung) – *Thu, 30 Jul 2026 23:35:25 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"CTE Support in Hibernate","link":"https://feeds.feedblitz.com/~/964749374/0/baeldung","date":"Thu, 30 Jul 2026 23:28:05 +0000","tags":["java","angular","spring","backend","frontend"]}'>[CTE Support in Hibernate](https://feeds.feedblitz.com/~/964749374/0/baeldung) – *Thu, 30 Jul 2026 23:28:05 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"LLM Integration With Apache Camel OpenAI Component","link":"https://feeds.feedblitz.com/~/964742375/0/baeldung","date":"Thu, 30 Jul 2026 23:25:13 +0000","tags":["java","angular","spring","backend","frontend"]}'>[LLM Integration With Apache Camel OpenAI Component](https://feeds.feedblitz.com/~/964742375/0/baeldung) – *Thu, 30 Jul 2026 23:25:13 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"A Guide to Ahead-of-Time Cache in the Java","link":"https://feeds.feedblitz.com/~/964742378/0/baeldung","date":"Thu, 30 Jul 2026 23:21:22 +0000","tags":["java","angular","spring","backend","frontend"]}'>[A Guide to Ahead-of-Time Cache in the Java](https://feeds.feedblitz.com/~/964742378/0/baeldung) – *Thu, 30 Jul 2026 23:21:22 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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