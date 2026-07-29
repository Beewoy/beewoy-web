const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Zavrieť menu" : "Otvoriť menu");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Otvoriť menu");
    });
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    projectCards.forEach((card) => {
      const visible = selected === "Všetky" || card.dataset.category === selected;
      card.hidden = !visible;
    });
  });
});

const inquiryForm = document.querySelector(".inquiry-form");

if (inquiryForm) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(inquiryForm);
    const project = String(data.get("project") || "stavebné práce");
    const body = [
      `Meno: ${data.get("name") || ""}`,
      `E-mail: ${data.get("email") || ""}`,
      `Telefón: ${data.get("phone") || ""}`,
      `Typ projektu: ${project}`,
      "",
      String(data.get("message") || ""),
    ].join("\n");

    window.location.href =
      `mailto:info@strictly.sk?subject=${encodeURIComponent(`Dopyt z webu – ${project}`)}` +
      `&body=${encodeURIComponent(body)}`;
  });
}
