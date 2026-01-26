---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 26 janvier 2026*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"Accessing Files Using Java With Samba JCIFS","link":"https://feeds.feedblitz.com/~/942295823/0/baeldung","date":"Mon, 26 Jan 2026 01:21:43 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Accessing Files Using Java With Samba JCIFS](https://feeds.feedblitz.com/~/942295823/0/baeldung) – *Mon, 26 Jan 2026 01:21:43 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Proxy Authentication in Java","link":"https://feeds.feedblitz.com/~/942289682/0/baeldung","date":"Mon, 26 Jan 2026 01:17:18 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Proxy Authentication in Java](https://feeds.feedblitz.com/~/942289682/0/baeldung) – *Mon, 26 Jan 2026 01:17:18 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"How to Execute Tests Selectively in TestNG","link":"https://feeds.feedblitz.com/~/942289685/0/baeldung","date":"Mon, 26 Jan 2026 01:13:09 +0000","tags":["java","angular","spring","backend","frontend"]}'>[How to Execute Tests Selectively in TestNG](https://feeds.feedblitz.com/~/942289685/0/baeldung) – *Mon, 26 Jan 2026 01:13:09 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Disable Formatting in Eclipse","link":"https://feeds.feedblitz.com/~/942289688/0/baeldung","date":"Mon, 26 Jan 2026 01:07:30 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Disable Formatting in Eclipse](https://feeds.feedblitz.com/~/942289688/0/baeldung) – *Mon, 26 Jan 2026 01:07:30 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Effect of Idempotence on the Performance of a Kafka Producer","link":"https://feeds.feedblitz.com/~/942289691/0/baeldung","date":"Mon, 26 Jan 2026 01:01:46 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Effect of Idempotence on the Performance of a Kafka Producer](https://feeds.feedblitz.com/~/942289691/0/baeldung) – *Mon, 26 Jan 2026 01:01:46 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Getting Started with Compile-Time Templates With Spring","link":"https://feeds.feedblitz.com/~/941819891/0/baeldung","date":"Sat, 24 Jan 2026 02:32:57 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Getting Started with Compile-Time Templates With Spring](https://feeds.feedblitz.com/~/941819891/0/baeldung) – *Sat, 24 Jan 2026 02:32:57 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Implement the FizzBuzz Puzzle in Java","link":"https://feeds.feedblitz.com/~/941807804/0/baeldung","date":"Sat, 24 Jan 2026 02:24:07 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Implement the FizzBuzz Puzzle in Java](https://feeds.feedblitz.com/~/941807804/0/baeldung) – *Sat, 24 Jan 2026 02:24:07 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 630","link":"https://feeds.feedblitz.com/~/941359436/0/baeldung","date":"Thu, 22 Jan 2026 09:44:10 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 630](https://feeds.feedblitz.com/~/941359436/0/baeldung) – *Thu, 22 Jan 2026 09:44:10 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Mapping to String in Mapstruct","link":"https://feeds.feedblitz.com/~/941355719/0/baeldung","date":"Thu, 22 Jan 2026 06:52:46 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Mapping to String in Mapstruct](https://feeds.feedblitz.com/~/941355719/0/baeldung) – *Thu, 22 Jan 2026 06:52:46 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Rename Existing Field With Elasticsearch Mapping","link":"https://feeds.feedblitz.com/~/941355722/0/baeldung","date":"Thu, 22 Jan 2026 06:47:59 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Rename Existing Field With Elasticsearch Mapping](https://feeds.feedblitz.com/~/941355722/0/baeldung) – *Thu, 22 Jan 2026 06:47:59 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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