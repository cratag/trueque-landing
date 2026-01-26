document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("delete-form");
  const msg = document.getElementById("msg");

  if (!form || !msg) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const phone = form.phone.value.trim();
    const company = form.company.value;

    if (company) {
      return;
    }

    if (!phone) {
      msg.textContent = "Por favor, ingresa un número de teléfono válido.";
      msg.className = "form-message error";
      return;
    }

    msg.textContent = "Enviando solicitud...";
    msg.className = "form-message";

    fetch("https://api.trocar.app/api/v1/account-deletion-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
      }),
    })
      .then((response) => {
        if (response.ok) {
          msg.textContent =
            "Solicitud enviada. Nos pondremos en contacto contigo a la brevedad.";
          msg.className = "form-message success";
          form.reset();
        } else {
          msg.textContent =
            "No se pudo enviar la solicitud. Por favor, intenta nuevamente.";
          msg.className = "form-message error";
        }
      })
      .catch(() => {
        msg.textContent =
          "Error al enviar la solicitud. Por favor, intenta nuevamente.";
        msg.className = "form-message error";
      });
  });
});
