(function () {
  "use strict";

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mainNav = document.querySelector("[data-main-nav]");

  function setMenu(open) {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Zavrieť navigáciu" : "Otvoriť navigáciu");
    mainNav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    mainNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1050) setMenu(false);
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  const inquiryForm = document.querySelector("[data-inquiry-form]");

  if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const status = inquiryForm.querySelector("[data-form-status]");
      if (!inquiryForm.reportValidity()) return;

      const data = new FormData(inquiryForm);
      const subject = "Technický dopyt – " + String(data.get("oblast") || "priemyselná údržba");
      const body = [
        "Meno: " + String(data.get("meno") || ""),
        "Spoločnosť: " + String(data.get("spolocnost") || ""),
        "E-mail: " + String(data.get("email") || ""),
        "Telefón: " + String(data.get("telefon") || "neuvedený"),
        "Oblasť: " + String(data.get("oblast") || ""),
        "",
        "Popis požiadavky:",
        String(data.get("sprava") || "")
      ].join("\n");

      const mailto = "mailto:chestrealprogress@chestreal.sk?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      if (status) {
        status.textContent = "Otváram váš e-mailový program s pripraveným dopytom. Údaje sa neodosielajú cez web.";
      }

      window.location.href = mailto;
    });
  }
})();
