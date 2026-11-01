(() => {
  const KEY = "beewoy_lang";
  const SESSION_KEY = "beewoy_lang_checked";
  const LANGS = ["sk", "pl", "en"];
  const current = (document.documentElement.lang || "sk").slice(0, 2);

  const read = (store, key) => { try { return store.getItem(key); } catch { return null; } };
  const write = (store, key, value) => { try { store.setItem(key, value); } catch {} };

  const alternate = (lang) =>
    document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)?.getAttribute("href");

  // Slovak and Czech visitors stay on Slovak even when their browser UI is English.
  const detect = () => {
    const codes = (navigator.languages?.length ? navigator.languages : [navigator.language || ""])
      .map((l) => String(l).toLowerCase().slice(0, 2));
    if (codes.some((c) => c === "sk" || c === "cs")) return "sk";
    if (codes.includes("pl")) return "pl";
    return "en";
  };

  const isBot = /bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit/i.test(navigator.userAgent);
  const internal = (() => {
    try { return !!document.referrer && new URL(document.referrer).origin === location.origin; } catch { return false; }
  })();
  const checked = read(sessionStorage, SESSION_KEY) === "1";
  write(sessionStorage, SESSION_KEY, "1");

  if (!isBot && !internal && !checked) {
    const saved = read(localStorage, KEY);
    const wanted = LANGS.includes(saved) ? saved : detect();
    const url = wanted !== current && alternate(wanted);
    if (url) {
      location.replace(url + location.search + location.hash);
      return;
    }
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-lang]");
    if (link) write(localStorage, KEY, link.dataset.lang);
    document.querySelectorAll("details[data-lang-switch][open]").forEach((d) => {
      if (!d.contains(event.target)) d.open = false;
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll("details[data-lang-switch][open]").forEach((d) => {
      d.open = false;
      d.querySelector("summary")?.focus();
    });
  });
})();
