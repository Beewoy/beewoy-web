const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const navigationLinks = navigation ? navigation.querySelectorAll("a") : [];

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Otvoriť menu");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Otvoriť menu" : "Zavrieť menu");
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 840) closeMenu();
  });
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const lightbox = document.querySelector("[data-lightbox-dialog]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const projectButtons = document.querySelectorAll("[data-lightbox]");

const closeLightbox = () => {
  if (!lightbox || !lightbox.open) return;
  lightbox.close();
  document.body.classList.remove("lightbox-open");
};

if (lightbox && lightboxImage && lightboxCaption) {
  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const source = button.dataset.lightbox;
      const caption = button.dataset.caption || "";
      lightboxImage.src = source;
      lightboxImage.alt = caption;
      lightboxCaption.textContent = caption;
      lightbox.showModal();
      document.body.classList.add("lightbox-open");
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener("cancel", () => {
    document.body.classList.remove("lightbox-open");
  });
}

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") || "";
    const phone = formData.get("phone") || "";
    const email = formData.get("email") || "";
    const service = formData.get("service") || "";
    const message = formData.get("message") || "";

    const subject = `Dopyt z webu – ${service}`;
    const body = [
      `Meno: ${name}`,
      `Telefón: ${phone}`,
      `E-mail: ${email}`,
      `Služba: ${service}`,
      "",
      "Popis projektu:",
      message
    ].join("\n");

    window.location.href = `mailto:ostrovsky.juraj@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
