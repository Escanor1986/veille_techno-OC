---
title: "Veille auto : Librairies de test"
layout: page
permalink: /auto_tests/
---

# <span>🧪</span> Veille automatique – Librairies de test

🕒 *Dernière mise à jour : lundi 21 avril 2025*

<div class="search-container">
  <input type="text" id="article-search" placeholder="Rechercher un article..." onkeyup="filterArticles()">
  <div class="tag-filters" id="tag-filters">
    <!-- Les filtres par tag seront générés dynamiquement -->
  </div>
</div>

- [How To Be a Good Team Mentor, Coach and a True Team-Defender in an Agile Testing World?](https://www.softwaretestinghelp.com/how-to-be-a-good-team-mentor-coach-and-a-true-team-defender-in-an-agile-testing-world-the-inspiration/) – *Mon, 30 Jan 2023 16:55:25 +0000* `#test` `#qa` `#automation` `#Agile Testing` `#Career in Software Testing`
- [How to Implement Efficient Test Automation in the Agile World](https://www.softwaretestinghelp.com/automation-in-agile-world/) – *Sat, 24 Dec 2022 23:33:28 +0000* `#test` `#qa` `#automation` `#Agile Testing` `#Automation Testing`
- [Some Tricky Manual Testing Questions & Answers](https://www.softwaretestinghelp.com/some-tricky-question-answers/) – *Sun, 11 Dec 2022 09:05:00 +0000* `#test` `#qa` `#automation` `#Interview Questions`
- [Continuous Integration Process: How to Improve Software Quality and Reduce Risk](https://www.softwaretestinghelp.com/continuous-integration/) – *Sun, 04 Dec 2022 12:47:21 +0000* `#test` `#qa` `#automation` `#Agile Testing` `#Testing Best Practices`
- [How to Make Agile Estimation Process Easy With Planning Poker](https://www.softwaretestinghelp.com/planning-poker-scrum-poker-cards-agile-estimation/) – *Tue, 29 Nov 2022 04:54:35 +0000* `#test` `#qa` `#automation` `#Agile Testing`
- [Role of Business Analysts in SCRUM and Why is a QA Best for this Role?](https://www.softwaretestinghelp.com/role-of-business-analysts-in-scrum/) – *Sun, 27 Nov 2022 04:24:13 +0000* `#test` `#qa` `#automation` `#Testing Methodologies` `#Agile Testing`

<script>
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

document.addEventListener('DOMContentLoaded', function() {
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
});
</script>
