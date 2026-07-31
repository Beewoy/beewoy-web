(() => {
  const FIREBASE_VERSION = "12.17.0";
  const CONSENT_KEY = "beewoy_consent";
  const CONSENT_VERSION = 1;
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

  const proposalMeta = () => {
    const match = pagePath().match(/^\/projekty\/navrhy\/([^/]+)(?:\/(.*))?$/);
    if (!match) return null;
    const proposalId = match[1];
    const subpath = match[2] || "";
    return {
      content_group: "navrh",
      proposal_id: proposalId,
      proposal_page: subpath ? `${proposalId}/${subpath}` : proposalId
    };
  };

  const readStoredConsent = () => {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || data.v !== CONSENT_VERSION) return null;
      return data;
    } catch {
      return null;
    }
  };

  const currentConsent = () =>
    window.BeewoyConsent?.get?.() || window.beewoyConsent || readStoredConsent();

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

  const baseParams = () => {
    const proposal = proposalMeta();
    return {
      page_title: pageTitle(),
      page_location: window.location.href,
      page_path: pagePath(),
      ...(proposal || {})
    };
  };

  const sendPageView = () => {
    if (!enabled || !analytics || !logEventFn || pageViewSent) return;
    pageViewSent = true;
    const params = baseParams();
    logEventFn(analytics, "page_view", params);
    if (params.proposal_id) {
      logEventFn(analytics, "proposal_view", {
        proposal_id: params.proposal_id,
        proposal_page: params.proposal_page,
        page_path: params.page_path,
        page_title: params.page_title
      });
    }
  };

  const track = (name, params = {}) => {
    if (!enabled || !name) return;
    initFirebase().then((instance) => {
      if (!instance || !logEventFn || !enabled) return;
      logEventFn(instance, name, { ...baseParams(), ...params });
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
          link_text: (cta.textContent || "").trim().slice(0, 80) || undefined
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
          link_domain: url.hostname
        });
      } catch {
        /* ignore invalid href */
      }
    });
  };

  const init = () => {
    bindUiEvents();
    syncConsent(currentConsent());
    window.addEventListener("beewoy:consent", (event) => syncConsent(event.detail));
  };

  window.BeewoyAnalytics = {
    track,
    pagePath,
    proposalMeta
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
