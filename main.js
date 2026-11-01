(() => {
  const STRINGS = {
    sk: {
      menuOpen: "Otvoriť menu",
      menuClose: "Zavrieť menu",
      auditMessage: "Mám záujem o bezplatný mini-audit webu: ",
      sent: "Ďakujeme! Správu sme dostali a ozveme sa vám čo najskôr.",
      failed: "Odoslanie sa nepodarilo. Skúste to znova alebo nám napíšte na ahoj@beewoy.sk."
    },
    pl: {
      menuOpen: "Otwórz menu",
      menuClose: "Zamknij menu",
      auditMessage: "Interesuje mnie bezpłatny mini-audyt strony: ",
      sent: "Dziękujemy! Otrzymaliśmy wiadomość i odezwiemy się jak najszybciej.",
      failed: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na ahoj@beewoy.sk."
    },
    en: {
      menuOpen: "Open menu",
      menuClose: "Close menu",
      auditMessage: "I'm interested in a free website mini-audit: ",
      sent: "Thank you! We've received your message and will get back to you soon.",
      failed: "Sending failed. Please try again or email us at ahoj@beewoy.sk."
    }
  };
  const t = STRINGS[(document.documentElement.lang || "sk").slice(0, 2)] || STRINGS.sk;

  const header = document.querySelector("#siteHeader");
  const burger = document.querySelector("#burger");
  const mobileMenu = document.querySelector("#mobileMenu");

  /* Header border once the page scrolls */
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const getNavOffset = () => (header?.getBoundingClientRect().height || 64) + 16;

  /* Mobile menu */
  const setMenu = (open) => {
    if (!burger || !mobileMenu) return;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? t.menuClose : t.menuOpen);
    mobileMenu.classList.toggle("open", open);
    mobileMenu.toggleAttribute("inert", !open);
    document.body.classList.toggle("menu-open", open);
  };
  mobileMenu?.toggleAttribute("inert", true);

  burger?.addEventListener("click", () => {
    setMenu(burger.getAttribute("aria-expanded") !== "true");
  });
  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && burger?.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      burger.focus();
    }
  });
  window.matchMedia("(min-width: 900px)").addEventListener?.("change", (event) => {
    if (event.matches) setMenu(false);
  });

  /* PWA service worker — only with functional consent */
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
  const formStatus = contactForm?.querySelector(".form-status");
  const SEO_OPTION = "SEO, výkon alebo servis";
  const PACKAGE_IDS = new Set(["basic", "start", "individual", "neviem"]);
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
      if (!setBalikValue("neviem")) setBalikValue(SEO_OPTION);
      setProjectType("redizajn");
      const message = contactForm?.querySelector("#contact-message");
      if (message && !message.value) message.value = t.auditMessage;
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

  if (contactForm) {
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

    /* Same-page plan buttons (e.g. ?balik=start#kontakt on the homepage) */
    document.querySelectorAll("a[data-balik]").forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        applyPreset(trigger.dataset.balik);
        scrollToForm();
        afterScrollSettled(focusFirstEmpty);
      });
    });

    document.querySelectorAll('a[href="#kontakt"]').forEach((trigger) => {
      if (trigger.hasAttribute("data-typ") || trigger.hasAttribute("data-preset") || trigger.hasAttribute("data-balik")) return;
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        scrollToForm();
        history.pushState(null, "", "#kontakt");
      });
    });
  }

  const initFormPreset = () => {
    if (!contactForm) return;
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    const balik = (params.get("balik") || params.get("plan") || "").toLowerCase();
    const odvetvie = (params.get("odvetvie") || "").trim();
    const typ = (params.get("typ") || "").toLowerCase();

    if (industryInput && odvetvie) industryInput.value = odvetvie;

    const normalizedBalik = balik === "profi" ? "start" : balik;
    if (PACKAGE_IDS.has(normalizedBalik)) {
      applyPreset(normalizedBalik);
      window.setTimeout(focusFirstEmpty, 300);
    } else if (typ === "seo") {
      applyPreset("seo");
    } else if (PROJECT_TYPE_MAP[typ]) {
      setProjectType(typ);
      window.setTimeout(focusFirstEmpty, 300);
    } else if (hash === "#kontakt-form" && !contactForm.querySelector('input[type="radio"][name="balik"]')) {
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
      showFormStatus(t.sent, "success");
      window.BeewoyAnalytics?.track?.("generate_lead", {
        form_id: "kontakt",
        page_path: window.BeewoyAnalytics.pagePath?.() || window.location.pathname
      });
    } catch {
      showFormStatus(t.failed, "error");
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
