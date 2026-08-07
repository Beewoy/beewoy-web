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
    .filter(a => {
      const href = a.getAttribute("href");
      return href && href !== "#kontakt" && href !== "#top";
    });
  const navSections = [...new Set(navAnchors.map(a => a.getAttribute("href")))]
    .map(href => document.querySelector(href))
    .filter(Boolean);

  const getNavOffset = () => {
    const headerHeight = header?.getBoundingClientRect().height || 72;
    return headerHeight + 12;
  };

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
    const marker = getNavOffset();
    let current = null;
    for (const section of navSections) {
      if (section.getBoundingClientRect().top <= marker + 8) current = section;
    }
    setActiveNav(current ? "#" + current.id : null);
  };

  let navRaf = 0;
  const scheduleActiveNav = () => {
    if (navRaf) return;
    navRaf = requestAnimationFrame(() => {
      navRaf = 0;
      updateActiveNav();
    });
  };
  window.addEventListener("scroll", scheduleActiveNav, { passive: true });
  window.addEventListener("resize", scheduleActiveNav, { passive: true });
  updateActiveNav();

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      setActiveNav(href);
      window.setTimeout(updateActiveNav, 350);
      window.setTimeout(updateActiveNav, 700);
    });
  });
  window.addEventListener("hashchange", () => {
    window.setTimeout(updateActiveNav, 50);
    window.setTimeout(updateActiveNav, 400);
  });

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
  const gridInteraction = window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const gridSize = 72;

  const bindHeroGrid = (hero, heroGrid) => {
    if (!hero || !heroGrid) return;

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
  };

  bindHeroGrid(document.querySelector(".hero"), document.querySelector(".hero-grid"));
  bindHeroGrid(document.querySelector(".web-hero"), document.querySelector(".web-hero-grid"));

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
  const industryInput = document.querySelector("#contact-industry");
  const nameInput = document.querySelector("#contact-name");
  const formStatus = document.querySelector(".form-status");
  const SEO_OPTION = "SEO, výkon alebo servis";
  const PACKAGE_IDS = new Set(["start", "profi", "individual", "ine"]);
  const PROJECT_TYPE_MAP = {
    redizajn: "Redizajn existujúceho webu",
    novy: "Nový web",
  };

  const setBalikValue = (value) => {
    if (value == null || value === "") return false;
    const radio = contactForm?.querySelector(`input[type="radio"][name="balik"][value="${value}"]`);
    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    }
    if (!typeSelect) return false;
    const match = [...typeSelect.options].find((o) => o.value === value);
    if (!match) return false;
    typeSelect.value = value;
    return true;
  };

  const setProjectType = (key) => {
    if (!typeSelect || !key) return false;
    const value = PROJECT_TYPE_MAP[key] || key;
    const match = [...typeSelect.options].find((o) => o.value === value);
    if (!match) return false;
    typeSelect.value = value;
    typeSelect.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  };

  const applyPreset = (preset) => {
    if (preset === "seo") {
      if (!setBalikValue("ine")) setBalikValue(SEO_OPTION);
      return;
    }
    if (PACKAGE_IDS.has(preset)) setBalikValue(preset);
  };

  const focusFirstEmpty = () => {
    const focusOpts = { preventScroll: true };
    if (nameInput && !nameInput.value) {
      nameInput.focus(focusOpts);
      return;
    }
    if (typeSelect && !typeSelect.value) {
      typeSelect.focus(focusOpts);
      return;
    }
    const checkedBalik = contactForm?.querySelector('input[type="radio"][name="balik"]:checked');
    if (contactForm?.querySelector('input[type="radio"][name="balik"]') && !checkedBalik) {
      contactForm.querySelector('input[type="radio"][name="balik"]')?.focus(focusOpts);
      return;
    }
    const firstEmpty = contactForm?.querySelector("input:not([type=hidden]):not([type=checkbox]):not([type=radio]):invalid, textarea:invalid, select:invalid");
    firstEmpty?.focus(focusOpts);
  };

  const scrollToForm = () => {
    const target = document.querySelector("#kontakt") || contactForm;
    if (!target) return;
    const top = window.scrollY + target.getBoundingClientRect().top - getNavOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const afterScrollSettled = (fn) => {
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      window.removeEventListener("scrollend", run);
      fn();
    };
    window.addEventListener("scrollend", run, { once: true });
    window.setTimeout(run, 700);
  };

  document.querySelectorAll("[data-preset]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      applyPreset(trigger.dataset.preset);
      scrollToForm();
      afterScrollSettled(focusFirstEmpty);
    });
  });

  document.querySelectorAll("[data-typ]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      setProjectType(trigger.dataset.typ);
      scrollToForm();
      afterScrollSettled(focusFirstEmpty);
    });
  });

  document.querySelectorAll('a[href="#kontakt"]').forEach((trigger) => {
    if (trigger.hasAttribute("data-typ") || trigger.hasAttribute("data-preset")) return;
    trigger.addEventListener("click", (event) => {
      const target = document.querySelector("#kontakt");
      if (!target) return;
      event.preventDefault();
      scrollToForm();
      history.pushState(null, "", "#kontakt");
    });
  });

  const initFormPreset = () => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    const balik = (params.get("balik") || params.get("plan") || "").toLowerCase();
    const odvetvie = (params.get("odvetvie") || "").trim();
    const typ = (params.get("typ") || "").toLowerCase();

    if (industryInput && odvetvie) industryInput.value = odvetvie;

    if (PACKAGE_IDS.has(balik)) {
      applyPreset(balik);
      window.setTimeout(focusFirstEmpty, 300);
    } else if (typ === "seo") {
      applyPreset("seo");
    } else if (PROJECT_TYPE_MAP[typ]) {
      setProjectType(typ);
      window.setTimeout(focusFirstEmpty, 300);
    } else if (hash === "#kontakt-form" && !contactForm?.querySelector('input[type="radio"][name="balik"]')) {
      applyPreset("seo");
      window.setTimeout(focusFirstEmpty, 300);
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
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
    }
    if (formStatus) formStatus.hidden = true;

    try {
      const formData = new FormData(contactForm);
      const honeyValue = String(formData.get("_honey") || "").trim();
      const submittedEmail = String(formData.get("email") || "").trim();

      // Some browser autofill/password managers copy the user's email into
      // off-screen text fields. Do not let that create a false spam rejection.
      if (honeyValue && honeyValue === submittedEmail) formData.set("_honey", "");

      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("https://formsubmit.co/ajax/ahoj@beewoy.sk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false || result?.success === "false") {
        throw new Error("submit failed");
      }

      contactForm.reset();
      showFormStatus("Ďakujeme! Správu sme dostali a ozveme sa vám čo najskôr.", "success");
      window.BeewoyAnalytics?.track?.("generate_lead", {
        form_id: "kontakt",
        page_path: window.BeewoyAnalytics.pagePath?.() || window.location.pathname
      });
    } catch {
      showFormStatus("Odoslanie sa nepodarilo. Skúste to znova alebo nám napíšte na ahoj@beewoy.sk.", "error");
      window.BeewoyAnalytics?.track?.("form_error", {
        form_id: "kontakt",
        page_path: window.BeewoyAnalytics.pagePath?.() || window.location.pathname
      });
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
      }
    }
  });
})();
