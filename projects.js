(() => {
  const HOME_FEATURED_SLUGS = ["ceko", "br-interior", "skvajnory"];
  const HOME_LIST_SLUGS = [
    "vps-snina",
    "timio",
  ];

  const PROJECTS = [
    {
      slug: "ceko",
      name: "CeKo Interier",
      category: "Interiéry na mieru",
      type: "Webová stránka · Interiéry na mieru",
      result:
        "Moderná prezentácia stolárskej dielne so silným hero, jasnými službami (kuchyne, vstavané skrine, nábytok) a jednoduchou cestou k bezplatnej konzultácii.",
      resultShort:
        "Moderná prezentácia stolárskej dielne so silným hero a jasnou cestou k konzultácii.",
      image: "assets/projects/ceko-hero.jpg",
      alt: "Hero sekcia webu CeKo Interier — kuchyne a nábytok na mieru",
      url: "https://www.ceko.sk/",
      linkLabel: "ceko.sk",
    },
    {
      slug: "skvajnory",
      name: "Športový klub Vajnory",
      category: "Športový klub",
      type: "Webová stránka · Športový klub",
      result:
        "Komunitný web pre hokejbal a areál Alviano — členstvo, tréningy, tréneri a kontakt na jednom mieste. Čitateľná štruktúra pre rodičov aj dospelých hráčov.",
      resultShort:
        "Členstvo, tréningy a kontakt na jednom mieste.",
      image: "assets/projects/skvajnory-hero.jpg",
      alt: "Hero sekcia webu Športový klub Vajnory — hokejbal Bratislava",
      url: "https://skvajnory.sk/",
      linkLabel: "skvajnory.sk",
    },
    {
      slug: "br-interior",
      name: "BR Interior & Exterior",
      category: "Interiérový dizajn",
      type: "Webová stránka · Interiérový dizajn · EN/FR/PL",
      result:
        "Prémiová viacjazyčná stránka pre európske stolárske a dizajnové štúdio — služby, projekty a proces od konceptu po montáž.",
      resultShort:
        "Prémiová viacjazyčná stránka od konceptu po montáž.",
      image: "assets/projects/br-interior-hero.jpg",
      alt: "Hero sekcia webu BR Interior & Exterior — luxury interior design",
      url: "https://br-interiorexterior.com/",
      linkLabel: "br-interiorexterior.com",
    },
    {
      slug: "timio",
      name: "Timio",
      category: "Vlastný digitálny produkt",
      type: "Vlastný digitálny produkt",
      ownProduct: true,
      result:
        "Webová a Android aplikácia pre organizáciu tímových udalostí — tréningy, zápasy, RSVP, kapacita, čakáreň a komunikácia na jednom mieste.",
      resultShort:
        "Organizácia tímových udalostí a komunikácie na jednom mieste.",
      image: "assets/projects/timio-hero.jpg",
      alt: "Hero sekcia Timio — aplikácia na organizáciu tréningov, zápasov a udalostí",
      url: "https://timio.sk/",
      linkLabel: "timio.sk",
      secondaryUrl: "https://app.timio.sk/",
      secondaryLinkLabel: "app.timio.sk",
    },
    {
      slug: "vps-snina",
      name: "Verejnoprospešné služby Snina",
      category: "Mestská spoločnosť",
      type: "Webová stránka · Verejné služby",
      result:
        "Prehľadný informačný web pre mestskú spoločnosť — pohrebné služby, zverejňovanie dokumentov, kontakty a praktické informácie pre obyvateľov Sniny.",
      resultShort:
        "Prehľadný web mestských služieb, dokumentov a kontaktov.",
      image: "assets/projects/vps-snina-hero.png",
      alt: "Hero sekcia webu Verejnoprospešné služby Snina",
      url: "https://beewoy.sk/projekty/idsk/vps-snina/",
      linkLabel: "VPS Snina",
    },
  ];

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const bySlug = Object.fromEntries(PROJECTS.map((project) => [project.slug, project]));

  const mediaHtml = (project, assetBase, className = "project-media") => `
    <div class="${className}">
      <img
        src="${escapeHtml(assetBase + project.image)}"
        alt="${escapeHtml(project.alt)}"
        width="1600"
        height="1000"
        loading="lazy"
        decoding="async"
      >
    </div>`;

  const featuredItem = (project, assetBase) => `
    <a
      class="refs-featured-item"
      href="${escapeHtml(project.url)}"
      rel="noopener noreferrer"
      target="_blank"
    >
      ${mediaHtml(project, assetBase, "refs-featured-media")}
      <div class="refs-featured-copy">
        <h3 class="refs-featured-title">${escapeHtml(project.name)}</h3>
        <span class="refs-featured-cat">${escapeHtml(project.category)}</span>
        <p class="refs-featured-desc">${escapeHtml(project.resultShort)}</p>
      </div>
    </a>`;

  const listRow = (project, assetBase) => `
    <a
      class="refs-row"
      href="${escapeHtml(project.url)}"
      rel="noopener noreferrer"
      target="_blank"
    >
      ${mediaHtml(project, assetBase, "refs-row-thumb")}
      <div class="refs-row-copy">
        <div class="refs-row-head">
          <h3 class="refs-row-title">${escapeHtml(project.name)}</h3>
          <span class="refs-row-cat">${escapeHtml(project.category)}</span>
        </div>
        <p class="refs-row-desc">${escapeHtml(project.resultShort)}</p>
      </div>
      <span class="refs-row-arrow" aria-hidden="true">→</span>
    </a>`;

  const homeShowcase = (assetBase) => {
    const featured = HOME_FEATURED_SLUGS.map((slug) => bySlug[slug]).filter(Boolean);
    const listed = HOME_LIST_SLUGS.map((slug) => bySlug[slug]).filter(Boolean);

    return `
      <div class="refs-featured">
        ${featured.map((project) => featuredItem(project, assetBase)).join("")}
      </div>
      <div class="refs-list" role="list">
        ${listed.map((project) => listRow(project, assetBase)).join("")}
      </div>`;
  };

  const secondaryLiveLink = (project) =>
    project.secondaryUrl
      ? `
          <span aria-hidden="true"> · </span>
          <a href="${escapeHtml(project.secondaryUrl)}" rel="noopener noreferrer" target="_blank">${escapeHtml(project.secondaryLinkLabel || project.secondaryUrl)}</a>`
      : "";

  const pageCard = (project, assetBase) => `
    <article class="ref-card ref-card--page">
      ${mediaHtml(project, assetBase)}
      <div class="ref-card-body">
        <h2 class="ref-card-title">${escapeHtml(project.name)}</h2>
        <span class="project-type">${escapeHtml(project.type)}</span>
        <div class="project-result">
          <strong>Výsledok</strong>
          <p class="ref-card-result">${escapeHtml(project.result)}</p>
        </div>
        <p class="ref-card-live ref-card-footer">
          Live:
          <a href="${escapeHtml(project.url)}" rel="noopener noreferrer" target="_blank">${escapeHtml(project.linkLabel)}</a>
          ${secondaryLiveLink(project)}
        </p>
      </div>
    </article>`;

  const renderMount = (mount) => {
    const mode = mount.getAttribute("data-refs-mount") || "page";
    const assetBase = mount.getAttribute("data-asset-base") || "";

    if (mode === "home") {
      mount.classList.add("refs-showcase");
      mount.innerHTML = homeShowcase(assetBase);
      return;
    }

    mount.classList.add("refs-cards", "refs-cards--page");
    mount.innerHTML = PROJECTS.map((project) => pageCard(project, assetBase)).join("");
  };

  const init = () => {
    document.querySelectorAll("[data-refs-mount]").forEach(renderMount);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  globalThis.BEEWOY_PROJECTS = PROJECTS;
})();
