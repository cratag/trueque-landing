function loadLegal(endpoint) {
  fetch(endpoint)
    .then((r) => r.json())
    .then((data) => {
      let html = "";

      if (data.last_updated_at) {
        html += `<p style="color: var(--color-neutral-white);"><strong>Última actualización:</strong> ${new Date(data.last_updated_at).toLocaleDateString()}</p>`;
      }

      for (const title in data.content) {
        html += `<h2>${title}</h2>`;
        html += data.content[title];
      }

      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = html;
      contentDiv.classList.remove("loading");
    })
    .catch(() => {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = "No se ha podido cargar el documento.";
      contentDiv.classList.remove("loading");
    });
}
