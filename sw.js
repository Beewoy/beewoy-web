/* Beewoy shell cache — offline-friendly PWA */
const CACHE = "beewoy-v50";
const ASSETS = [
  "./",
  "./index.html",
  "./kontakt/",
  "./kontakt/index.html",
  "./referencie/",
  "./referencie/index.html",
  "./tvorba-webov/",
  "./tvorba-webov/index.html",
  "./tvorba-webov/hero-dark.css",
  "./tvorba-webov/og-tvorba-webov.jpg",
  "./styles.css",
  "./fonts/manrope-latin.woff2",
  "./fonts/manrope-latin-ext.woff2",
  "./fonts/dm-sans-latin.woff2",
  "./fonts/dm-sans-latin-ext.woff2",
  "./main.js",
  "./projects.js",
  "./cookies.js",
  "./analytics.js",
  "./logo.svg",
  "./favicon.ico",
  "./og-image.png",
  "./team/david-k-portrait-v2.webp",
  "./team/tibor-a-portrait.webp",
  "./manifest.webmanifest",
  "./cookies/",
  "./cookies/index.html",
  "./ochrana-udajov/",
  "./ochrana-udajov/index.html",
  "./icons/favicon.svg",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isHtmlNavigation(request) {
  if (request.mode === "navigate") return true;
  const accept = request.headers.get("accept") || "";
  return accept.includes("text/html");
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // HTML: network-first so deploys show up promptly
  if (isHtmlNavigation(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
