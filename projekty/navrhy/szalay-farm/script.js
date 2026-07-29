(() => {
  const header = document.querySelector(".siteHeader");
  const menuButton = document.querySelector(".menuButton");
  const mobileMenu = document.querySelector(".mobileMenu");

  const updateHeader = () => {
    header?.classList.toggle("headerScrolled", window.scrollY > 36);
  };

  const setMenu = (open) => {
    header?.classList.toggle("headerMenuOpen", open);
    mobileMenu?.classList.toggle("mobileMenuOpen", open);
    document.body.classList.toggle("menuLocked", open);
    menuButton?.setAttribute("aria-expanded", String(open));
    menuButton?.setAttribute("aria-label", open ? "Zavrieť menu" : "Otvoriť menu");
  };

  menuButton?.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  document.querySelectorAll("[data-reveal]").forEach((element) => {
    element.classList.add("isVisible");
  });

  updateHeader();
})();
