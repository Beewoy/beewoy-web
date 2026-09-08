const DAYS = [
  ["mon", "Pondelok"],
  ["tue", "Utorok"],
  ["wed", "Streda"],
  ["thu", "Štvrtok"],
  ["fri", "Piatok"],
  ["sat", "Sobota"],
];

const orderState = {
  step: 1,
  products: [],
  selected: new Set(),
  quantities: {},
};

const orderForm = document.querySelector("#order-form");
const nextButton = document.querySelector("#order-next");
const backButton = document.querySelector("#order-back");
const submitButton = document.querySelector("#order-submit");
const downloadButton = document.querySelector("#order-download");
const productList = document.querySelector("#product-list");
const scheduleList = document.querySelector("#schedule-list");
const selectedCount = document.querySelector("#selected-count");
const searchInput = document.querySelector("#product-search");
const categorySelect = document.querySelector("#product-category");
const toast = document.querySelector("#order-toast");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setDefaultWeek() {
  const input = document.querySelector("#week-start");
  if (input.value) return;
  const date = new Date();
  const day = date.getDay();
  const daysUntilMonday = day === 0 ? 1 : day === 1 ? 7 : 8 - day;
  date.setDate(date.getDate() + daysUntilMonday);
  input.value = date.toISOString().slice(0, 10);
}

function updateOpenState() {
  const target = document.querySelector("#open-state");
  if (!target) return;
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Bratislava",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const dayIndex = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 }[values.weekday];
  const minutes = Number(values.hour) * 60 + Number(values.minute);
  const closes = dayIndex === 6 ? 12 * 60 : 18 * 60;
  const opensToday = dayIndex >= 1 && dayIndex <= 6;
  const isOpen = opensToday && minutes >= 5 * 60 + 30 && minutes < closes;

  if (isOpen) {
    target.textContent = `Dnes otvorené do ${dayIndex === 6 ? "12:00" : "18:00"}`;
    return;
  }

  if (dayIndex === 0) {
    target.textContent = "Dnes zatvorené";
  } else if (minutes < 5 * 60 + 30) {
    target.textContent = "Dnes otvoríme o 5:30";
  } else if (dayIndex === 6) {
    target.textContent = "Dnes zatvorené";
  } else {
    target.textContent = "Dnes zatvorené";
  }
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.textContent = open ? "Menu" : "Zavrieť";
    nav.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  nav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
}

function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function productLabel(product) {
  return `${product.weight} g, ${product.crate} ks. v prepravke`;
}

function countLabel(count) {
  if (count === 1) return "1 produkt";
  if (count >= 2 && count <= 4) return `${count} produkty`;
  return `${count} produktov`;
}

function saveDraft() {
  const fields = Object.fromEntries(new FormData(orderForm).entries());
  try {
    localStorage.setItem(
      "takac-order-draft-v1",
      JSON.stringify({ fields, selected: [...orderState.selected], quantities: orderState.quantities })
    );
  } catch {
    return;
  }
}

function restoreDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem("takac-order-draft-v1"));
    if (!draft) return;
    Object.entries(draft.fields || {}).forEach(([name, value]) => {
      const field = orderForm.elements.namedItem(name);
      if (field) field.value = value;
    });
    orderState.selected = new Set(draft.selected || []);
    orderState.quantities = draft.quantities || {};
  } catch {
    localStorage.removeItem("takac-order-draft-v1");
  }
}

function populateCategories() {
  const categories = [...new Set(orderState.products.map((product) => product.category))].sort((a, b) => a.localeCompare(b, "sk"));
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  });
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("sk");
  const category = categorySelect.value;
  const filtered = orderState.products.filter((product) => {
    const matchesQuery = product.name.toLocaleLowerCase("sk").includes(query);
    return matchesQuery && (!category || product.category === category);
  });

  selectedCount.textContent = countLabel(orderState.selected.size);

  if (!filtered.length) {
    productList.innerHTML = '<div class="empty-state">Pre zadané filtre sme nenašli žiadny produkt.</div>';
    return;
  }

  productList.innerHTML = filtered
    .map((product) => {
      const selected = orderState.selected.has(product.id);
      return `
        <article class="picker-item">
          <div>
            <strong>${escapeHtml(product.name)}</strong>
            <span class="picker-meta">${escapeHtml(product.category)} / ${escapeHtml(productLabel(product))}</span>
          </div>
          <button class="picker-add${selected ? " is-selected" : ""}" type="button" data-product-id="${product.id}" aria-pressed="${selected}">
            ${selected ? "Pridané" : "Pridať"}
          </button>
        </article>`;
    })
    .join("");
}

function toggleProduct(productId) {
  if (orderState.selected.has(productId)) {
    orderState.selected.delete(productId);
    delete orderState.quantities[productId];
  } else {
    orderState.selected.add(productId);
    orderState.quantities[productId] ||= {};
  }
  renderProducts();
  saveDraft();
}

