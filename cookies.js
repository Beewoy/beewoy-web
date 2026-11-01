(() => {
  const CONSENT_KEY = "beewoy_consent";
  const CONSENT_VERSION = 1;

  const LANG = /^\/(pl|en)(?:\/|$)/.exec(window.location.pathname)?.[1] || "sk";
  const T = {
    sk: {
      kicker: "Cookies a súkromie",
      title: "Používame nevyhnutné cookies a podľa vášho súhlasu aj ďalšie.",
      text: 'Aby sme boli v súlade s GDPR a ePrivacy, neukladáme nepovinné cookies bez vášho súhlasu. Viac v dokumentoch <a href="/cookies/">Cookies</a> a <a href="/ochrana-udajov/">Ochrana osobných údajov</a>.',
      acceptAll: "Prijať všetko", necessaryOnly: "Len nevyhnutné", settings: "Nastavenia",
      modalTitle: "Nastavenia cookies", close: "Zavrieť",
      modalLead: "Nevyhnutné cookies sú vždy aktívne. Ostatné kategórie zapnete iba so súhlasom. Súhlas môžete kedykoľvek zmeniť.",
      necessary: "Nevyhnutné", necessaryDesc: "Zabezpečujú fungovanie webu, uloženie vášho súhlasu a základnú bezpečnosť. Nie je možné ich vypnúť.",
      functional: "Funkčné", functionalDesc: "PWA / service worker — rýchlejšie načítanie stránky a možnosť pridania na plochu zariadenia.",
      analytics: "Analytické", analyticsDesc: "Firebase Analytics (Google) — návštevnosť stránok a anonymizované eventy (napr. odoslanie formulára, kliknutia na CTA). Spúšťa sa až po súhlase.",
      marketing: "Marketingové", marketingDesc: "Slúžia na personalizáciu reklamy a remarketing. Aktuálne nepoužívame — kategória je pripravená do budúcna.",
      save: "Uložiť výber"
    },
    pl: {
      kicker: "Cookies i prywatność",
      title: "Używamy niezbędnych plików cookies, a za Twoją zgodą także innych.",
      text: 'Zgodnie z RODO i przepisami ePrivacy nie zapisujemy opcjonalnych plików cookies bez Twojej zgody. Więcej w dokumentach <a href="/pl/cookies/">Cookies</a> i <a href="/pl/polityka-prywatnosci/">Polityka prywatności</a>.',
      acceptAll: "Akceptuj wszystkie", necessaryOnly: "Tylko niezbędne", settings: "Ustawienia",
      modalTitle: "Ustawienia cookies", close: "Zamknij",
      modalLead: "Niezbędne pliki cookies są zawsze aktywne. Pozostałe kategorie włączysz tylko za zgodą. Zgodę możesz zmienić w każdej chwili.",
      necessary: "Niezbędne", necessaryDesc: "Zapewniają działanie strony, zapis Twojej zgody i podstawowe bezpieczeństwo. Nie można ich wyłączyć.",
      functional: "Funkcjonalne", functionalDesc: "PWA / service worker — szybsze ładowanie strony i możliwość dodania jej do ekranu urządzenia.",
      analytics: "Analityczne", analyticsDesc: "Firebase Analytics (Google) — ruch na stronie i zanonimizowane zdarzenia (np. wysłanie formularza, kliknięcia w CTA). Uruchamia się dopiero po wyrażeniu zgody.",
      marketing: "Marketingowe", marketingDesc: "Służą do personalizacji reklam i remarketingu. Obecnie ich nie używamy — kategoria jest przygotowana na przyszłość.",
      save: "Zapisz wybór"
    },
    en: {
      kicker: "Cookies and privacy",
      title: "We use essential cookies and, with your consent, a few others.",
      text: 'In line with the GDPR and ePrivacy rules, we never store optional cookies without your consent. Read more in our <a href="/en/cookies/">Cookie policy</a> and <a href="/en/privacy/">Privacy policy</a>.',
      acceptAll: "Accept all", necessaryOnly: "Essential only", settings: "Settings",
      modalTitle: "Cookie settings", close: "Close",
      modalLead: "Essential cookies are always on. Other categories are enabled only with your consent. You can change your choice at any time.",
      necessary: "Essential", necessaryDesc: "Keep the website working, store your consent and provide basic security. They cannot be switched off.",
      functional: "Functional", functionalDesc: "PWA / service worker — faster page loading and the option to add the site to your home screen.",
      analytics: "Analytics", analyticsDesc: "Firebase Analytics (Google) — page traffic and anonymised events (e.g. form submissions, CTA clicks). Runs only after you consent.",
      marketing: "Marketing", marketingDesc: "Used for ad personalisation and remarketing. We don't use them at the moment — the category is prepared for the future.",
      save: "Save selection"
    }
  }[LANG];

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
          el("p", { className: "cookie-kicker", text: T.kicker }),
          el("h2", { id: "cookieBannerTitle", text: T.title }),
          el("p", {
            id: "cookieBannerText",
            html: T.text
          })
        ]),
        el("div", { className: "cookie-banner-actions" }, [
          el("button", { type: "button", className: "btn btn-primary cookie-btn", text: T.acceptAll, onClick: acceptAll }),
          el("button", { type: "button", className: "btn cookie-btn cookie-btn-ghost", text: T.necessaryOnly, onClick: rejectOptional }),
          el("button", { type: "button", className: "btn cookie-btn cookie-btn-ghost", text: T.settings, onClick: openModal })
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
          el("h2", { id: "cookieModalTitle", text: T.modalTitle }),
          el("button", {
            type: "button",
            className: "cookie-modal-close",
            "aria-label": T.close,
            text: "×",
            onClick: closeModal
          })
        ]),
        el("p", {
          className: "cookie-modal-lead",
          text: T.modalLead
        }),
        el("div", { className: "cookie-categories" }, [
          (() => {
            const input = el("input", { type: "checkbox", id: "cookie-necessary", checked: "true", disabled: "true" });
            checks.necessary = input;
            return el("label", { className: "cookie-category is-locked", for: "cookie-necessary" }, [
              el("span", { className: "cookie-category-top" }, [
                el("span", { className: "cookie-category-title", text: T.necessary }),
                input
              ]),
              el("span", {
                className: "cookie-category-desc",
                text: T.necessaryDesc
              })
            ]);
          })(),
          (() => {
            const input = el("input", { type: "checkbox", id: "cookie-functional" });
            checks.functional = input;
            return el("label", { className: "cookie-category", for: "cookie-functional" }, [
              el("span", { className: "cookie-category-top" }, [
                el("span", { className: "cookie-category-title", text: T.functional }),
                input
              ]),
              el("span", {
                className: "cookie-category-desc",
                text: T.functionalDesc
              })
            ]);
          })(),
          (() => {
            const input = el("input", { type: "checkbox", id: "cookie-analytics" });
            checks.analytics = input;
            return el("label", { className: "cookie-category", for: "cookie-analytics" }, [
              el("span", { className: "cookie-category-top" }, [
                el("span", { className: "cookie-category-title", text: T.analytics }),
                input
              ]),
              el("span", {
                className: "cookie-category-desc",
                text: T.analyticsDesc
              })
            ]);
          })(),
          (() => {
            const input = el("input", { type: "checkbox", id: "cookie-marketing" });
            checks.marketing = input;
            return el("label", { className: "cookie-category", for: "cookie-marketing" }, [
              el("span", { className: "cookie-category-top" }, [
                el("span", { className: "cookie-category-title", text: T.marketing }),
                input
              ]),
              el("span", {
                className: "cookie-category-desc",
                text: T.marketingDesc
              })
            ]);
          })()
        ]),
        el("div", { className: "cookie-modal-actions" }, [
          el("button", { type: "button", className: "btn cookie-btn cookie-btn-ghost", text: T.necessaryOnly, onClick: rejectOptional }),
          el("button", { type: "button", className: "btn btn-primary cookie-btn", text: T.save, onClick: saveSelected }),
          el("button", { type: "button", className: "btn btn-primary cookie-btn", text: T.acceptAll, onClick: acceptAll })
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
