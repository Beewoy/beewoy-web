(() => {
  const CONSENT_KEY = "beewoy_consent";
  const CONSENT_VERSION = 1;

  const defaultConsent = (overrides = {}) => ({
    v: CONSENT_VERSION,
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
    ts: Date.now(),
    ...overrides
  });

  const readConsent = () => {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || data.v !== CONSENT_VERSION) return null;
      return data;
    } catch {
      return null;
    }
  };

  const writeConsent = (consent) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent("beewoy:consent", { detail: consent }));
  };

  const applyConsent = (consent) => {
    window.beewoyConsent = consent;
  };

  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === "className") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key === "html") node.innerHTML = value;
      else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2).toLowerCase(), value);
      else if (value !== undefined && value !== null) node.setAttribute(key, value);
    });
    children.forEach((child) => {
      if (child == null) return;
      node.append(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  };

  let banner;
  let modal;
  let checks = {};

  const hideBanner = () => {
    if (banner) banner.hidden = true;
  };

  const showBanner = () => {
    if (banner) banner.hidden = false;
  };

  const openModal = () => {
    const current = readConsent() || defaultConsent();
    checks.functional.checked = !!current.functional;
    checks.analytics.checked = !!current.analytics;
    checks.marketing.checked = !!current.marketing;
    if (modal) {
      modal.hidden = false;
      document.body.classList.add("cookie-modal-open");
      modal.querySelector("button, [href], input")?.focus();
    }
  };

  const closeModal = () => {
    if (modal) modal.hidden = true;
    document.body.classList.remove("cookie-modal-open");
  };

  const saveAndClose = (consent) => {
    writeConsent(consent);
    applyConsent(consent);
    hideBanner();
    closeModal();
  };

  const acceptAll = () =>
    saveAndClose(defaultConsent({ functional: true, analytics: true, marketing: true }));

  const rejectOptional = () =>
    saveAndClose(defaultConsent({ functional: false, analytics: false, marketing: false }));

  const saveSelected = () =>
    saveAndClose(
      defaultConsent({
        functional: checks.functional.checked,
        analytics: checks.analytics.checked,
        marketing: checks.marketing.checked
      })
    );

  const buildUI = () => {
    banner = el("div", {
      className: "cookie-banner",
      id: "cookieBanner",
      role: "dialog",
      "aria-modal": "false",
      "aria-labelledby": "cookieBannerTitle",
      "aria-describedby": "cookieBannerText",
      hidden: "true"
    }, [
      el("div", { className: "cookie-banner-inner" }, [
        el("div", { className: "cookie-banner-copy" }, [
          el("p", { className: "cookie-kicker", text: "Cookies a súkromie" }),
          el("h2", { id: "cookieBannerTitle", text: "Používame nevyhnutné cookies a podľa vášho súhlasu aj ďalšie." }),
          el("p", {
            id: "cookieBannerText",
            html: 'Aby sme boli v súlade s GDPR a ePrivacy, neukladáme nepovinné cookies bez vášho súhlasu. Viac v dokumentoch <a href="/cookies/">Cookies</a> a <a href="/ochrana-udajov/">Ochrana osobných údajov</a>.'
          })
        ]),
        el("div", { className: "cookie-banner-actions" }, [
          el("button", { type: "button", className: "btn btn-primary cookie-btn", text: "Prijať všetko", onClick: acceptAll }),
          el("button", { type: "button", className: "btn cookie-btn cookie-btn-ghost", text: "Len nevyhnutné", onClick: rejectOptional }),
          el("button", { type: "button", className: "btn cookie-btn cookie-btn-ghost", text: "Nastavenia", onClick: openModal })
        ])
      ])
    ]);

    checks = {};

    modal = el("div", {
      className: "cookie-modal",
      id: "cookieModal",
      hidden: "true",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "cookieModalTitle"
    }, [
      el("div", { className: "cookie-modal-backdrop", onClick: closeModal, "aria-hidden": "true" }),
      el("div", { className: "cookie-modal-panel" }, [
        el("div", { className: "cookie-modal-head" }, [
          el("h2", { id: "cookieModalTitle", text: "Nastavenia cookies" }),
          el("button", {
            type: "button",
            className: "cookie-modal-close",
            "aria-label": "Zavrieť",
            text: "×",
            onClick: closeModal
          })
        ]),
        el("p", {
          className: "cookie-modal-lead",
          text: "Nevyhnutné cookies sú vždy aktívne. Ostatné kategórie zapnete iba so súhlasom. Súhlas môžete kedykoľvek zmeniť."
        }),
        el("div", { className: "cookie-categories" }, [
          (() => {
            const input = el("input", { type: "checkbox", id: "cookie-necessary", checked: "true", disabled: "true" });
            checks.necessary = input;
            return el("label", { className: "cookie-category is-locked", for: "cookie-necessary" }, [
              el("span", { className: "cookie-category-top" }, [
                el("span", { className: "cookie-category-title", text: "Nevyhnutné" }),
                input
              ]),
              el("span", {
                className: "cookie-category-desc",
                text: "Zabezpečujú fungovanie webu, uloženie vášho súhlasu a základnú bezpečnosť. Nie je možné ich vypnúť."
              })
            ]);
          })(),
          (() => {
            const input = el("input", { type: "checkbox", id: "cookie-functional" });
            checks.functional = input;
            return el("label", { className: "cookie-category", for: "cookie-functional" }, [
              el("span", { className: "cookie-category-top" }, [
                el("span", { className: "cookie-category-title", text: "Funkčné" }),
                input
              ]),
              el("span", {
                className: "cookie-category-desc",
                text: "PWA / service worker — rýchlejšie načítanie stránky a možnosť pridania na plochu zariadenia."
              })
            ]);
          })(),
          (() => {
            const input = el("input", { type: "checkbox", id: "cookie-analytics" });
            checks.analytics = input;
            return el("label", { className: "cookie-category", for: "cookie-analytics" }, [
              el("span", { className: "cookie-category-top" }, [
                el("span", { className: "cookie-category-title", text: "Analytické" }),
                input
              ]),
              el("span", {
                className: "cookie-category-desc",
                text: "Firebase Analytics (Google) — návštevnosť stránok a anonymizované eventy (napr. odoslanie formulára, kliknutia na CTA). Spúšťa sa až po súhlase."
              })
            ]);
          })(),
          (() => {
            const input = el("input", { type: "checkbox", id: "cookie-marketing" });
            checks.marketing = input;
            return el("label", { className: "cookie-category", for: "cookie-marketing" }, [
              el("span", { className: "cookie-category-top" }, [
                el("span", { className: "cookie-category-title", text: "Marketingové" }),
                input
              ]),
              el("span", {
                className: "cookie-category-desc",
                text: "Slúžia na personalizáciu reklamy a remarketing. Aktuálne nepoužívame — kategória je pripravená do budúcna."
              })
            ]);
          })()
        ]),
        el("div", { className: "cookie-modal-actions" }, [
          el("button", { type: "button", className: "btn cookie-btn cookie-btn-ghost", text: "Len nevyhnutné", onClick: rejectOptional }),
          el("button", { type: "button", className: "btn btn-primary cookie-btn", text: "Uložiť výber", onClick: saveSelected }),
          el("button", { type: "button", className: "btn btn-primary cookie-btn", text: "Prijať všetko", onClick: acceptAll })
        ])
      ])
    ]);

    document.body.append(banner, modal);

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-cookie-settings]");
      if (trigger) {
        event.preventDefault();
        openModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal && !modal.hidden) closeModal();
    });
  };

  const init = () => {
    buildUI();
    const existing = readConsent();
    if (existing) {
      applyConsent(existing);
      hideBanner();
    } else {
      showBanner();
    }

    window.BeewoyConsent = {
      get: readConsent,
      openSettings: openModal,
      acceptAll,
      rejectOptional
    };
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
