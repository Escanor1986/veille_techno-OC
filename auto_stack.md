---
title: "Veille auto : Stack Java / Angular"
layout: page
permalink: /auto_stack/
---

# 🌐 Veille automatique – Stack Java / Angular

🕒 *Dernière mise à jour : lundi 27 juillet 2026*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"Application Startup Tracking in Spring","link":"https://feeds.feedblitz.com/~/963082187/0/baeldung","date":"Sat, 25 Jul 2026 19:15:03 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Application Startup Tracking in Spring](https://feeds.feedblitz.com/~/963082187/0/baeldung) – *Sat, 25 Jul 2026 19:15:03 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Introduction to Apache Causeway","link":"https://feeds.feedblitz.com/~/963082190/0/baeldung","date":"Sat, 25 Jul 2026 19:11:34 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Introduction to Apache Causeway](https://feeds.feedblitz.com/~/963082190/0/baeldung) – *Sat, 25 Jul 2026 19:11:34 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 656","link":"https://feeds.feedblitz.com/~/963067178/0/baeldung","date":"Sat, 25 Jul 2026 18:06:00 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 656](https://feeds.feedblitz.com/~/963067178/0/baeldung) – *Sat, 25 Jul 2026 18:06:00 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Generating Diagrams From Java Code","link":"https://feeds.feedblitz.com/~/962183936/0/baeldung","date":"Thu, 23 Jul 2026 15:40:59 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Generating Diagrams From Java Code](https://feeds.feedblitz.com/~/962183936/0/baeldung) – *Thu, 23 Jul 2026 15:40:59 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Integrating Local LLMs with Spring AI Using LM Studio","link":"https://feeds.feedblitz.com/~/961624313/0/baeldung","date":"Wed, 22 Jul 2026 11:24:54 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Integrating Local LLMs with Spring AI Using LM Studio](https://feeds.feedblitz.com/~/961624313/0/baeldung) – *Wed, 22 Jul 2026 11:24:54 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"How to Fix MySQL java.sql.SQLException: Incorrect string value","link":"https://feeds.feedblitz.com/~/961624316/0/baeldung","date":"Wed, 22 Jul 2026 11:19:39 +0000","tags":["java","angular","spring","backend","frontend"]}'>[How to Fix MySQL java.sql.SQLException: Incorrect string value](https://feeds.feedblitz.com/~/961624316/0/baeldung) – *Wed, 22 Jul 2026 11:19:39 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Selenium Webdriver submit() vs click()","link":"https://feeds.feedblitz.com/~/961067897/0/baeldung","date":"Mon, 20 Jul 2026 15:55:06 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Selenium Webdriver submit() vs click()](https://feeds.feedblitz.com/~/961067897/0/baeldung) – *Mon, 20 Jul 2026 15:55:06 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Java Weekly, Issue 655","link":"https://feeds.feedblitz.com/~/960937190/0/baeldung","date":"Sun, 19 Jul 2026 12:18:31 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Java Weekly, Issue 655](https://feeds.feedblitz.com/~/960937190/0/baeldung) – *Sun, 19 Jul 2026 12:18:31 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"Solving org.hibernate.AnnotationException: Illegal Attempt to Map a Non Collection","link":"https://feeds.feedblitz.com/~/960891746/0/baeldung","date":"Sun, 19 Jul 2026 01:30:22 +0000","tags":["java","angular","spring","backend","frontend"]}'>[Solving org.hibernate.AnnotationException: Illegal Attempt to Map a Non Collection](https://feeds.feedblitz.com/~/960891746/0/baeldung) – *Sun, 19 Jul 2026 01:30:22 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>
- <span data-article='{"title":"How Does a Java Program Get Its Own Process ID","link":"https://feeds.feedblitz.com/~/960370808/0/baeldung","date":"Tue, 14 Jul 2026 12:19:11 +0000","tags":["java","angular","spring","backend","frontend"]}'>[How Does a Java Program Get Its Own Process ID](https://feeds.feedblitz.com/~/960370808/0/baeldung) – *Tue, 14 Jul 2026 12:19:11 +0000* `#java` `#angular` `#spring` `#backend` `#frontend`</span>


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