function renderSchedule() {
  const products = orderState.products.filter((product) => orderState.selected.has(product.id));
  scheduleList.innerHTML = products
    .map((product) => {
      const dayFields = DAYS.map(([key, label]) => {
        const first = orderState.quantities[product.id]?.[`${key}1`] || "";
        const second = orderState.quantities[product.id]?.[`${key}2`] || "";
        return `
          <div class="day-order">
            <strong>${label}</strong>
            <label class="quantity-field">1. rozvoz
              <input class="quantity-input" type="number" min="0" step="1" inputmode="numeric" value="${escapeHtml(first)}" data-product-id="${product.id}" data-slot="${key}1" aria-label="${escapeHtml(product.name)}, ${label}, prvý rozvoz">
            </label>
            <label class="quantity-field">2. rozvoz
              <input class="quantity-input" type="number" min="0" step="1" inputmode="numeric" value="${escapeHtml(second)}" data-product-id="${product.id}" data-slot="${key}2" aria-label="${escapeHtml(product.name)}, ${label}, druhý rozvoz">
            </label>
          </div>`;
      }).join("");

      return `
        <article class="schedule-product">
          <div class="schedule-product-head">
            <h4>${escapeHtml(product.name)}</h4>
            <span>${escapeHtml(productLabel(product))}</span>
          </div>
          <div class="day-grid">${dayFields}</div>
        </article>`;
    })
    .join("");
}

function nonZeroEntries(productId) {
  return DAYS.flatMap(([key, label]) => [
    [label, "1. rozvoz", Number(orderState.quantities[productId]?.[`${key}1`] || 0)],
    [label, "2. rozvoz", Number(orderState.quantities[productId]?.[`${key}2`] || 0)],
  ]).filter((entry) => entry[2] > 0);
}

function renderReview() {
  const formData = new FormData(orderForm);
  const selectedProducts = orderState.products.filter((product) => orderState.selected.has(product.id));
  const productMarkup = selectedProducts
    .map((product) => {
      const entries = nonZeroEntries(product.id);
      if (!entries.length) return "";
      return `
        <article class="review-product">
          <strong>${escapeHtml(product.name)} (${escapeHtml(product.weight)} g)</strong>
          <p>${entries.map(([day, round, quantity]) => `${day}: ${round} ${quantity} ks.`).join(" / ")}</p>
        </article>`;
    })
    .join("");

  document.querySelector("#order-review").innerHTML = `
    <div class="review-details">
      <p><strong>${escapeHtml(formData.get("company"))}</strong></p>
      <p><span>Kontakt:</span> ${escapeHtml(formData.get("contactPerson"))}, ${escapeHtml(formData.get("phone"))}</p>
      <p><span>Doručenie:</span> ${escapeHtml(formData.get("deliveryAddress"))}</p>
      <p><span>Týždeň od:</span> ${escapeHtml(formatDate(formData.get("weekStart")))}</p>
    </div>
    <div class="review-products">${productMarkup}</div>`;
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("sk-SK", { day: "2-digit", month: "2-digit", year: "numeric" }).format(
    new Date(`${value}T12:00:00`)
  );
}

function clearFieldError(field) {
  field.removeAttribute("aria-invalid");
  const target = document.querySelector(`#${field.id}-error`);
  if (target) target.textContent = "";
}

function setFieldError(field, message) {
  field.setAttribute("aria-invalid", "true");
  const target = document.querySelector(`#${field.id}-error`);
  if (target) target.textContent = message;
}

function validateContact() {
  const requiredIds = ["company", "contact-person", "email", "phone", "delivery-address", "week-start"];
  let valid = true;
  let firstInvalid = null;

  requiredIds.forEach((id) => {
    const field = document.querySelector(`#${id}`);
    clearFieldError(field);
    if (!field.value.trim()) {
      setFieldError(field, "Vyplňte toto pole.");
      firstInvalid ||= field;
      valid = false;
    } else if (field.type === "email" && !field.validity.valid) {
      setFieldError(field, "Zadajte platnú e-mailovú adresu.");
      firstInvalid ||= field;
      valid = false;
    }
  });

  firstInvalid?.focus();
  return valid;
}

function validateStep() {
  if (orderState.step === 1) return validateContact();
  if (orderState.step === 2) {
    const error = document.querySelector("#products-error");
    const valid = orderState.selected.size > 0;
    error.textContent = valid ? "" : "Vyberte aspoň jeden produkt.";
    if (!valid) productList.focus?.();
    return valid;
  }
  if (orderState.step === 3) {
    const hasQuantity = [...orderState.selected].some((productId) => nonZeroEntries(productId).length > 0);
    document.querySelector("#quantities-error").textContent = hasQuantity ? "" : "Vyplňte aspoň jedno množstvo.";
    return hasQuantity;
  }
  return true;
}

