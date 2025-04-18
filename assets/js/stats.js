document.addEventListener("DOMContentLoaded", () => {
  const files = [
    { id: "auto_tests.md", label: "🧪 Librairies de test" },
    { id: "auto_ui.md", label: "🎨 Librairies UI" },
    { id: "auto_paradigmes.md", label: "🧠 Paradigmes" },
    { id: "auto_stack.md", label: "🌐 Stack Java / Angular" }
  ];

  const baseUrl = window.location.origin + window.location.pathname.replace(/\/$/, "/");

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.innerHTML = `
    <thead>
      <tr>
        <th style="border: 1px solid #ccc; padding: 8px;">Catégorie</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Nombre d’articles</th>
      </tr>
    </thead>
    <tbody id="stats-body"></tbody>
    <tfoot>
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px;"><strong>🧮 Total</strong></td>
        <td style="border: 1px solid #ccc; padding: 8px;" id="total-count">0</td>
      </tr>
    </tfoot>
  `;

  document.getElementById("dashboard-stats")?.appendChild(table);

  let total = 0;

  files.forEach(file => {
    fetch(baseUrl + file.id)
      .then(res => res.text())
      .then(text => {
        const count = (text.match(/^- \[.*\]\(.*\)/gm) || []).length;
        total += count;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td style="border: 1px solid #ccc; padding: 8px;">${file.label}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${count}</td>
        `;
        document.getElementById("stats-body")?.appendChild(row);
        document.getElementById("total-count").textContent = total;
      })
      .catch(() => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td style="border: 1px solid #ccc; padding: 8px;">${file.label}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">⚠️</td>
        `;
        document.getElementById("stats-body")?.appendChild(row);
      });
  });
});
