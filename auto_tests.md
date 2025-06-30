---
title: "Veille auto : Librairies de test"
layout: page
permalink: /auto_tests/
---

# 🧪 Veille automatique – Librairies de test

🕒 *Dernière mise à jour : lundi 30 juin 2025*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article...">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- <span data-article='{"title":"How To Be a Good Team Mentor, Coach and a True Team-Defender in an Agile Testing World?","link":"https://www.softwaretestinghelp.com/how-to-be-a-good-team-mentor-coach-and-a-true-team-defender-in-an-agile-testing-world-the-inspiration/","date":"Mon, 30 Jan 2023 16:55:25 +0000","tags":["test","qa","automation","Agile Testing","Career in Software Testing"]}'>[How To Be a Good Team Mentor, Coach and a True Team-Defender in an Agile Testing World?](https://www.softwaretestinghelp.com/how-to-be-a-good-team-mentor-coach-and-a-true-team-defender-in-an-agile-testing-world-the-inspiration/) – *Mon, 30 Jan 2023 16:55:25 +0000* `#test` `#qa` `#automation` `#Agile Testing` `#Career in Software Testing`</span>
- <span data-article='{"title":"How to Implement Efficient Test Automation in the Agile World","link":"https://www.softwaretestinghelp.com/automation-in-agile-world/","date":"Sat, 24 Dec 2022 23:33:28 +0000","tags":["test","qa","automation","Agile Testing","Automation Testing"]}'>[How to Implement Efficient Test Automation in the Agile World](https://www.softwaretestinghelp.com/automation-in-agile-world/) – *Sat, 24 Dec 2022 23:33:28 +0000* `#test` `#qa` `#automation` `#Agile Testing` `#Automation Testing`</span>
- <span data-article='{"title":"Some Tricky Manual Testing Questions & Answers","link":"https://www.softwaretestinghelp.com/some-tricky-question-answers/","date":"Sun, 11 Dec 2022 09:05:00 +0000","tags":["test","qa","automation","Interview Questions"]}'>[Some Tricky Manual Testing Questions & Answers](https://www.softwaretestinghelp.com/some-tricky-question-answers/) – *Sun, 11 Dec 2022 09:05:00 +0000* `#test` `#qa` `#automation` `#Interview Questions`</span>
- <span data-article='{"title":"Continuous Integration Process: How to Improve Software Quality and Reduce Risk","link":"https://www.softwaretestinghelp.com/continuous-integration/","date":"Sun, 04 Dec 2022 12:47:21 +0000","tags":["test","qa","automation","Agile Testing","Testing Best Practices"]}'>[Continuous Integration Process: How to Improve Software Quality and Reduce Risk](https://www.softwaretestinghelp.com/continuous-integration/) – *Sun, 04 Dec 2022 12:47:21 +0000* `#test` `#qa` `#automation` `#Agile Testing` `#Testing Best Practices`</span>
- <span data-article='{"title":"How to Make Agile Estimation Process Easy With Planning Poker","link":"https://www.softwaretestinghelp.com/planning-poker-scrum-poker-cards-agile-estimation/","date":"Tue, 29 Nov 2022 04:54:35 +0000","tags":["test","qa","automation","Agile Testing"]}'>[How to Make Agile Estimation Process Easy With Planning Poker](https://www.softwaretestinghelp.com/planning-poker-scrum-poker-cards-agile-estimation/) – *Tue, 29 Nov 2022 04:54:35 +0000* `#test` `#qa` `#automation` `#Agile Testing`</span>
- <span data-article='{"title":"Role of Business Analysts in SCRUM and Why is a QA Best for this Role?","link":"https://www.softwaretestinghelp.com/role-of-business-analysts-in-scrum/","date":"Sun, 27 Nov 2022 04:24:13 +0000","tags":["test","qa","automation","Testing Methodologies","Agile Testing"]}'>[Role of Business Analysts in SCRUM and Why is a QA Best for this Role?](https://www.softwaretestinghelp.com/role-of-business-analysts-in-scrum/) – *Sun, 27 Nov 2022 04:24:13 +0000* `#test` `#qa` `#automation` `#Testing Methodologies` `#Agile Testing`</span>


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