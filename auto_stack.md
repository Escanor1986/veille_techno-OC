---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 26 octobre 2026*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"Safeguarding LLM Output in Spring AI","link":"https://feeds.feedblitz.com/~/971759387/0/baeldung","date":"Sun, 18 Oct 2026 17:55:03 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Safeguarding LLM Output in Spring AI](https://feeds.feedblitz.com/~/971759387/0/baeldung) – *Sun, 18 Oct 2026 17:55:03 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 668","link":"https://feeds.feedblitz.com/~/971746664/0/baeldung","date":"Sun, 18 Oct 2026 07:13:23 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 668](https://feeds.feedblitz.com/~/971746664/0/baeldung) – *Sun, 18 Oct 2026 07:13:23 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Building Graph-Based Workflows With Spring AI Alibaba","link":"https://feeds.feedblitz.com/~/971204387/0/baeldung","date":"Sat, 10 Oct 2026 01:04:27 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Building Graph-Based Workflows With Spring AI Alibaba](https://feeds.feedblitz.com/~/971204387/0/baeldung) – *Sat, 10 Oct 2026 01:04:27 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 667","link":"https://feeds.feedblitz.com/~/971192846/0/baeldung","date":"Fri, 09 Oct 2026 15:26:39 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 667](https://feeds.feedblitz.com/~/971192846/0/baeldung) – *Fri, 09 Oct 2026 15:26:39 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Documenting Form Parameters With Spring REST Docs","link":"https://feeds.feedblitz.com/~/971064149/0/baeldung","date":"Tue, 06 Oct 2026 15:29:15 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Documenting Form Parameters With Spring REST Docs](https://feeds.feedblitz.com/~/971064149/0/baeldung) – *Tue, 06 Oct 2026 15:29:15 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 666","link":"https://feeds.feedblitz.com/~/970894736/0/baeldung","date":"Fri, 02 Oct 2026 12:07:00 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 666](https://feeds.feedblitz.com/~/970894736/0/baeldung) – *Fri, 02 Oct 2026 12:07:00 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"New Features in Java 27","link":"https://feeds.feedblitz.com/~/970740575/0/baeldung","date":"Tue, 29 Sep 2026 06:55:30 +0000","tags":["java","angular","spring","backend","frontend"]}'>[New Features in Java 27](https://feeds.feedblitz.com/~/970740575/0/baeldung) – *Tue, 29 Sep 2026 06:55:30 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 665","link":"https://feeds.feedblitz.com/~/970561523/0/baeldung","date":"Sun, 27 Sep 2026 13:04:27 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 665](https://feeds.feedblitz.com/~/970561523/0/baeldung) – *Sun, 27 Sep 2026 13:04:27 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"The @Find Annotation in Hibernate","link":"https://feeds.feedblitz.com/~/970277321/0/baeldung","date":"Sat, 26 Sep 2026 04:20:54 +0000","tags":["java","angular","spring","backend","frontend"]}'>[The @Find Annotation in Hibernate](https://feeds.feedblitz.com/~/970277321/0/baeldung) – *Sat, 26 Sep 2026 04:20:54 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Performance Improvements in JDK 26","link":"https://feeds.feedblitz.com/~/970060151/0/baeldung","date":"Fri, 25 Sep 2026 05:21:31 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Performance Improvements in JDK 26](https://feeds.feedblitz.com/~/970060151/0/baeldung) – *Fri, 25 Sep 2026 05:21:31 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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