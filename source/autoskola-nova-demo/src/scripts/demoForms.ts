function showError(
  field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  message: string,
) {
  field.setAttribute("aria-invalid", message ? "true" : "false");
  const error = field
    .closest("form")
    ?.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
  if (error) {
    error.id ||= `${field.id}-error`;
    error.textContent = message;
    if (message) field.setAttribute("aria-describedby", error.id);
    else field.removeAttribute("aria-describedby");
  }
}

function messageFor(
  field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
) {
  if (field.validity.valueMissing) return "Vyplň toto pole.";
  if (field.validity.typeMismatch) return "Zadaj platný e-mail.";
  if (field.validity.tooShort && "minLength" in field)
    return `Zadaj aspoň ${field.minLength} znaky.`;
  if (field.validity.patternMismatch) return "Zadaj platné telefónne číslo.";
  return "";
}

document
  .querySelectorAll<HTMLFormElement>("[data-demo-form]")
  .forEach((form) => {
    const course = form.querySelector<HTMLSelectElement>('[name="course"]');
    const term = form.querySelector<HTMLSelectElement>('[name="term"]');
    const gearbox = form.querySelector<HTMLSelectElement>('[name="gearbox"]');
    const gearboxField = form.querySelector<HTMLElement>(
      "[data-gearbox-field]",
    );
    if (course) {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("course");
      if (
        fromUrl &&
        [...course.options].some((option) => option.value === fromUrl)
      )
        course.value = fromUrl;
      if (fromUrl === "skupina-b-automat") course.value = "skupina-b";
      const updateGearbox = () => {
        const isGroupB = ["skupina-b", "intenzivny-b"].includes(course.value);
        if (gearboxField) gearboxField.hidden = !isGroupB;
        if (gearbox) {
          gearbox.disabled = !isGroupB;
          gearbox.required = isGroupB;
          if (!isGroupB) gearbox.value = "";
          showError(gearbox, "");
        }
      };
      updateGearbox();
      const gearboxFromUrl =
        fromUrl === "skupina-b-automat" ? "automatic" : params.get("gearbox");
      if (
        gearbox &&
        ["skupina-b", "intenzivny-b"].includes(course.value) &&
        ["manual", "automatic"].includes(gearboxFromUrl ?? "")
      )
        gearbox.value = gearboxFromUrl ?? "";
      const selectedTerm = params.get("term");
      if (
        term &&
        selectedTerm &&
        [...term.options].some((option) => option.value === selectedTerm)
      )
        term.value = selectedTerm;
      const updateTerms = () => {
        term
          ?.querySelectorAll<HTMLOptionElement>("option[data-course]")
          .forEach((option) => {
            const unavailable = Boolean(
              course.value && option.dataset.course !== course.value,
            );
            option.disabled = unavailable;
            option.hidden = unavailable;
          });
        if (term?.selectedOptions[0]?.disabled) term.value = "";
      };
      updateTerms();
      course.addEventListener("change", () => {
        if (term) term.value = "";
        updateTerms();
        updateGearbox();
        showError(course, "");
      });
    }
    const fields = [
      ...form.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >("input, select, textarea"),
    ];
    fields.forEach((field) =>
      field.addEventListener("input", () => showError(field, "")),
    );
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      let firstInvalid: (typeof fields)[number] | undefined;
      for (const field of fields) {
        const error = field.checkValidity() ? "" : messageFor(field);
        showError(field, error);
        if (error && !firstInvalid) firstInvalid = field;
      }
      const status = form.querySelector<HTMLElement>(".form-status");
      if (firstInvalid) {
        firstInvalid.focus();
        if (status) {
          status.hidden = false;
          status.textContent = "Skontroluj vyznačené polia.";
        }
        return;
      }
      const button = form.querySelector<HTMLButtonElement>(".form-submit");
      if (button) {
        button.disabled = true;
        button.dataset.original = button.textContent || "";
        button.textContent = "Spracúva sa ukážka…";
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (status) {
        status.hidden = false;
        status.innerHTML = form.querySelector('[name="course"]')
          ? "<strong>Ukážka prihlášky</strong><br>Toto je demonštrácia používateľského rozhrania. V ostrej verzii by bola prihláška odoslaná autoškole. Teraz sa nič neodoslalo ani neuložilo."
          : "<strong>Ukážka kontaktu</strong><br>Toto je demonštrácia používateľského rozhrania. V ostrej verzii by bola správa odoslaná autoškole. Teraz sa nič neodoslalo ani neuložilo.";
        status.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      if (button) {
        button.disabled = false;
        button.textContent = button.dataset.original || "Vyskúšať formulár";
      }
    });
    form
      .querySelector<HTMLButtonElement>(".form-submit")
      ?.addEventListener("click", () => form.requestSubmit());
  });
