const Parser = require("rss-parser");
const fs = require("fs");
const parser = new Parser();

const feeds = [
  {
    name: "Librairies de test",
    file: "auto_tests.md",
    permalink: "/auto_tests/",
    rss: "https://feeds.feedburner.com/SoftwareTestingHelp" // RSS de test généraliste
  },
  {
    name: "Librairies UI",
    file: "auto_ui.md",
    permalink: "/auto_ui/",
    rss: "https://blog.angular.io/feed.xml"
  },
  {
    name: "Paradigmes de programmation",
    file: "auto_paradigmes.md",
    permalink: "/auto_paradigmes/",
    rss: "https://www.geeksforgeeks.org/feed/"
  },
  {
    name: "Stack Java / Angular",
    file: "auto_stack.md",
    permalink: "/auto_stack/",
    rss: "https://feeds.feedburner.com/Baeldung"
  }
];

(async () => {
  for (const feed of feeds) {
    try {
      const data = await parser.parseURL(feed.rss);
      let content = `---\ntitle: "Veille auto : ${feed.name}"\nlayout: page\npermalink: ${feed.permalink}\n---\n\n# 📰 Veille automatique – ${feed.name}\n\n`;

      data.items.slice(0, 5).forEach(item => {
        content += `- [${item.title}](${item.link}) – *${item.pubDate}*\n`;
      });

      fs.writeFileSync(feed.file, content);
    } catch (error) {
      console.error(`Erreur lors de la récupération du flux ${feed.name} :`, error.message);
    }
  }
})();
