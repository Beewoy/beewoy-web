# Beewoy — firemný web

Statická landing page softvérového štúdia **Beewoy** (David + Tibor).  
Produkčná doména: [https://beewoy.sk](https://beewoy.sk)  
Kontakt: [ahoj@beewoy.com](mailto:ahoj@beewoy.com)

Jednoduchý stack — HTML / CSS / JS, bez buildu. Vhodné na Netlify, Cloudflare Pages, GitHub Pages alebo akýkoľvek static hosting.

---

## Rýchly štart

Otvor lokálne (najlepšie cez jednoduchý server, kvôli PWA / service workeru):

```bash
cd beewoy-web
npx --yes serve .
# alebo: python3 -m http.server 8080
```

Potom otvor `http://localhost:3000` (alebo port zo `serve` / `http.server`).

---

## Štruktúra

| Súbor / priečinok | Účel |
| --- | --- |
| `index.html` | Hlavná landing page |
| `styles.css` | Všetky štýly |
| `main.js` | Navigácia, scroll-spy, slider projektov, PWA registrácia |
| `cookies.js` | Cookie consent (GDPR / ePrivacy) |
| `cookies.html` | Zásady cookies |
| `ochrana-udajov.html` | Ochrana osobných údajov |
| `logo.svg` | Logo značky |
| `icons/` | Favicony + PWA ikony |
| `projects/` | Screenshoty hero sekcií klientov |
| `og-image.png` | Open Graph obrázok (1200×630) |
| `manifest.webmanifest` | PWA manifest |
| `sw.js` | Service worker (cache shellu) |
| `robots.txt` / `sitemap.xml` | SEO |
| `scripts/generate-icons.py` | Regenerácia ikon a OG z `logo.svg` |

---

## Čo stránka obsahuje

- Hero + služby (webové sídlo, aplikácie, interné systémy, AI/automatizácie)
- Prečo Beewoy, proces, projekty (slider), care, pricing, tím, FAQ, kontakt
- Active nav (scroll-spy)
- Cookie banner + nastavenia (nevyhnutné / funkčné / analytické / marketingové)
- PWA (manifest + SW) — zapne sa až po **funkčnom** cookie súhlase
- Google Fonts sa načítajú až po funkčnom súhlase

### Portfólio (aktuálne)

1. [CeKo Interier](https://www.ceko.sk/) — `projects/ceko-hero.jpg`
2. [Športový klub Vajnory](https://skvajnory.sk/) — `projects/skvajnory-hero.jpg`
3. [BR Interior & Exterior](https://brinteriorexterior.netlify.app/en) — `projects/br-interior-hero.jpg`

---

## Pridať nový projekt

1. Ulož hero screenshot do `projects/` (ideálne JPG ~1600px široký).
2. V `index.html` skopíruj ďalší `<article class="work-slide">` do `#workTrack`.
3. Uprav názov, typ, popis a live odkaz.
4. Slider dots sa generujú automaticky v `main.js`.

---

## SEO / doména

- Canonical a schema používajú `https://beewoy.sk/`
- Po deployi over Open Graph (napr. Facebook Sharing Debugger)
- V Google Search Console pridaj property `beewoy.sk` a odošli `sitemap.xml`

Ak sa zmení e-mail na `@beewoy.sk`, uprav mailto + texty v `index.html`, `cookies.html`, `ochrana-udajov.html`.

---

## Cookies a právne

- Banner: Prijať všetko / Len nevyhnutné / Nastavenia
- Súhlas sa ukladá v `localStorage` pod kľúčom `beewoy_consent`
- Pred launchom v `ochrana-udajov.html` doplň **oficiálny názov, IČO a sídlo** (`[DOPLNIŤ]`)

Toto je praktický rámec, nie právna záruka — pri produkcii skontroluj s právnikom.

---

## Regenerácia ikon

```bash
python3 -m venv /tmp/beewoy-icons-venv
/tmp/beewoy-icons-venv/bin/pip install cairosvg pillow
/tmp/beewoy-icons-venv/bin/python scripts/generate-icons.py
```

Vygeneruje favicony, maskable PWA ikony a `og-image.png` z `logo.svg`.

---

## Deploy checklist

- [ ] Nasadiť obsah koreňa na hosting pre `beewoy.sk`
- [ ] HTTPS + redirect `www` → apex (alebo naopak)
- [ ] Doplniť IČO / sídlo v ochrane údajov
- [ ] Overiť cookie banner, OG image, favicon, PWA (Chrome → Application)
- [ ] Search Console + sitemap

---

## Poznámky

- Jazyk UI: slovenčina (`lang="sk"`)
- Dizajn: paper estetika (`#f3f0e8`), žltý akcent, fonty DM Sans + Manrope
- Žiadny npm build — po úprave HTML/CSS/JS stačí refresh / redeploy
