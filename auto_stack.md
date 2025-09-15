---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 15 septembre 2025*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"Implement Unit Test in gRPC Service","link":"https://feeds.feedblitz.com/~/924827657/0/baeldung","date":"Mon, 15 Sep 2025 03:45:55 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Implement Unit Test in gRPC Service](https://feeds.feedblitz.com/~/924827657/0/baeldung) – *Mon, 15 Sep 2025 03:45:55 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"TupleTransformer and ResultListTransformer in Hibernate","link":"https://feeds.feedblitz.com/~/924771950/0/baeldung","date":"Sat, 13 Sep 2025 14:36:48 +0000","tags":["java","angular","spring","backend","frontend"]}'>[TupleTransformer and ResultListTransformer in Hibernate](https://feeds.feedblitz.com/~/924771950/0/baeldung) – *Sat, 13 Sep 2025 14:36:48 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Run Code Before All Tests in All Classes in JUnit 5","link":"https://feeds.feedblitz.com/~/924771953/0/baeldung","date":"Sat, 13 Sep 2025 14:32:32 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Run Code Before All Tests in All Classes in JUnit 5](https://feeds.feedblitz.com/~/924771953/0/baeldung) – *Sat, 13 Sep 2025 14:32:32 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Build Stateful Custom Bean Validation with Spring Boot","link":"https://feeds.feedblitz.com/~/924732758/0/baeldung","date":"Fri, 12 Sep 2025 18:01:57 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Build Stateful Custom Bean Validation with Spring Boot](https://feeds.feedblitz.com/~/924732758/0/baeldung) – *Fri, 12 Sep 2025 18:01:57 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Custom ObjectMapper with Jersey and Jackson","link":"https://feeds.feedblitz.com/~/924732761/0/baeldung","date":"Fri, 12 Sep 2025 17:57:25 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Custom ObjectMapper with Jersey and Jackson](https://feeds.feedblitz.com/~/924732761/0/baeldung) – *Fri, 12 Sep 2025 17:57:25 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Spring Boot 4 & Spring Framework 7 – What’s New","link":"https://feeds.feedblitz.com/~/924700613/0/baeldung","date":"Fri, 12 Sep 2025 01:33:31 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Spring Boot 4 & Spring Framework 7 – What’s New](https://feeds.feedblitz.com/~/924700613/0/baeldung) – *Fri, 12 Sep 2025 01:33:31 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"PartitionKey in Hibernate: A Practical Guide for Spring Boot","link":"https://feeds.feedblitz.com/~/924700616/0/baeldung","date":"Fri, 12 Sep 2025 01:28:46 +0000","tags":["java","angular","spring","backend","frontend"]}'>[PartitionKey in Hibernate: A Practical Guide for Spring Boot](https://feeds.feedblitz.com/~/924700616/0/baeldung) – *Fri, 12 Sep 2025 01:28:46 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 611","link":"https://feeds.feedblitz.com/~/924674183/0/baeldung","date":"Thu, 11 Sep 2025 14:26:06 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 611](https://feeds.feedblitz.com/~/924674183/0/baeldung) – *Thu, 11 Sep 2025 14:26:06 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Handling “non-value” doubles in Java","link":"https://feeds.feedblitz.com/~/924635042/0/baeldung","date":"Wed, 10 Sep 2025 16:23:29 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Handling “non-value” doubles in Java](https://feeds.feedblitz.com/~/924635042/0/baeldung) – *Wed, 10 Sep 2025 16:23:29 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Read StringBuilder Line by Line in Java","link":"https://feeds.feedblitz.com/~/924561593/0/baeldung","date":"Tue, 09 Sep 2025 05:31:42 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Read StringBuilder Line by Line in Java](https://feeds.feedblitz.com/~/924561593/0/baeldung) – *Tue, 09 Sep 2025 05:31:42 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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