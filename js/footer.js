function createFooter() {
  return `
    <div class="footer-content">
      <p>&copy; 2026 Trocar. Todos los derechos reservados.</p>
      <div class="footer-links">
        <a href="legal_notice.html">Aviso Legal</a>
        <a href="privacy_policy.html">Política de Privacidad</a>
        <a href="terms_and_conditions.html">Términos y Condiciones</a>
      </div>
      <p class="footer-credit">
        Made by <a href="https://codercoaster.com/" target="_blank" rel="noopener noreferrer">Codercoaster</a>
      </p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  const footerContainers = document.querySelectorAll("[data-footer]");

  footerContainers.forEach(function (container) {
    container.innerHTML = createFooter();
  });
});
