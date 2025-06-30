---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 30 juin 2025*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"New Features in Java 25","link":"https://feeds.feedblitz.com/~/920832566/0/baeldung","date":"Fri, 27 Jun 2025 13:11:46 +0000","tags":["java","angular","spring","backend","frontend"]}'>[New Features in Java 25](https://feeds.feedblitz.com/~/920832566/0/baeldung) – *Fri, 27 Jun 2025 13:11:46 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 600","link":"https://feeds.feedblitz.com/~/920803802/0/baeldung","date":"Thu, 26 Jun 2025 20:31:09 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 600](https://feeds.feedblitz.com/~/920803802/0/baeldung) – *Thu, 26 Jun 2025 20:31:09 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Hibernate ORM With Panache","link":"https://feeds.feedblitz.com/~/920734664/0/baeldung","date":"Wed, 25 Jun 2025 14:52:21 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Hibernate ORM With Panache](https://feeds.feedblitz.com/~/920734664/0/baeldung) – *Wed, 25 Jun 2025 14:52:21 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Introduction to DiceDB","link":"https://feeds.feedblitz.com/~/920673785/0/baeldung","date":"Tue, 24 Jun 2025 11:44:56 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Introduction to DiceDB](https://feeds.feedblitz.com/~/920673785/0/baeldung) – *Tue, 24 Jun 2025 11:44:56 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"One Reader with Multiple Processors and Writers in Spring Batch","link":"https://feeds.feedblitz.com/~/920673788/0/baeldung","date":"Tue, 24 Jun 2025 11:36:40 +0000","tags":["java","angular","spring","backend","frontend"]}'>[One Reader with Multiple Processors and Writers in Spring Batch](https://feeds.feedblitz.com/~/920673788/0/baeldung) – *Tue, 24 Jun 2025 11:36:40 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"How to Implement Retry for JUnit Tests","link":"https://feeds.feedblitz.com/~/920673074/0/baeldung","date":"Tue, 24 Jun 2025 11:28:46 +0000","tags":["java","angular","spring","backend","frontend"]}'>[How to Implement Retry for JUnit Tests](https://feeds.feedblitz.com/~/920673074/0/baeldung) – *Tue, 24 Jun 2025 11:28:46 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Cleaning Spring Properties Files","link":"https://feeds.feedblitz.com/~/920630711/0/baeldung","date":"Mon, 23 Jun 2025 14:39:34 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Cleaning Spring Properties Files](https://feeds.feedblitz.com/~/920630711/0/baeldung) – *Mon, 23 Jun 2025 14:39:34 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Using the Model Context Protocol With Quarkus and Langchain4j","link":"https://feeds.feedblitz.com/~/920621477/0/baeldung","date":"Mon, 23 Jun 2025 11:13:41 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Using the Model Context Protocol With Quarkus and Langchain4j](https://feeds.feedblitz.com/~/920621477/0/baeldung) – *Mon, 23 Jun 2025 11:13:41 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Faking OAuth2 Single Sign-on in Spring","link":"https://feeds.feedblitz.com/~/920614367/0/baeldung","date":"Mon, 23 Jun 2025 07:04:15 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Faking OAuth2 Single Sign-on in Spring](https://feeds.feedblitz.com/~/920614367/0/baeldung) – *Mon, 23 Jun 2025 07:04:15 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Building Open API Documentation Using YML File in Resources Folder","link":"https://feeds.feedblitz.com/~/920537708/0/baeldung","date":"Sat, 21 Jun 2025 10:37:50 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Building Open API Documentation Using YML File in Resources Folder](https://feeds.feedblitz.com/~/920537708/0/baeldung) – *Sat, 21 Jun 2025 10:37:50 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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