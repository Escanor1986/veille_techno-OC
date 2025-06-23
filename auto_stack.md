---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 23 juin 2025*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"Faking OAuth2 Single Sign-on in Spring","link":"https://feeds.feedblitz.com/~/920614367/0/baeldung","date":"Mon, 23 Jun 2025 07:04:15 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Faking OAuth2 Single Sign-on in Spring](https://feeds.feedblitz.com/~/920614367/0/baeldung) – *Mon, 23 Jun 2025 07:04:15 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Building Open API Documentation Using YML File in Resources Folder","link":"https://feeds.feedblitz.com/~/920537708/0/baeldung","date":"Sat, 21 Jun 2025 10:37:50 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Building Open API Documentation Using YML File in Resources Folder](https://feeds.feedblitz.com/~/920537708/0/baeldung) – *Sat, 21 Jun 2025 10:37:50 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Introduction to Ambassador Design Pattern","link":"https://feeds.feedblitz.com/~/920537711/0/baeldung","date":"Sat, 21 Jun 2025 10:28:56 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Introduction to Ambassador Design Pattern](https://feeds.feedblitz.com/~/920537711/0/baeldung) – *Sat, 21 Jun 2025 10:28:56 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"HashMap Implementation to Count the Occurrences of Each Character in Java","link":"https://feeds.feedblitz.com/~/920511305/0/baeldung","date":"Fri, 20 Jun 2025 18:19:51 +0000","tags":["java","angular","spring","backend","frontend"]}'>[HashMap Implementation to Count the Occurrences of Each Character in Java](https://feeds.feedblitz.com/~/920511305/0/baeldung) – *Fri, 20 Jun 2025 18:19:51 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Text-to-SQL Implementation Using Spring AI","link":"https://feeds.feedblitz.com/~/920511308/0/baeldung","date":"Fri, 20 Jun 2025 18:15:26 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Text-to-SQL Implementation Using Spring AI](https://feeds.feedblitz.com/~/920511308/0/baeldung) – *Fri, 20 Jun 2025 18:15:26 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 599","link":"https://feeds.feedblitz.com/~/920492891/0/baeldung","date":"Fri, 20 Jun 2025 10:57:21 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 599](https://feeds.feedblitz.com/~/920492891/0/baeldung) – *Fri, 20 Jun 2025 10:57:21 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Implementing Unions in Hibernate","link":"https://feeds.feedblitz.com/~/920359853/0/baeldung","date":"Tue, 17 Jun 2025 17:31:41 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Implementing Unions in Hibernate](https://feeds.feedblitz.com/~/920359853/0/baeldung) – *Tue, 17 Jun 2025 17:31:41 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Transactional Messaging for Microservices Using Eventuate Tram","link":"https://feeds.feedblitz.com/~/920173283/0/baeldung","date":"Fri, 13 Jun 2025 14:49:00 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Transactional Messaging for Microservices Using Eventuate Tram](https://feeds.feedblitz.com/~/920173283/0/baeldung) – *Fri, 13 Jun 2025 14:49:00 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"How to Resolve “Could Not Autowire org.springframework.mail.javamail.JavaMailSender”","link":"https://feeds.feedblitz.com/~/920173286/0/baeldung","date":"Fri, 13 Jun 2025 14:44:39 +0000","tags":["java","angular","spring","backend","frontend"]}'>[How to Resolve “Could Not Autowire org.springframework.mail.javamail.JavaMailSender”](https://feeds.feedblitz.com/~/920173286/0/baeldung) – *Fri, 13 Jun 2025 14:44:39 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 598","link":"https://feeds.feedblitz.com/~/920129993/0/baeldung","date":"Thu, 12 Jun 2025 16:03:58 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 598](https://feeds.feedblitz.com/~/920129993/0/baeldung) – *Thu, 12 Jun 2025 16:03:58 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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