function showStep(step) {
  orderState.step = Math.max(1, Math.min(4, step));
  document.querySelectorAll(".form-step").forEach((panel) => {
    const active = Number(panel.dataset.step) === orderState.step;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });
  document.querySelectorAll("[data-step-indicator]").forEach((indicator) => {
    const value = Number(indicator.dataset.stepIndicator);
    indicator.classList.toggle("is-active", value === orderState.step);
    indicator.classList.toggle("is-complete", value < orderState.step);
    if (value === orderState.step) indicator.setAttribute("aria-current", "step");
    else indicator.removeAttribute("aria-current");
  });
  backButton.hidden = orderState.step === 1;
  nextButton.hidden = orderState.step === 4;
  submitButton.hidden = orderState.step !== 4;
  downloadButton.hidden = orderState.step !== 4;

  if (orderState.step === 2) renderProducts();
  if (orderState.step === 3) renderSchedule();
  if (orderState.step === 4) renderReview();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  requestAnimationFrame(() => {
    document.querySelector(".order-shell").scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
  });
}

function buildOrderText() {
  const data = new FormData(orderForm);
  const lines = [
    "TÝŽDENNÁ OBJEDNÁVKA",
    "",
    `Firma: ${data.get("company")}`,
    `IČO: ${data.get("companyId") || "neuvedené"}`,
    `Kontaktná osoba: ${data.get("contactPerson")}`,
    `E-mail: ${data.get("email")}`,
    `Telefón: ${data.get("phone")}`,
    `Adresa doručenia: ${data.get("deliveryAddress")}`,
    `Týždeň od: ${formatDate(data.get("weekStart"))}`,
    `Poznámka: ${data.get("note") || "bez poznámky"}`,
    "",
    "PRODUKTY A MNOŽSTVÁ",
  ];

  orderState.products
    .filter((product) => orderState.selected.has(product.id))
    .forEach((product) => {
      const entries = nonZeroEntries(product.id);
      if (!entries.length) return;
      lines.push("", `${product.name} (${product.weight} g, ${product.crate} ks. v prepravke)`);
      entries.forEach(([day, round, quantity]) => lines.push(`  ${day}, ${round}: ${quantity} ks.`));
    });

  lines.push("", "Objednávku pripravil webový formulár Pekárne Takáč a syn.");
  return lines.join("\n");
}

function downloadOrder() {
  const data = new FormData(orderForm);
  const file = new Blob([buildOrderText()], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  const company = String(data.get("company")).replace(/[^a-z0-9áäčďéíľĺňóôŕšťúýž]+/gi, "-").replace(/^-|-$/g, "");
  link.href = url;
  link.download = `objednavka-${company || "partner"}-${data.get("weekStart")}.txt`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Text objednávky bol stiahnutý.");
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 5200);
}

async function loadProducts() {
  productList.innerHTML = '<div class="empty-state">Načítavam sortiment.</div>';
  try {
    const response = await fetch("assets/data/products.json");
    if (!response.ok) throw new Error("Product request failed");
    orderState.products = await response.json();
    populateCategories();
    renderProducts();
    return true;
  } catch {
    orderState.products = [];
    productList.innerHTML = '<div class="empty-state">Sortiment sa nepodarilo načítať. Spustite stránku cez lokálny server alebo použite Excel.</div>';
    return false;
  }
}

function setupOrderForm() {
  restoreDraft();
  setDefaultWeek();
  loadProducts();

  orderForm.addEventListener("input", (event) => {
    if (event.target.matches(".quantity-input")) {
      const { productId, slot } = event.target.dataset;
      orderState.quantities[productId] ||= {};
      orderState.quantities[productId][slot] = event.target.value;
    } else if (event.target.id) {
      clearFieldError(event.target);
    }
    saveDraft();
  });

  productList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-id]");
    if (button) toggleProduct(button.dataset.productId);
  });

  searchInput.addEventListener("input", renderProducts);
  categorySelect.addEventListener("change", renderProducts);

  nextButton.addEventListener("click", async () => {
    if (!validateStep()) return;
    if (orderState.step === 1 && orderState.products.length === 0) {
      const loaded = await loadProducts();
      if (!loaded) {
        showToast("Sortiment sa nepodarilo načítať. Spustite stránku cez lokálny server alebo použite Excel.");
        return;
      }
    }
    showStep(orderState.step + 1);
  });

  backButton.addEventListener("click", () => showStep(orderState.step - 1));
  downloadButton.addEventListener("click", downloadOrder);

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateStep()) return;
    const data = new FormData(orderForm);
    const subject = `Týždenná objednávka - ${data.get("company")} - ${formatDate(data.get("weekStart"))}`;
    const mailto = `mailto:takacasyn@palmsoft.sk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildOrderText())}`;
    window.location.href = mailto;
    showToast("Objednávka je pripravená v e-mailovej aplikácii. Skontrolujte ju a odošlite.");
  });

  document.querySelectorAll("[data-order-filter]").forEach((link) => {
    link.addEventListener("click", () => {
      categorySelect.value = link.dataset.orderFilter;
      renderProducts();
    });
  });
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
setupNavigation();
setupReveal();
updateOpenState();
setupOrderForm();
