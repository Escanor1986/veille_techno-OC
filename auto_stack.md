---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 26 mai 2025*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"Sanitize HTML Code to Prevent XSS Attacks","link":"https://feeds.feedblitz.com/~/918953579/0/baeldung","date":"Sun, 25 May 2025 16:15:39 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Sanitize HTML Code to Prevent XSS Attacks](https://feeds.feedblitz.com/~/918953579/0/baeldung) – *Sun, 25 May 2025 16:15:39 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Arguments Prefixes in the JVM","link":"https://feeds.feedblitz.com/~/918836051/0/baeldung","date":"Fri, 23 May 2025 17:09:50 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Arguments Prefixes in the JVM](https://feeds.feedblitz.com/~/918836051/0/baeldung) – *Fri, 23 May 2025 17:09:50 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"@Expose vs @SerializedName Annotations in Gson","link":"https://feeds.feedblitz.com/~/918836054/0/baeldung","date":"Fri, 23 May 2025 17:06:48 +0000","tags":["java","angular","spring","backend","frontend"]}'>[@Expose vs @SerializedName Annotations in Gson](https://feeds.feedblitz.com/~/918836054/0/baeldung) – *Fri, 23 May 2025 17:06:48 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Loading Test Data from Files in JUnit Tests with Java Test Gadgets Test Data Factory","link":"https://feeds.feedblitz.com/~/918794885/0/baeldung","date":"Fri, 23 May 2025 01:14:38 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Loading Test Data from Files in JUnit Tests with Java Test Gadgets Test Data Factory](https://feeds.feedblitz.com/~/918794885/0/baeldung) – *Fri, 23 May 2025 01:14:38 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 595","link":"https://feeds.feedblitz.com/~/918773114/0/baeldung","date":"Thu, 22 May 2025 17:32:08 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 595](https://feeds.feedblitz.com/~/918773114/0/baeldung) – *Thu, 22 May 2025 17:32:08 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Stream Gatherers in Java","link":"https://feeds.feedblitz.com/~/918610334/0/baeldung","date":"Tue, 20 May 2025 00:22:14 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Stream Gatherers in Java](https://feeds.feedblitz.com/~/918610334/0/baeldung) – *Tue, 20 May 2025 00:22:14 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"How to Check if a Number Is the Sum of Two or More Consecutive Integers","link":"https://feeds.feedblitz.com/~/918610337/0/baeldung","date":"Tue, 20 May 2025 00:18:35 +0000","tags":["java","angular","spring","backend","frontend"]}'>[How to Check if a Number Is the Sum of Two or More Consecutive Integers](https://feeds.feedblitz.com/~/918610337/0/baeldung) – *Tue, 20 May 2025 00:18:35 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Flexible Pub/Sub Messaging With Spring Boot and Dapr","link":"https://feeds.feedblitz.com/~/918572855/0/baeldung","date":"Mon, 19 May 2025 10:48:55 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Flexible Pub/Sub Messaging With Spring Boot and Dapr](https://feeds.feedblitz.com/~/918572855/0/baeldung) – *Mon, 19 May 2025 10:48:55 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Business Process Automation with Kogito","link":"https://feeds.feedblitz.com/~/918479039/0/baeldung","date":"Sat, 17 May 2025 14:28:23 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Business Process Automation with Kogito](https://feeds.feedblitz.com/~/918479039/0/baeldung) – *Sat, 17 May 2025 14:28:23 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Read a Gradle Defined Variable in Java","link":"https://feeds.feedblitz.com/~/918479042/0/baeldung","date":"Sat, 17 May 2025 14:22:44 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Read a Gradle Defined Variable in Java](https://feeds.feedblitz.com/~/918479042/0/baeldung) – *Sat, 17 May 2025 14:22:44 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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