(() => {
  const FIREBASE_VERSION = "12.17.0";
  const firebaseConfig = {
    apiKey: "AIzaSyBPMHHJDUT64ImRLpjomO4oXGJFi6iMklw",
    authDomain: "beewoy-59e34.firebaseapp.com",
    projectId: "beewoy-59e34",
    storageBucket: "beewoy-59e34.firebasestorage.app",
    messagingSenderId: "404471971793",
    appId: "1:404471971793:web:fe61bdd0e106edee262af0",
    measurementId: "G-E9CCZPVP2X"
  };

  let enabled = false;
  let analytics = null;
  let logEventFn = null;
  let initPromise = null;
  let pageViewSent = false;

  const pagePath = () => {
    const path = window.location.pathname || "/";
    return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) || "/" : path;
  };

  const pageTitle = () => document.title || "Beewoy";

  const initFirebase = async () => {
    if (analytics) return analytics;
    if (initPromise) return initPromise;

    initPromise = (async () => {
      try {
        const [{ initializeApp }, analyticsMod] = await Promise.all([
          import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`),
          import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-analytics.js`)
        ]);

        if (!(await analyticsMod.isSupported())) return null;

        const app = initializeApp(firebaseConfig);
        // Manual page_view — avoids duplicate automatic hits and keeps page_path consistent.
        analytics = analyticsMod.initializeAnalytics(app, {
          config: { send_page_view: false }
        });
        logEventFn = analyticsMod.logEvent;
        return analytics;
      } catch {
        analytics = null;
        logEventFn = null;
        return null;
      }
    })();

    return initPromise;
  };

  const sendPageView = () => {
    if (!enabled || !analytics || !logEventFn || pageViewSent) return;
    pageViewSent = true;
    logEventFn(analytics, "page_view", {
      page_title: pageTitle(),
      page_location: window.location.href,
      page_path: pagePath()
    });
  };

  const track = (name, params = {}) => {
    if (!enabled || !name) return;
    initFirebase().then((instance) => {
      if (!instance || !logEventFn || !enabled) return;
      logEventFn(instance, name, params);
    });
  };

  const enable = async () => {
    enabled = true;
    const instance = await initFirebase();
    if (!instance || !enabled) return;
    sendPageView();
  };

  const disable = () => {
    enabled = false;
  };

  const syncConsent = (consent) => {
    if (consent?.analytics) enable();
    else disable();
  };

  const bindUiEvents = () => {
    document.addEventListener("click", (event) => {
      if (!enabled) return;

      const cta = event.target.closest("[data-analytics-cta]");
      if (cta) {
        track("cta_click", {
          cta_id: cta.getAttribute("data-analytics-cta") || "unknown",
          link_url: cta.getAttribute("href") || undefined,
          link_text: (cta.textContent || "").trim().slice(0, 80) || undefined,
          page_path: pagePath()
        });
        return;
      }

      const link = event.target.closest("a[href]");
      if (!link) return;

      try {
        const url = new URL(link.href, window.location.origin);
        if (url.origin === window.location.origin) return;
        track("outbound_click", {
          link_url: url.href,
          link_domain: url.hostname,
          page_path: pagePath()
        });
      } catch {
        /* ignore invalid href */
      }
    });
  };

  const init = () => {
    bindUiEvents();
    syncConsent(window.BeewoyConsent?.get?.() || window.beewoyConsent || null);
    window.addEventListener("beewoy:consent", (event) => syncConsent(event.detail));
  };

  window.BeewoyAnalytics = {
    track,
    pagePath
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
