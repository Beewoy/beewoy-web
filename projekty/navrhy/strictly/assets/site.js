const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const form = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const mapButton = document.querySelector("[data-map-load]");
const mapContainer = document.querySelector("[data-map]");
const metricsSection = document.querySelector("[data-metrics]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const closeMenu = () => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

menuButton?.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(willOpen));
  navigation?.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("nav-open", willOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

requestAnimationFrame(() => {
  document.body.classList.add("is-ready");
});

const animateCount = (element, target) => {
  if (reducedMotion) {
    element.textContent = String(target);
    return;
  }

  element.textContent = "0";
  const duration = target > 100 ? 1600 : 1100;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const startMetrics = () => {
  if (!metricsSection || metricsSection.classList.contains("is-counted")) return;
  metricsSection.classList.add("is-counted");
  metricsSection.querySelectorAll("[data-count]").forEach((node) => {
    const target = Number(node.getAttribute("data-count"));
    if (Number.isFinite(target)) animateCount(node, target);
  });
};

if (metricsSection) {
  if (reducedMotion || !("IntersectionObserver" in window)) {
    startMetrics();
  } else {
    const metricsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startMetrics();
            metricsObserver.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    metricsObserver.observe(metricsSection);
  }
}

const revealElements = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}

const sectionIds = ["sluzby", "realizacie", "o-nas", "referencie", "postup", "kontakt"];
const navLinks = [...(navigation?.querySelectorAll("a") || [])];

const updateActiveNav = () => {
  const offset = window.scrollY + 120;
  let current = "";

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= offset) current = id;
  });

  navLinks.forEach((link) => {
    const isActive = current && link.getAttribute("href") === `#${current}`;
    link.classList.toggle("is-active", Boolean(isActive));
  });
};

updateActiveNav();
window.addEventListener("scroll", updateActiveNav, { passive: true });

document.querySelectorAll(".faq-list details").forEach((details) => {
  details.addEventListener("toggle", () => {
    if (!details.open) return;
    const list = details.parentElement;
    list?.querySelectorAll("details[open]").forEach((item) => {
      if (item !== details) item.open = false;
    });
  });
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const subject = `Dopyt z webu — ${data.get("service") || "stavebné práce"}`;
  const body = [
    `Meno: ${data.get("name") || ""}`,
    `Telefón: ${data.get("phone") || ""}`,
    `E-mail: ${data.get("email") || ""}`,
    `Typ projektu: ${data.get("service") || ""}`,
    `Lokalita: ${data.get("location") || ""}`,
    "",
    "Opis projektu:",
    data.get("message") || ""
  ].join("\n");

  if (formStatus) {
    formStatus.textContent = "Otváram správu pre info@strictly.sk vo vašej e-mailovej aplikácii.";
  }

  window.location.href = `mailto:info@strictly.sk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

mapButton?.addEventListener("click", () => {
  if (!mapContainer || mapContainer.querySelector("iframe")) return;

  const iframe = document.createElement("iframe");
  iframe.title = "Mapa prevádzky STRICTLY, Boldocká cesta 375, Senec";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.allowFullscreen = true;
  iframe.src = "https://www.google.com/maps?q=Boldock%C3%A1%20cesta%20375%2C%20903%2001%20Senec&output=embed";
  mapContainer.appendChild(iframe);
});
