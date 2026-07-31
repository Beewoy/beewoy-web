(() => {
  const tabs = Array.from(document.querySelectorAll("[data-gallery-tab]"));
  const cards = Array.from(document.querySelectorAll(".gallery-card[data-category]"));
  const panel = document.getElementById("gallery-panel");
  const lightbox = document.getElementById("lightbox");
  const dialog = lightbox?.querySelector(".lightbox-dialog");
  const closeButton = lightbox?.querySelector(".lightbox-close");
  const previousButton = lightbox?.querySelector(".lightbox-previous");
  const nextButton = lightbox?.querySelector(".lightbox-next");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxCategory = document.getElementById("lightbox-category");
  const lightboxCount = document.getElementById("lightbox-count");
  let activeCategory = "all";
  let visibleCards = [...cards];
  let activeIndex = 0;
  let previouslyFocused = null;

  const refreshVisibleCards = () => {
    visibleCards = cards.filter((card) => !card.hidden);
  };

  const showCategory = (category, selectedTab) => {
    activeCategory = category;
    tabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab === selectedTab)));
    cards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
    if (panel) {
      panel.setAttribute("aria-labelledby", selectedTab.id);
    }
    refreshVisibleCards();
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => showCategory(tab.dataset.galleryTab, tab));
  });

  const renderLightbox = () => {
    const card = visibleCards[activeIndex];
    const trigger = card?.querySelector(".gallery-open");
    if (!trigger || !lightboxImage) return;

    lightboxImage.src = trigger.dataset.src;
    lightboxImage.alt = trigger.dataset.title;
    lightboxTitle.textContent = trigger.dataset.title;
    lightboxCategory.textContent = trigger.dataset.label;
    lightboxCount.textContent = `${activeIndex + 1} / ${visibleCards.length}`;
    dialog?.setAttribute("aria-label", `Detail realizácie: ${trigger.dataset.title}`);
  };

  const openLightbox = (card) => {
    refreshVisibleCards();
    activeIndex = Math.max(0, visibleCards.indexOf(card));
    previouslyFocused = document.activeElement;
    renderLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lightboxImage) lightboxImage.src = "";
    previouslyFocused?.focus();
  };

  const moveLightbox = (direction) => {
    activeIndex = (activeIndex + direction + visibleCards.length) % visibleCards.length;
    renderLightbox();
  };

  cards.forEach((card) => {
    card.querySelector(".gallery-open")?.addEventListener("click", () => openLightbox(card));
  });

  closeButton?.addEventListener("click", closeLightbox);
  previousButton?.addEventListener("click", () => moveLightbox(-1));
  nextButton?.addEventListener("click", () => moveLightbox(1));

  lightbox?.addEventListener("mousedown", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  window.addEventListener("keydown", (event) => {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveLightbox(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveLightbox(1);
    }
    if (event.key === "Tab") {
      const controls = Array.from(dialog?.querySelectorAll("button") || []);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  });

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => link.closest("details")?.removeAttribute("open"));
  });

  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const project = String(data.get("project") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Dopyt z webu — ${project}`);
    const body = encodeURIComponent(`Meno: ${name}\nTelefón: ${phone}\nTyp projektu: ${project}\n\n${message}`);
    formStatus.textContent = "Otváram e-mail s pripravenou správou…";
    window.location.href = `mailto:emravcova@gmail.com?subject=${subject}&body=${body}`;
  });

  const year = document.getElementById("footer-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
