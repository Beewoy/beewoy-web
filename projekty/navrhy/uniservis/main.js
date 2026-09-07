(() => {
  "use strict";

  const configElement = document.getElementById("site-config");
  let siteConfig;

  try {
    siteConfig = Object.freeze(JSON.parse(configElement?.textContent || "{}"));
  } catch (error) {
    console.error("Konfiguráciu webu sa nepodarilo načítať.", error);
    siteConfig = Object.freeze({});
  }

  const readConfigValue = (path) => {
    if (path === "addressLine2") {
      return [siteConfig.address?.postalCode, siteConfig.address?.city].filter(Boolean).join(" ");
    }

    if (path === "ratingSummary") return `${siteConfig.googleRating}/5 na Google`;
    if (path === "reviewSummary") return `${siteConfig.googleReviewCount} recenzií`;
    if (path === "ratingTitle") return `Zákazníci nás hodnotia ${siteConfig.googleRating} z 5`;
    if (path === "ratingReviewText") return `Na základe ${siteConfig.googleReviewCount} recenzií na Google.`;

    return path.split(".").reduce((value, key) => value?.[key], siteConfig) ?? "";
  };

  const bindSiteConfig = () => {
    document.querySelectorAll("[data-site]").forEach((element) => {
      element.textContent = readConfigValue(element.dataset.site);
    });

    document.querySelectorAll("[data-phone-link]").forEach((link) => {
      if (siteConfig.phoneHref) link.href = siteConfig.phoneHref;
    });

    document.querySelectorAll("[data-email-link]").forEach((link) => {
      if (!siteConfig.email) return;
      const subject = link.dataset.emailSubject;
      link.href = `mailto:${siteConfig.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
    });

    document.querySelectorAll("[data-maps-link]").forEach((link) => {
      if (siteConfig.googleMapsUrl) link.href = siteConfig.googleMapsUrl;
    });

    document.querySelectorAll("[data-directions-link]").forEach((link) => {
      if (siteConfig.googleDirectionsUrl) link.href = siteConfig.googleDirectionsUrl;
    });

    const mapEmbed = document.querySelector("[data-map-embed]");
    if (mapEmbed && siteConfig.googleMapEmbedUrl) mapEmbed.src = siteConfig.googleMapEmbedUrl;

    const ratingLabel = document.querySelector("[data-rating-label]");
    if (ratingLabel) ratingLabel.setAttribute("aria-label", `Hodnotenie ${siteConfig.googleRating} z 5`);

    const openingHours = document.querySelector("[data-opening-hours]");
    const openingHoursValue = document.querySelector("[data-opening-hours-value]");
    if (openingHours && openingHoursValue && String(siteConfig.openingHours || "").trim()) {
      openingHoursValue.textContent = siteConfig.openingHours;
      openingHours.hidden = false;
    }

    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });
  };

  const configureSeo = () => {
    const productionUrl = String(siteConfig.productionUrl || "").trim();
    const canonical = document.getElementById("canonical-url");

    if (productionUrl) {
      canonical.href = productionUrl;
      const openGraphUrl = document.createElement("meta");
      openGraphUrl.setAttribute("property", "og:url");
      openGraphUrl.content = productionUrl;
      document.head.append(openGraphUrl);

      const openGraphImage = document.createElement("meta");
      openGraphImage.setAttribute("property", "og:image");
      openGraphImage.content = new URL("assets/images/stavebna-technika.jpg", productionUrl).href;
      document.head.append(openGraphImage);
    } else {
      canonical?.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      name: siteConfig.name,
      telephone: String(siteConfig.phoneHref || "").replace("tel:", ""),
      email: siteConfig.email,
      foundingDate: siteConfig.founded,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address?.street,
        postalCode: siteConfig.address?.postalCode,
        addressLocality: siteConfig.address?.city,
        addressCountry: siteConfig.address?.country
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(siteConfig.googleRating || "").replace(",", "."),
        bestRating: "5",
        ratingCount: siteConfig.googleReviewCount
      },
      sameAs: siteConfig.googleMapsUrl ? [siteConfig.googleMapsUrl] : undefined,
      url: productionUrl || undefined
    };

    const structuredDataElement = document.getElementById("business-structured-data");
    if (structuredDataElement) {
      structuredDataElement.textContent = JSON.stringify(structuredData);
    }
  };

  const initMenu = () => {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-menu]");
    if (!toggle || !menu) return;

    const setMenu = (open, returnFocus = false) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector(".sr-only").textContent = open ? "Zatvoriť menu" : "Otvoriť menu";
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      if (returnFocus) toggle.focus();
    };

    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false, true);
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const handleDesktop = (event) => {
      if (event.matches) setMenu(false);
    };
    desktopQuery.addEventListener?.("change", handleDesktop);
  };

  const initReveal = () => {
    const elements = [...document.querySelectorAll(".reveal")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
  };

  const validators = {
    problem: (value) => {
      if (!value.trim()) return "Popíšte, čo potrebuje servis.";
      if (value.trim().length < 10) return "Doplňte aspoň 10 znakov, aby bol problém zrozumiteľný.";
      return "";
    },
    phone: (value) => {
      const digits = value.replace(/\D/g, "");
      if (!value.trim()) return "Zadajte telefónne číslo.";
      if (digits.length < 9 || digits.length > 15) return "Skontrolujte formát telefónneho čísla.";
      return "";
    },
    email: (value) => {
      if (!value.trim()) return "";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Zadajte platnú e-mailovú adresu.";
    }
  };

  const initForm = () => {
    const form = document.getElementById("inquiry-form");
    if (!form) return;

    const notice = document.getElementById("form-notice");
    const submitButton = form.querySelector("button[type='submit']");
    const validatedFields = Object.keys(validators).map((name) => form.elements.namedItem(name)).filter(Boolean);

    const showFieldError = (field, message) => {
      const wrapper = field.closest(".field");
      const error = document.getElementById(`${field.id}-error`);
      wrapper?.classList.toggle("has-error", Boolean(message));
      field.setAttribute("aria-invalid", String(Boolean(message)));
      if (error) error.textContent = message;
    };

    const validateField = (field) => {
      const message = validators[field.name]?.(field.value) || "";
      showFieldError(field, message);
      return !message;
    };

    validatedFields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") validateField(field);
      });
    });

    const setLoading = (loading) => {
      form.dataset.submitting = String(loading);
      submitButton.disabled = loading;
      submitButton.classList.toggle("is-loading", loading);
      submitButton.setAttribute("aria-busy", String(loading));
    };

    const showNotice = (message, type = "error") => {
      notice.textContent = message;
      notice.classList.toggle("is-success", type === "success");
      notice.hidden = false;
      notice.focus({ preventScroll: true });
    };

    const submitInquiry = async (payload) => {
      if (!siteConfig.formEndpoint) {
        await new Promise((resolve) => window.setTimeout(resolve, 350));
        const error = new Error("Formulár zatiaľ nemá nakonfigurované online odoslanie. Zavolajte nám alebo použite e-mailový odkaz pod formulárom.");
        error.code = "FORM_NOT_CONFIGURED";
        throw error;
      }

      const response = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Dopyt sa nepodarilo odoslať. Skúste to znova alebo nás kontaktujte telefonicky.");
      }

      return response;
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (form.dataset.submitting === "true") return;

      notice.hidden = true;
      const invalidField = validatedFields.find((field) => !validateField(field));
      validatedFields.forEach((field) => validateField(field));

      if (invalidField) {
        showNotice("Skontrolujte označené polia a doplňte povinné údaje.");
        invalidField.focus();
        return;
      }

      setLoading(true);
      const payload = Object.fromEntries(new FormData(form).entries());

      try {
        await submitInquiry(payload);
        form.reset();
        validatedFields.forEach((field) => showFieldError(field, ""));
        showNotice("Servisný dopyt bol úspešne odoslaný. Ozveme sa vám na uvedený telefón.", "success");
      } catch (error) {
        showNotice(error.message || "Dopyt sa nepodarilo odoslať. Skúste to znova alebo zavolajte na uvedené číslo.");
      } finally {
        setLoading(false);
      }
    });
  };

  bindSiteConfig();
  configureSeo();
  initMenu();
  initReveal();
  initForm();
})();
