(function () {
  "use strict";

  const menuButton = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  function closeMenu() {
    if (!menuButton || !menu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Otvoriť menu");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Otvoriť menu" : "Zavrieť menu");
      menu.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) closeMenu();
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  const form = document.querySelector("[data-static-form]");
  const status = document.querySelector("[data-form-status]");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      status.className = "form-status is-visible is-info";
      status.innerHTML = "Formulár je pripravený, ale zatiaľ nie je pripojený k odosielacej službe. Dopyt pošlite na <a href=\"mailto:eurobeton@eurobeton.sk\">eurobeton@eurobeton.sk</a> alebo zavolajte na <a href=\"tel:+421905779263\">0905 779 263</a>.";
      status.focus();
    });
  }
})();
