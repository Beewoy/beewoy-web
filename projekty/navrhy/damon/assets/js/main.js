(() => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  const menuLabel = menuToggle?.querySelector(".sr-only");

  const closeMenu = (returnFocus = false) => {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (menuLabel) menuLabel.textContent = "Otvoriť hlavné menu";
    if (returnFocus) menuToggle.focus();
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
      if (menuLabel) menuLabel.textContent = isOpen ? "Otvoriť hlavné menu" : "Zavrieť hlavné menu";
      if (!isOpen) navigation.querySelector("a")?.focus();
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("is-open")) closeMenu(true);
    });

    window.matchMedia("(min-width: 64rem)").addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const galleryDialog = document.querySelector("#gallery-dialog");
  const galleryDialogImage = galleryDialog?.querySelector("img");
  const galleryDialogCaption = galleryDialog?.querySelector("p");
  const galleryClose = galleryDialog?.querySelector("[data-gallery-close]");

  document.querySelectorAll("[data-gallery-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const source = button.dataset.galleryImage;
      const caption = button.dataset.galleryCaption || "Fotografia interiéru DAMON";

      if (!galleryDialog || !galleryDialogImage || typeof galleryDialog.showModal !== "function") {
        window.open(source, "_blank", "noopener");
        return;
      }

      galleryDialogImage.src = source;
      galleryDialogImage.alt = caption;
      if (galleryDialogCaption) galleryDialogCaption.textContent = caption;
      galleryDialog.showModal();
      galleryClose?.focus();
    });
  });

  galleryClose?.addEventListener("click", () => galleryDialog?.close());

  galleryDialog?.addEventListener("click", (event) => {
    if (event.target === galleryDialog) galleryDialog.close();
  });

  const form = document.querySelector("#inquiry-form");
  const formStatus = document.querySelector("#form-status");

  if (form) {
    const fields = [
      {
        input: form.elements.name,
        error: document.querySelector("#name-error"),
        message: "Uveďte, prosím, svoje meno (aspoň 2 znaky)."
      },
      {
        input: form.elements.contact,
        error: document.querySelector("#contact-error"),
        message: "Uveďte, prosím, telefónne číslo (aspoň 6 znakov)."
      },
      {
        input: form.elements.message,
        error: document.querySelector("#message-error"),
        message: "Stručne opíšte, čo potrebujete vyriešiť (aspoň 10 znakov)."
      },
      {
        input: form.elements.privacy,
        error: document.querySelector("#privacy-error"),
        message: "Na pokračovanie je potrebný súhlas so spracovaním údajov."
      }
    ];

    const isFieldValid = (field) => {
      const { input } = field;
      if (input.type === "checkbox") return input.checked;
      return input.value.trim().length >= Number(input.getAttribute("minlength") || 1);
    };

    const validateField = (field) => {
      const valid = isFieldValid(field);
      field.input.setAttribute("aria-invalid", String(!valid));
      if (field.error) field.error.textContent = valid ? "" : field.message;
      return valid;
    };

    fields.forEach((field) => {
      field.input.addEventListener("blur", () => validateField(field));
      field.input.addEventListener(field.input.type === "checkbox" ? "change" : "input", () => {
        if (field.input.getAttribute("aria-invalid") === "true") validateField(field);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (formStatus) {
        formStatus.classList.remove("is-visible");
        formStatus.textContent = "";
      }

      const invalidField = fields.find((field) => !validateField(field));
      if (invalidField) {
        invalidField.input.focus();
        return;
      }

      const subject = encodeURIComponent("Dopyt z nového webu DAMON");
      const body = encodeURIComponent(
        `Meno: ${form.elements.name.value.trim()}\nTelefón: ${form.elements.contact.value.trim()}\n\nDopyt:\n${form.elements.message.value.trim()}`
      );

      if (formStatus) {
        formStatus.append("Dopyt je skontrolovaný. V tejto ukážkovej verzii sa automaticky neodosiela. ");
        const mailLink = document.createElement("a");
        mailLink.href = `mailto:damon@damon.sk?subject=${subject}&body=${body}`;
        mailLink.textContent = "Otvoriť pripravený e-mail";
        formStatus.append(mailLink);
        formStatus.classList.add("is-visible");
        formStatus.focus?.();
      }
    });
  }
})();
