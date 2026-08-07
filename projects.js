(() => {
  const HOME_FEATURED_SLUGS = ["ceko", "br-interior", "jessu-redizajn"];
  const HOME_LIST_SLUGS = ["club-bar-brodske", "due-fratelli-redesign", "rutyvet-redizajn"];

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
      url: "https://brinteriorexterior.netlify.app/en",
      linkLabel: "brinteriorexterior.netlify.app",
    },
    {
      slug: "magic-ranch",
      name: "Magic Ranch Čáry",
      category: "Jazdecký areál",
      type: "Webová stránka · Jazdecký areál",
      result:
        "Pokojná a autentická prezentácia jazdeckého areálu v Čároch — ustajnenie koní, jazdecký výcvik, tábory a zážitky pre deti aj dospelých.",
      resultShort:
        "Prezentačný web areálu, výcviku a táborov.",
      image: "assets/projects/magic-ranch-hero.jpg",
      alt: "Hero sekcia webu Magic Ranch Čáry — jazdecký areál a výcvik koní",
      url: "https://davidkolisek.netlify.app/clients/magicranchcary/",
      linkLabel: "Magic Ranch Čáry",
    },
    {
      slug: "jessu-redizajn",
      name: "Autoservis JESSU",
      category: "Autoservis",
      type: "Webová stránka · Autoservis a pneuservis",
      result:
        "Výrazný redizajn webu pre autoservis a pneuservis v Holíči — služby, dôvody na výber, kontakt a priama cesta k rezervácii termínu.",
      resultShort:
        "Redizajn webu autoservisu s jednoduchou rezerváciou termínu.",
      image: "assets/projects/jessu-redizajn-hero.jpg",
      alt: "Hero sekcia redizajnu webu Autoservis JESSU v Holíči",
      url: "https://tiborantal.netlify.app/projects/7/jessu-redizajn.html",
      linkLabel: "JESSU redizajn",
    },
    {
      slug: "vyskladaj-redesign",
      name: "Vyskladaj",
      category: "Pekáreň a catering",
      type: "Webová stránka · Pekáreň a catering",
      result:
        "Hrejivá prezentácia pekárne a kaviarne v Ružinove — čerstvé pečivo, raňajkové krabičky, catering a jednoduché objednanie ponuky.",
      resultShort:
        "Web pekárne a kaviarne s ponukou raňajok, krabičiek a cateringu.",
      image: "assets/projects/vyskladaj-redesign-hero.jpg",
      alt: "Hero sekcia redizajnu webu Vyskladaj — pekáreň, kaviareň a catering",
      url: "https://tiborantal.netlify.app/projects/5/vyskladaj-redesign.html",
      linkLabel: "Vyskladaj redizajn",
    },
    {
      slug: "club-bar-brodske",
      name: "Club Bar Brodské",
      category: "Bar a kaviareň",
      type: "Webová stránka · Bar a kaviareň",
      result:
        "Atmosférický web pre lokálny bar a kaviareň v Brodskom — ponuka, galéria, rezervácia stola a spojenie dennej kávy s večerným programom.",
      resultShort:
        "Atmosférická prezentácia baru s ponukou, galériou a rezerváciou.",
      image: "assets/projects/club-bar-brodske-hero.jpg",
      alt: "Hero sekcia webu Club Bar Brodské — kaviareň a nočný bar",
      url: "https://davidkolisek.netlify.app/clients/clubbarbrodske/",
      linkLabel: "Club Bar Brodské",
    },
    {
      slug: "due-fratelli-redesign",
      name: "Due Fratelli",
      category: "Motocykle a servis",
      type: "Webová stránka · Motocykle a servis",
      result:
        "Dynamický redizajn pre predajcu motocyklov, skútrov a štvorkoliek — skladové vozidlá, servis, predajne a výrazná cesta ku kontaktu.",
      resultShort:
        "Web predajcu motocyklov so skladovou ponukou a servisom.",
      image: "assets/projects/due-fratelli-redesign-hero.jpg",
      alt: "Hero sekcia redizajnu webu Due Fratelli — predaj a servis motocyklov",
      url: "https://tiborantal.netlify.app/projects/8/due-fratelli-redesign",
      linkLabel: "Due Fratelli redizajn",
    },
    {
      slug: "rutyvet-redizajn",
      name: "RutyVet",
      category: "Veterinárna ambulancia",
      type: "Webová stránka · Veterinárna ambulancia",
      result:
        "Dôveryhodná prezentácia veterinárnej ambulancie v Karlovej Vsi — služby, tím, ordinačné hodiny a jednoduchá žiadosť o termín.",
      resultShort:
        "Dôveryhodný web ambulancie s objednávkovým formulárom.",
      image: "assets/projects/rutyvet-redizajn-hero.jpg",
      alt: "Hero sekcia redizajnu webu RutyVet — veterinárna ambulancia v Karlovej Vsi",
      url: "https://tiborantal.netlify.app/projects/18/rutyvet-redizajn.html",
      linkLabel: "RutyVet redizajn",
    },
    {
      slug: "lesteniecom",
      name: "Leštenie.com",
      category: "Renovácia svetlometov",
      type: "Webová stránka · Renovácia svetlometov",
      result:
        "Konverzne orientovaná webová stránka pre profesionálne leštenie a renováciu svetlometov v Bratislave — služby, cenník, ukážky práce a jednoduchá cesta k cenovej ponuke.",
      resultShort:
        "Prezentácia renovácie svetlometov s jasnou cestou k objednávke.",
      image: "assets/projects/lesteniecom-hero.jpg",
      alt: "Hero sekcia webu Leštenie.com — renovácia a leštenie svetlometov v Bratislave",
      url: "https://davidkolisek.netlify.app/clients/lesteniecom/",
      linkLabel: "Leštenie.com",
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
