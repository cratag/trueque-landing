function createSpinner() {
  return `
    <div class="centerfy">
      <div class="spiner"></div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  const spinnerContainers = document.querySelectorAll("[data-spinner]");

  spinnerContainers.forEach(function (container) {
    container.innerHTML = createSpinner();
  });
});
