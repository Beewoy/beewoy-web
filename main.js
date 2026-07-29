(() => {
  const header = document.querySelector("#siteHeader");
  const burger = document.querySelector("#burger");
  const mobileMenu = document.querySelector("#mobileMenu");

  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 12);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const closeMenu = () => {
    burger?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-label", "Otvoriť menu");
    mobileMenu?.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  burger?.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    burger.setAttribute("aria-label", open ? "Otvoriť menu" : "Zatvoriť menu");
    mobileMenu?.classList.toggle("open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  mobileMenu?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: .1, rootMargin: "0px 0px -45px" });

  document.querySelectorAll(".reveal").forEach(element => reveal.observe(element));

  /* Active nav anchor (scroll spy) */
  const navAnchors = [...document.querySelectorAll('.nav a[href^="#"], .mobile-menu a[href^="#"]')]
    .filter(a => a.getAttribute("href") !== "#kontakt");
  const navSections = [...new Set(navAnchors.map(a => a.getAttribute("href")))]
    .map(href => document.querySelector(href))
    .filter(Boolean);

  const setActiveNav = (id) => {
    navAnchors.forEach(a => {
      const on = a.getAttribute("href") === id;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };

  const updateActiveNav = () => {
    if (!navSections.length) return;
    const marker = Math.min(120, window.innerHeight * 0.28);
    let current = null;
    for (const section of navSections) {
      if (section.getBoundingClientRect().top <= marker) current = section;
    }
    setActiveNav(current ? "#" + current.id : null);
  };

  let navRaf = 0;
  window.addEventListener("scroll", () => {
    if (navRaf) return;
    navRaf = requestAnimationFrame(() => {
      navRaf = 0;
      updateActiveNav();
    });
  }, { passive: true });
  updateActiveNav();

  /* Process timeline — highlight steps while scrolling top to bottom */
  const processSection = document.querySelector("#proces");
  const processSteps = [...document.querySelectorAll("#proces .step")];
  const updateProcessSteps = () => {
    if (!processSteps.length || !processSection) return;
    const marker = window.innerHeight * 0.42;
    const sectionRect = processSection.getBoundingClientRect();

    if (sectionRect.top > marker) {
      processSteps.forEach((step) => step.classList.remove("active", "done"));
      return;
    }

    if (sectionRect.bottom < marker) {
      const last = processSteps.length - 1;
      processSteps.forEach((step, i) => {
        step.classList.toggle("active", i === last);
        step.classList.toggle("done", i < last);
      });
      return;
    }

    let activeIndex = 0;
    processSteps.forEach((step, i) => {
      const rect = step.getBoundingClientRect();
      const trigger = rect.top + rect.height * 0.35;
      if (trigger <= marker) activeIndex = i;
    });
    processSteps.forEach((step, i) => {
      step.classList.toggle("active", i === activeIndex);
      step.classList.toggle("done", i < activeIndex);
    });
  };

  let processRaf = 0;
  window.addEventListener("scroll", () => {
    if (processRaf) return;
    processRaf = requestAnimationFrame(() => {
      processRaf = 0;
      updateProcessSteps();
    });
  }, { passive: true });
  updateProcessSteps();

  /* Hero grid — cursor-reactive focus and snapped grid point */
  const hero = document.querySelector(".hero");
  const heroGrid = document.querySelector(".hero-grid");
  const gridInteraction = window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (hero && heroGrid) {
    const gridSize = 72;
    let gridFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let gridPhaseX = 0;
    let gridPhaseY = 0;

    const readGridPhase = () => {
      const drift = parseFloat(getComputedStyle(heroGrid).getPropertyValue("--grid-drift")) || 0;
      gridPhaseX = drift;
      gridPhaseY = drift;
    };

    const renderGridPointer = () => {
      gridFrame = 0;
      const rect = hero.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, pointerX - rect.left));
      const y = Math.max(0, Math.min(rect.height, pointerY - rect.top));
      const snapX = Math.round((x - gridPhaseX) / gridSize) * gridSize + gridPhaseX;
      const snapY = Math.round((y - gridPhaseY) / gridSize) * gridSize + gridPhaseY;

      hero.style.setProperty("--grid-cursor-x", `${x}px`);
      hero.style.setProperty("--grid-cursor-y", `${y}px`);
      hero.style.setProperty("--grid-snap-x", `${snapX}px`);
      hero.style.setProperty("--grid-snap-y", `${snapY}px`);
    };

    const resetGridPointer = () => {
      hero.classList.remove("grid-active");
      if (gridFrame) cancelAnimationFrame(gridFrame);
      gridFrame = 0;
    };

    hero.addEventListener("pointerenter", (event) => {
      if (!gridInteraction.matches || reducedMotion.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      hero.classList.add("grid-active");
      readGridPhase();
      renderGridPointer();
    }, { passive: true });

    hero.addEventListener("pointermove", (event) => {
      if (!hero.classList.contains("grid-active")) {
        if (!gridInteraction.matches || reducedMotion.matches) return;
        hero.classList.add("grid-active");
        readGridPhase();
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (gridFrame) return;
      gridFrame = requestAnimationFrame(renderGridPointer);
    }, { passive: true });

    hero.addEventListener("pointerleave", resetGridPointer, { passive: true });
    gridInteraction.addEventListener?.("change", (event) => {
      if (!event.matches) resetGridPointer();
    });
    reducedMotion.addEventListener?.("change", (event) => {
      if (event.matches) resetGridPointer();
    });
  }

  const registerSW = () => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  };

  const unregisterSW = async () => {
    if (!("serviceWorker" in navigator)) return;
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map((r) => r.unregister()));
    if (window.caches) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
  };

  const syncSW = (consent) => {
    if (consent?.functional) registerSW();
    else unregisterSW();
  };

  syncSW(window.BeewoyConsent?.get?.() || window.beewoyConsent || null);
  window.addEventListener("beewoy:consent", (event) => syncSW(event.detail));

  /* Contact form */
  const contactForm = document.querySelector("#kontakt-form");
  const typeSelect = document.querySelector("#contact-type");
  const nameInput = document.querySelector("#contact-name");
  const formStatus = document.querySelector(".form-status");
  const SEO_OPTION = "SEO, výkon alebo servis";

  const applyPreset = (preset) => {
    if (preset !== "seo" || !typeSelect) return;
    typeSelect.value = SEO_OPTION;
  };

  const focusFirstEmpty = () => {
    if (nameInput && !nameInput.value) {
      nameInput.focus();
      return;
    }
    const firstEmpty = contactForm?.querySelector("input:not([type=hidden]):not([type=checkbox]):invalid, textarea:invalid");
    firstEmpty?.focus();
  };

  const scrollToForm = () => {
    contactForm?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  document.querySelectorAll("[data-preset]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      applyPreset(trigger.dataset.preset);
      scrollToForm();
      window.setTimeout(focusFirstEmpty, 400);
    });
  });

  const initFormPreset = () => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    if (params.get("typ") === "seo" || hash === "#kontakt-form") {
      applyPreset("seo");
      if (hash === "#kontakt-form") window.setTimeout(focusFirstEmpty, 300);
    }
  };
  initFormPreset();

  const showFormStatus = (message, type) => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.hidden = false;
    formStatus.classList.remove("is-success", "is-error");
    formStatus.classList.add(type === "success" ? "is-success" : "is-error");
  };

  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    formStatus.hidden = true;

    try {
      const body = new URLSearchParams(new FormData(contactForm)).toString();
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });

      if (!response.ok) throw new Error("submit failed");

      contactForm.reset();
      showFormStatus("Ďakujeme! Správu sme dostali a ozveme sa vám čo najskôr.", "success");
    } catch {
      showFormStatus("Odoslanie sa nepodarilo. Skúste to znova alebo nám napíšte na ahoj@beewoy.sk.", "error");
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
