(function () {
  "use strict";

  const navToggle = document.querySelector("[data-nav-toggle]");
  const navigation = document.querySelector("[data-nav]");

  function closeNavigation() {
    if (!navToggle || !navigation) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Otvoriť navigáciu");
    navigation.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }

  if (navToggle && navigation) {
    navToggle.addEventListener("click", function () {
      const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(willOpen));
      navToggle.setAttribute("aria-label", willOpen ? "Zavrieť navigáciu" : "Otvoriť navigáciu");
      navigation.classList.toggle("is-open", willOpen);
      document.body.classList.toggle("nav-open", willOpen);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNavigation();
        navToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) closeNavigation();
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const requiredFields = ["name", "email", "message"];

  function setFieldError(field, message) {
    const error = form.querySelector('[data-error-for="' + field.name + '"]');
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  }

  function validateField(field) {
    const value = field.value.trim();
    let message = "";
    if (!value) message = "Vyplňte toto pole.";
    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = "Zadajte platnú e-mailovú adresu.";
    }
    setFieldError(field, message);
    return !message;
  }

  requiredFields.forEach(function (name) {
    const field = form.elements[name];
    field.addEventListener("blur", function () { validateField(field); });
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const invalid = requiredFields.map(function (name) { return form.elements[name]; }).filter(function (field) { return !validateField(field); });

    if (invalid.length) {
      status.textContent = "Skontrolujte označené polia.";
      invalid[0].focus();
      return;
    }

    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim() || "neuvedené";
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent("Správa z webu B-DENTA – " + name);
    const body = encodeURIComponent("Meno: " + name + "\nTelefón: " + phone + "\nE-mail: " + email + "\n\nSpráva:\n" + message);

    status.textContent = "Otváram e-mailovú aplikáciu…";
    window.location.href = "mailto:bdentasro@gmail.com?subject=" + subject + "&body=" + body;
  });
})();
