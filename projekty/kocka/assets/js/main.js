(() => {
  "use strict";

  const header = document.querySelector(".siteHeader");
  const menu = document.querySelector(".mobileMenu");
  const menuButton = document.querySelector(".menuButton");
  const mobileLinks = Array.from(
    document.querySelectorAll(".mobileMenu a, .mobileMenu button"),
  );

  const setMenuState = (open, restoreFocus = false) => {
    if (!header || !menu || !menuButton) return;

    header.classList.toggle("siteHeaderOpen", open);
    menu.classList.toggle("mobileMenuOpen", open);
    menu.setAttribute("aria-hidden", String(!open));
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Zavrieť menu" : "Otvoriť menu");
    document.body.classList.toggle("menuLocked", open);

    mobileLinks.forEach((item) => {
      item.setAttribute("tabindex", open ? "0" : "-1");
    });

    if (!open && restoreFocus) {
      menuButton.focus();
    }
  };

  setMenuState(false);

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    setMenuState(open);
  });

  document.querySelectorAll(".mobileMenu a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton?.getAttribute("aria-expanded") === "true"
    ) {
      setMenuState(false, true);
    }
  });

  const updateHeader = () => {
    header?.classList.toggle("siteHeaderScrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  document.querySelectorAll(".languageSwitch button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".languageToast")?.remove();
      const toast = document.createElement("div");
      toast.className = "toast languageToast";
      toast.setAttribute("role", "status");
      toast.textContent = "Anglická verzia sa pripravuje.";
      document.body.append(toast);
      window.setTimeout(() => toast.remove(), 2600);
    });
  });

  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  document.documentElement.classList.add("revealReady");

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    revealItems.forEach((item) => item.classList.add("isVisible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    window.setTimeout(() => {
      revealItems.forEach((item) => item.classList.add("isVisible"));
    }, 900);
  }

  const filterButtons = Array.from(
    document.querySelectorAll(".filterBar button"),
  );
  const portfolioGrid = document.querySelector(".portfolioGrid");
  const portfolioCards = Array.from(
    document.querySelectorAll(".portfolioCard"),
  );

  portfolioCards.forEach((card) => {
    const category = card.querySelector(".portfolioMeta p")?.textContent?.trim();
    if (category) card.dataset.category = category;
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.textContent?.trim() || "Všetky";

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("isActive", active);
        item.setAttribute("aria-pressed", String(active));
      });

      portfolioGrid?.classList.toggle("isFiltered", category !== "Všetky");
      portfolioCards.forEach((card) => {
        card.hidden =
          category !== "Všetky" && card.dataset.category !== category;
      });
    });
  });

  const fileInput = document.querySelector(
    '.fileDrop input[type="file"]',
  );
  const fileLabel = document.querySelector(".fileDrop strong");
  const form = document.querySelector(".contactForm");
  const formStatus = document.querySelector(".formStatus");

  fileInput?.addEventListener("change", () => {
    const selectedFile = fileInput.files?.[0];
    if (fileLabel) {
      fileLabel.textContent = selectedFile?.name || "Priložiť súbor";
    }
    if (formStatus) formStatus.innerHTML = "";
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const selectedFile = fileInput?.files?.[0];
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      if (formStatus) {
        formStatus.innerHTML =
          '<p class="statusError">Príloha je väčšia ako 10 MB. Vyberte menší súbor.</p>';
      }
      return;
    }

    if (formStatus) {
      formStatus.innerHTML =
        '<p class="statusSuccess">Formulár je vyplnený správne. Statická verzia zatiaľ neodosiela údaje na server.</p>';
    }
  });
})();
