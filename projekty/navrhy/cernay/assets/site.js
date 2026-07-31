(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    const revealItems = document.querySelectorAll("[data-reveal]");
    revealItems.forEach((item) => item.classList.add("reveal-pending"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -28px" },
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  const contactForm = document.querySelector("[data-contact-form]");
  const formStatus = document.querySelector("[data-form-status]");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const data = new FormData(contactForm);
      const name = String(data.get("name") || "");
      const company = String(data.get("company") || "");
      const email = String(data.get("email") || "");
      const phone = String(data.get("phone") || "");
      const topic = String(data.get("topic") || "Správa z webu");
      const message = String(data.get("message") || "");

      const body = [
        `Meno: ${name}`,
        company ? `Spoločnosť: ${company}` : "",
        `E-mail: ${email}`,
        phone ? `Telefón: ${phone}` : "",
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      if (formStatus) {
        formStatus.textContent = "Otvárame pripravenú správu vo vašom e-mailovom programe…";
      }

      window.location.href = `mailto:info@cernay.sk?subject=${encodeURIComponent(
        `${topic} – web Černay`,
      )}&body=${encodeURIComponent(body)}`;
    });
  }
})();
