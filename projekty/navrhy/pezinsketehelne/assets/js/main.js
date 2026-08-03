(() => {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-main-nav]");

  const closeMenu = () => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
        closeMenu();
        if (wasOpen) menuButton.focus();
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const solutionCards = [...document.querySelectorAll("[data-categories]")];

  if (filterButtons.length && solutionCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => {
          item.setAttribute("aria-pressed", String(item === button));
        });

        solutionCards.forEach((card) => {
          const categories = card.dataset.categories.split(" ");
          card.hidden = filter !== "all" && !categories.includes(filter);
        });
      });
    });
  }

  const topic = document.querySelector("#tema");
  if (topic) {
    const requestedTopic = new URLSearchParams(window.location.search).get("tema");
    const matchingOption = [...topic.options].find(
      (option) => option.value.toLowerCase() === (requestedTopic || "").toLowerCase()
    );
    if (matchingOption) topic.value = matchingOption.value;
  }

  const staticForm = document.querySelector("[data-static-form]");
  const formStatus = document.querySelector("[data-form-status]");

  if (staticForm && formStatus) {
    staticForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!staticForm.checkValidity()) {
        staticForm.reportValidity();
        return;
      }

      formStatus.classList.add("is-visible");
      formStatus.setAttribute("tabindex", "-1");
      formStatus.focus();
    });
  }
})();
