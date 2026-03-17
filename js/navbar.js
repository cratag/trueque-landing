function createNavbar() {
  return `
    <a href="index.html" class="navbar-brand">
      <div class="navbar-logo" data-logo data-color="var(--color-neutral-white)"></div>
    </a>
    <div class="navbar-menu">
      <div class="dropdown">
        <button class="dropdown-toggle">Legales</button>
        <div class="dropdown-menu">
          <a href="legal_notice.html">Aviso Legal</a>
          <a href="privacy_policy.html">Política de Privacidad</a>
          <a href="terms_and_conditions.html">Términos y Condiciones</a>
        </div>
      </div>
    </div>
  `;
}

function initNavbar() {
  const navbarContainers = document.querySelectorAll("[data-navbar]");

  navbarContainers.forEach(function (container) {
    container.innerHTML = createNavbar();

    // Initialize logos inside the navbar
    const logoContainers = container.querySelectorAll("[data-logo]");
    logoContainers.forEach(function (logoContainer) {
      const color =
        logoContainer.getAttribute("data-color") || "var(--color-background)";
      if (typeof createLogo === "function") {
        logoContainer.innerHTML = createLogo(color);
      }
    });
  });

  // Dropdown functionality
  const dropdown = document.querySelector(".dropdown");
  const dropdownToggle = document.querySelector(".dropdown-toggle");

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initNavbar);
