---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 29 juin 2026*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"Spring AI’s Dynamic Tool Discovery","link":"https://feeds.feedblitz.com/~/958677014/0/baeldung","date":"Mon, 29 Jun 2026 02:50:03 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Spring AI’s Dynamic Tool Discovery](https://feeds.feedblitz.com/~/958677014/0/baeldung) – *Mon, 29 Jun 2026 02:50:03 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"New Features in Java 26","link":"https://feeds.feedblitz.com/~/958677017/0/baeldung","date":"Mon, 29 Jun 2026 02:46:15 +0000","tags":["java","angular","spring","backend","frontend"]}'>[New Features in Java 26](https://feeds.feedblitz.com/~/958677017/0/baeldung) – *Mon, 29 Jun 2026 02:46:15 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"A Guide to Apache Paimon Java API","link":"https://feeds.feedblitz.com/~/958675751/0/baeldung","date":"Mon, 29 Jun 2026 02:37:29 +0000","tags":["java","angular","spring","backend","frontend"]}'>[A Guide to Apache Paimon Java API](https://feeds.feedblitz.com/~/958675751/0/baeldung) – *Mon, 29 Jun 2026 02:37:29 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Understanding and Avoiding CommitFailedException in Kafka","link":"https://feeds.feedblitz.com/~/958534139/0/baeldung","date":"Sat, 27 Jun 2026 18:53:49 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Understanding and Avoiding CommitFailedException in Kafka](https://feeds.feedblitz.com/~/958534139/0/baeldung) – *Sat, 27 Jun 2026 18:53:49 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Regular Expression Support in HQL","link":"https://feeds.feedblitz.com/~/958534142/0/baeldung","date":"Sat, 27 Jun 2026 18:48:47 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Regular Expression Support in HQL](https://feeds.feedblitz.com/~/958534142/0/baeldung) – *Sat, 27 Jun 2026 18:48:47 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Bean Background Initialization in Spring Framework","link":"https://feeds.feedblitz.com/~/958532825/0/baeldung","date":"Sat, 27 Jun 2026 18:42:09 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Bean Background Initialization in Spring Framework](https://feeds.feedblitz.com/~/958532825/0/baeldung) – *Sat, 27 Jun 2026 18:42:09 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Authorization using jCasbin","link":"https://feeds.feedblitz.com/~/958532828/0/baeldung","date":"Sat, 27 Jun 2026 18:36:54 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Authorization using jCasbin](https://feeds.feedblitz.com/~/958532828/0/baeldung) – *Sat, 27 Jun 2026 18:36:54 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Guide to @EmbeddedTable in Hibernate","link":"https://feeds.feedblitz.com/~/958532831/0/baeldung","date":"Sat, 27 Jun 2026 18:33:15 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Guide to @EmbeddedTable in Hibernate](https://feeds.feedblitz.com/~/958532831/0/baeldung) – *Sat, 27 Jun 2026 18:33:15 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 652","link":"https://feeds.feedblitz.com/~/958459364/0/baeldung","date":"Fri, 26 Jun 2026 12:57:04 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 652](https://feeds.feedblitz.com/~/958459364/0/baeldung) – *Fri, 26 Jun 2026 12:57:04 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"A Guide to Agent Skills in Spring AI","link":"https://feeds.feedblitz.com/~/958380014/0/baeldung","date":"Wed, 24 Jun 2026 10:26:06 +0000","tags":["java","angular","spring","backend","frontend"]}'>[A Guide to Agent Skills in Spring AI](https://feeds.feedblitz.com/~/958380014/0/baeldung) – *Wed, 24 Jun 2026 10:26:06 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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