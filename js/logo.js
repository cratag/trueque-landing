/**
 * Logo component - Returns the Trocar logo SVG as HTML string
 * @param {string} color - Optional color for the logo (default: var(--color-background))
 * @returns {string} SVG HTML string
 *
 * Usage: <div data-logo></div> or <div data-logo data-color="#ffffff"></div>
 */
function createLogo(color = "var(--color-background)") {
  return `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve" class="logo-svg">
      <g>
        <g>
          <path fill="${color}" d="M194.74,40.43c-8.09-6.37-16.23-12.66-24.38-18.95c-4.89-3.78-9.77-7.56-14.74-11.23
            c-2.6-1.92-5.54-2.46-8.53-0.92c-2.84,1.46-3.5,4.1-3.44,7.07c0.05,2.51,0.01,5.02,0.01,8.04c-1.7,0-2.99,0-4.28,0
            c-34.89,0-69.78-0.01-104.67,0c-1.57,0-3.17-0.03-4.71,0.22c-5.13,0.84-8.56,4.13-8.67,8.76c-0.17,7.02-0.03,14.05,0.01,21.07
            c0.02,3.56,1.98,6.06,5.04,7.33c2.39,0.99,5.11,1.61,7.7,1.65c11.99,0.17,23.99,0.08,35.98,0.1c7.87,0.01,10.95,3.1,10.96,11.04
            c0.01,8.44,0.01,33.95,0.01,56.04c-6.25,0-12.49,0-18.74,0c-1.44,0-2.87,0-4.91,0c0-3.62,0.09-6.75-0.03-9.88
            c-0.12-3.14-0.95-6.11-4.05-7.59c-3.1-1.49-6.11-0.89-8.84,1.17c-0.58,0.44-1.14,0.89-1.72,1.34
            c-12.12,9.46-24.22,18.95-36.37,28.37c-6.4,4.96-6.57,9.71-0.28,14.72c12.6,10.03,25.26,19.99,37.86,30.02
            c2.83,2.25,5.84,3.65,9.36,2.13c3.72-1.6,4.1-5.05,4.09-8.57c-0.01-3.94,0-7.89,0-12.03c1.66,0,2.73,0,3.81,0
            c21.57,0,90.64,0.02,103.61-0.01c8.46-0.02,12.26-3.79,12.31-12.08c0.03-4.73,0.02-9.45,0.03-14.18
            c0.01-9.45-3.94-13.4-13.44-13.4c-15.55,0-31.1,0-46.65,0c0-22.73,0-49.11,0.02-58.14c0.01-4.92,2.59-8.42,7.36-8.75
            c6.23-0.43,12.51-0.11,19.24-0.11c0,5.51-0.06,10.69,0.02,15.86c0.06,3.81,1.91,6.48,5,6.4c2.37-0.06,5.15-0.73,6.98-2.13
            c13.16-10.08,26.17-20.37,39.14-30.69C199.81,49.13,199.73,44.36,194.74,40.43z" />
        </g>
      </g>
    </svg>
  `;
}

// Initialize logos on page load
document.addEventListener("DOMContentLoaded", function () {
  const logoContainers = document.querySelectorAll("[data-logo]");

  logoContainers.forEach(function (container) {
    const color =
      container.getAttribute("data-color") || "var(--color-background)";
    container.innerHTML = createLogo(color);
  });
});
