(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menuLabel = document.querySelector("[data-menu-label]");
  const nav = document.querySelector("[data-nav]");
  const year = document.querySelector("[data-year]");
  const form = document.querySelector("[data-contact-form]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateHeader();
      scrollTicking = false;
    });
  }, { passive: true });

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (menuLabel) menuLabel.textContent = "Otvoriť menu";
    document.body.classList.remove("menu-open");
  };

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
      nav.classList.toggle("is-open", willOpen);
      menuButton.setAttribute("aria-expanded", String(willOpen));
      if (menuLabel) menuLabel.textContent = willOpen ? "Zavrieť menu" : "Otvoriť menu";
      document.body.classList.toggle("menu-open", willOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 780) closeMenu();
    });
  }

  if (!form) return;

  const requiredFields = [...form.querySelectorAll("[required]")];
  const status = form.querySelector("[data-form-status]");

  const showError = (field, message) => {
    field.setAttribute("aria-invalid", "true");
    const error = form.querySelector(`[data-error-for="${field.id}"]`);
    if (error) {
      error.textContent = message;
      field.setAttribute("aria-describedby", error.dataset.errorFor + "-error");
      error.id = error.dataset.errorFor + "-error";
    }
  };

  const clearError = (field) => {
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
    const error = form.querySelector(`[data-error-for="${field.id}"]`);
    if (error) error.textContent = "";
  };

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      if (field.value.trim()) clearError(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let firstInvalid = null;

    requiredFields.forEach((field) => {
      clearError(field);
      if (!field.value.trim()) {
        showError(field, "Vyplňte, prosím, toto pole.");
        firstInvalid ??= field;
      }
    });

    if (firstInvalid) {
      if (status) status.textContent = "Skontrolujte označené povinné polia.";
      firstInvalid.focus();
      return;
    }

    if (status) {
      status.textContent = "Formulár je pripravený správne. V tejto statickej ukážke sa údaje neodosielajú; na reálnom webe treba pripojiť formulárovú službu alebo backend.";
      status.focus?.();
    }
  });
})();
