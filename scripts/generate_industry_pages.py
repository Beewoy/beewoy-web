#!/usr/bin/env python3
"""Generate static HTML for /tvorba-webov/odvetvia/ hub and Wave 1 category pages."""

from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TV = ROOT / "tvorba-webov"
DATA = TV / "odvetvia" / "industries-data.json"
BASE = "https://beewoy.sk"
TODAY = "2026-08-06"


def e(s: str) -> str:
    return html.escape(s, quote=True)


def faq_schema(faqs: list[dict], page_id: str) -> dict:
    return {
        "@type": "FAQPage",
        "@id": f"{page_id}#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": f["q"],
                "acceptedAnswer": {"@type": "Answer", "text": f["a"]},
            }
            for f in faqs
        ],
    }


def head_block(
    *,
    title: str,
    description: str,
    canonical: str,
    og_image: str,
    depth_css: str,
    json_ld: dict,
    css_extra: str,
) -> str:
    return f"""<!DOCTYPE html>
<html lang="sk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(title)}</title>
<meta name="description" content="{e(description)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="Beewoy">
<meta name="theme-color" content="#f3f0e8">
<meta name="geo.region" content="SK">
<link rel="canonical" href="{e(canonical)}">
<link rel="manifest" href="{depth_css}manifest.webmanifest">
<link rel="icon" href="{depth_css}favicon.ico" sizes="any">
<link rel="icon" href="{depth_css}icons/favicon.svg" type="image/svg+xml">
<link rel="icon" type="image/png" sizes="32x32" href="{depth_css}icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="{depth_css}icons/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="{depth_css}icons/apple-touch-icon.png">

<meta property="og:type" content="website">
<meta property="og:locale" content="sk_SK">
<meta property="og:site_name" content="Beewoy">
<meta property="og:url" content="{e(canonical)}">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(description)}">
<meta property="og:image" content="{e(og_image)}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{e(title)}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{e(title)}">
<meta name="twitter:description" content="{e(description)}">
<meta name="twitter:image" content="{e(og_image)}">

<link rel="preload" href="{depth_css}fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{depth_css}styles.css" as="style">
<link rel="stylesheet" href="{depth_css}styles.css">
{css_extra}
<noscript><style>.reveal{{opacity:1;transform:none}}</style></noscript>

<script type="application/ld+json">
{json.dumps(json_ld, ensure_ascii=False, indent=2)}
</script>
</head>
"""


def header_nav(depth: str, *, current: str = "") -> str:
    odvetvia = f"{depth}tvorba-webov/odvetvia/"
    tvorba = f"{depth}tvorba-webov/"
    cennik = f"{depth}cennik/"
    kontakt = f"{depth}kontakt/"
    aria = ' aria-current="page"' if current == "hub" else ""
    return f"""
<a class="skip" href="#obsah">Preskočiť na obsah</a>
<header class="header" id="siteHeader">
  <div class="header-inner">
    <a class="logo" href="{depth}" aria-label="Beewoy — domov">
      <img src="{depth}logo.svg" alt="Beewoy logo" width="26" height="29">beewoy
    </a>
    <nav class="nav" aria-label="Hlavná navigácia">
      <a href="{tvorba}">Tvorba webov</a>
      <a href="{odvetvia}"{aria}>Odvetvia</a>
      <a href="{cennik}">Cenník</a>
      <a href="{depth}referencie/">Referencie</a>
      <a href="{kontakt}">Kontakt</a>
    </nav>
    <a class="btn btn-primary header-cta" href="{kontakt}" data-analytics-cta="header_industry">Chcem web <span class="arrow">→</span></a>
    <button type="button" class="burger" id="burger" aria-expanded="false" aria-controls="mobileMenu" aria-label="Otvoriť menu">
      <span></span><span></span>
    </button>
  </div>
</header>
<nav class="mobile-menu" id="mobileMenu" aria-label="Mobilná navigácia">
  <a href="{tvorba}">Tvorba webov</a>
  <a href="{odvetvia}">Odvetvia</a>
  <a href="{cennik}">Cenník</a>
  <a href="{depth}referencie/">Referencie</a>
  <a href="{kontakt}">Kontakt</a>
</nav>
"""


def footer_block(depth: str) -> str:
    return f"""
<footer class="footer">
  <a class="logo" href="{depth}"><img src="{depth}logo.svg" alt="Beewoy" width="26" height="29">beewoy</a>
  <nav class="footer-links" aria-label="Pätičková navigácia">
    <a href="{depth}">Domov</a>
    <a href="{depth}tvorba-webov/">Tvorba webov</a>
    <a href="{depth}tvorba-webov/odvetvia/">Odvetvia</a>
    <a href="{depth}cennik/">Cenník</a>
    <a href="{depth}referencie/">Referencie</a>
    <a href="{depth}kontakt/">Kontakt</a>
  </nav>
  <span>© 2026 Beewoy · weby na mieru · Slovensko</span>
  <div class="footer-legal">
    <a href="{depth}ochrana-udajov/">Ochrana údajov</a>
    <a href="{depth}cookies/">Cookies</a>
    <button type="button" data-cookie-settings>Nastavenia cookies</button>
  </div>
</footer>
"""


def scripts(depth: str) -> str:
    return f"""
<script src="{depth}cookies.js" defer></script>
<script src="{depth}analytics.js" defer></script>
<script src="{depth}main.js" defer></script>
</body>
</html>
"""


def render_problems(items: list[dict]) -> str:
    rows = []
    for i, p in enumerate(items, 1):
        rows.append(
            f'<li class="reveal"><span class="n" aria-hidden="true">{i:02d}</span>'
            f'<div><strong>{e(p["t"])}</strong><p>{e(p["d"])}</p></div></li>'
        )
    return '<ul class="ind-list">' + "".join(rows) + "</ul>"


ICONS = {
    "list": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>',
    "users": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    "calendar": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>',
    "shield": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    "tooth": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-2.8 0-5 2.4-5 5.3 0 1.5.5 2.8 1.2 4 .6 1 1.1 2.1 1.1 3.4V21h5.4v-6.3c0-1.3.5-2.4 1.1-3.4.7-1.2 1.2-2.5 1.2-4C17 4.4 14.8 2 12 2z"/></svg>',
    "clock": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    "phone": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z"/></svg>',
    "tag": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.428 0l6.758-6.758a2.426 2.426 0 0 0 0-3.428z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>',
    "search": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    "edit": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>',
    "spark": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>',
    "activity": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>',
    "zap": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
    "hammer": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/></svg>',
    "building": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>',
    "utensils": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
    "image": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
    "map": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
    "globe": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
    "smartphone": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>',
    "layers": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>',
    "route": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
    "star": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>',
    "eye": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',
    "workflow": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>',
    "gauge": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>',
}

INDUSTRY_ICONS = {
    "zubna-ambulancia": "tooth",
    "rehabilitacne-centrum": "activity",
    "elektrikar": "zap",
    "stolarstvo-interiery": "hammer",
    "stavebna-firma": "building",
    "restauracia": "utensils",
    "logistika-spedicia": "truck",
}


def icon_html(name: str) -> str:
    return ICONS.get(name, ICONS["spark"])


def render_cards(items: list[dict], cls: str = "ind-grid") -> str:
    cards = []
    for x in items:
        icon = x.get("icon")
        icon_block = (
            f'<span class="ind-card-icon" aria-hidden="true">{icon_html(icon)}</span>'
            if icon
            else ""
        )
        cards.append(
            f'<article class="ind-card reveal">{icon_block}<h3>{e(x["t"])}</h3><p>{e(x["d"])}</p></article>'
        )
    return f'<div class="{cls}">{"".join(cards)}</div>'


def render_packages(packages: dict, depth: str, slug: str) -> str:
    cards = []
    for item in packages["items"]:
        popular = item.get("popular")
        custom = item.get("custom") or not item.get("price")
        badge = '<span class="ind-plan-badge">Populárne</span>' if popular else ""
        rows = "".join(
            f'<div class="ind-plan-row"><span>{e(r["label"])}</span><strong>{e(r["value"])}</strong></div>'
            for r in item["rows"]
        )
        tone = "ind-plan popular" if popular else ("ind-plan custom" if custom else "ind-plan")
        if custom:
            price_html = (
                f'<p class="ind-plan-price custom">{e(item.get("price_label", "Dohodou"))}</p>'
            )
        else:
            price_html = (
                f'<p class="ind-plan-price">{e(item["price"])}<span>{e(item.get("period", ""))}</span></p>'
            )
        btn_cls = "btn-light" if popular else ""
        cards.append(
            f"""
      <article class="{tone} reveal">
        {badge}
        <p class="ind-plan-name">{e(item["name"])}</p>
        {price_html}
        <div class="ind-plan-rows">{rows}</div>
        <a class="btn {btn_cls}" href="{depth}kontakt/?balik={e(item['id'])}&odvetvie={e(slug)}#kontakt-form" data-analytics-cta="plan_{e(item['id'])}_{e(slug)}">{e(item["cta"])} <span class="arrow">→</span></a>
      </article>"""
        )
    return f"""
  <section class="ind-section" id="cena" aria-labelledby="price-title">
    <div class="wrap">
      <div class="ind-section-head center reveal">
        <p class="kicker">Proces a cena</p>
        <h2 class="section-title" id="price-title">Transparentný cenník</h2>
        <p class="ind-lead">{e(packages["intro"])}</p>
      </div>
      <div class="ind-plans">{"".join(cards)}</div>
      <p class="ind-plan-note reveal">{e(packages.get("note", ""))}</p>
    </div>
  </section>
"""


def render_offer_banner(banner: dict) -> str:
    cols = "".join(
        f'<div class="ind-banner-col"><span class="lbl">{e(i["label"])}</span><strong>{e(i["value"])}</strong><span class="hint">{e(i["hint"])}</span></div>'
        for i in banner["items"]
    )
    return f"""
  <section class="ind-section alt" aria-labelledby="banner-title">
    <div class="wrap">
      <h2 class="visually-hidden" id="banner-title">Základ ponuky</h2>
      <div class="ind-offer-banner reveal">
        <div class="ind-banner-grid">{cols}</div>
        <div class="ind-banner-foot">
          <span class="ind-banner-shield" aria-hidden="true">{icon_html("shield")}</span>
          <p>{e(banner["footer"])}</p>
        </div>
      </div>
    </div>
  </section>
"""


def render_steps(items: list[dict]) -> str:
    steps = "".join(
        f'<article class="ind-step reveal"><h3>{e(x["t"])}</h3><p>{e(x["d"])}</p></article>'
        for x in items
    )
    return f'<div class="ind-steps">{steps}</div>'


def render_checklist(items: list[str]) -> str:
    return '<ul class="ind-checklist">' + "".join(f"<li>{e(x)}</li>" for x in items) + "</ul>"


def render_faq(faqs: list[dict]) -> str:
    return "".join(
        f'<details class="faq-item reveal"><summary>{e(f["q"])}</summary><div class="faq-answer">{e(f["a"])}</div></details>'
        for f in faqs
    )


def render_related(items: list[dict], depth_to_tv: str = "../") -> str:
    links = []
    for r in items:
        icon_key = INDUSTRY_ICONS.get(r["slug"], "spark")
        links.append(
            f'''<a class="reveal" href="{depth_to_tv}pre-{e(r["slug"])}/">
          <span class="ind-related-icon" aria-hidden="true">{icon_html(icon_key)}</span>
          <strong>{e(r["short_name"])}</strong>
        </a>'''
        )
    return f'<div class="ind-related">{"".join(links)}</div>'


def render_industry(ind: dict, all_inds=None) -> str:
    slug = ind["slug"]
    url = f"{BASE}/tvorba-webov/pre-{slug}/"
    depth = "../../"
    css = f'<link rel="stylesheet" href="../odvetvia/odvetvia.css">'
    page_id = url.rstrip("/") + "/"
    layout = ind.get("layout") or {}
    hero_centered = layout.get("hero_centered", False)
    show_audience = layout.get("show_audience", True)
    show_scenario = layout.get("show_scenario", True)
    show_checklist = layout.get("show_checklist", True)
    show_secondary = layout.get("show_secondary_cta", True) and ind.get("cta_secondary")
    show_process = layout.get("show_process_steps", True)
    pricing_model = layout.get("pricing_model", "factors")
    hide_depth = layout.get("hide_depth_in_kicker", False)
    peers = [i for i in (all_inds or []) if i["slug"] != slug]

    graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": f"{page_id}#webpage",
                "url": page_id,
                "name": ind["title"],
                "description": ind["description"],
                "isPartOf": {"@id": f"{BASE}/#website"},
                "about": {"@id": f"{page_id}#service"},
                "breadcrumb": {"@id": f"{page_id}#breadcrumb"},
                "inLanguage": "sk-SK",
            },
            {
                "@type": "Service",
                "@id": f"{page_id}#service",
                "name": ind["h1"],
                "serviceType": "Tvorba webových stránok",
                "description": ind["description"],
                "url": page_id,
                "provider": {
                    "@type": "Organization",
                    "@id": f"{BASE}/#organization",
                    "name": "Beewoy",
                    "url": f"{BASE}/",
                    "email": "ahoj@beewoy.sk",
                },
                "areaServed": {"@type": "Country", "name": "Slovensko"},
            },
            {
                "@type": "BreadcrumbList",
                "@id": f"{page_id}#breadcrumb",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Domov", "item": f"{BASE}/"},
                    {"@type": "ListItem", "position": 2, "name": "Tvorba webov", "item": f"{BASE}/tvorba-webov/"},
                    {"@type": "ListItem", "position": 3, "name": "Odvetvia", "item": f"{BASE}/tvorba-webov/odvetvia/"},
                    {"@type": "ListItem", "position": 4, "name": ind["short_name"], "item": page_id},
                ],
            },
            faq_schema(ind["faq"], page_id),
        ],
    }

    proof_li = "".join(f"<li>{e(x)}</li>" for x in ind.get("hero_proof", []))
    kicker = e(ind["cluster"]) if hide_depth else f'{e(ind["cluster"])} · {e(ind["depth"])}'
    hero_class = "ind-hero centered" if hero_centered else "ind-hero"
    secondary_cta = (
        f'<a class="btn" href="#funkcie">{e(ind["cta_secondary"])}</a>'
        if show_secondary
        else ""
    )

    audience_html = ""
    if show_audience:
        audience_html = f"""
  <section class="ind-section" aria-labelledby="audience-title">
    <div class="wrap-narrow">
      <p class="kicker">Pre koho</p>
      <h2 class="section-title reveal" id="audience-title">Komu je táto stránka určená</h2>
      <p class="ind-lead reveal">{e(ind["audience"])}</p>
    </div>
  </section>
"""

    problems_title = ind.get("problems_title", "Čo firmy v tomto odvetví na webe najčastejšie trápí")
    help_title = ind.get("help_title", "Ako má web pomáhať podnikaniu")
    features_title = ind.get("features_title", "Odporúčané funkcie webu")

    scenario_html = ""
    if show_scenario and ind.get("scenario"):
        scenario = "".join(f"<li>{e(x)}</li>" for x in ind["scenario"])
        scenario_html = f"""
  <section class="ind-section" aria-labelledby="scenario-title">
    <div class="wrap-narrow">
      <p class="kicker">Scenár</p>
      <h2 class="section-title reveal" id="scenario-title">{e(ind["scenario_title"])}</h2>
      <div class="ind-scenario reveal">
        <p>{e(ind["scenario_intro"])}</p>
        <ol>{scenario}</ol>
      </div>
    </div>
  </section>
"""

    process_html = ""
    if show_process:
        process_html = f"""
  <section class="ind-section alt" aria-labelledby="process-title">
    <div class="wrap-narrow">
      <p class="kicker">Proces</p>
      <h2 class="section-title reveal" id="process-title">Ako prebieha spolupráca s Beewoy</h2>
      <p class="ind-lead reveal">{e(ind.get("process_intro", ""))}</p>
      {render_steps(ind["process"])}
      <p class="ind-note reveal">Viac o tvorbe webov nájdete na stránke <a href="../">Tvorba webov</a>.</p>
    </div>
  </section>
"""

    if pricing_model == "packages" and ind.get("packages"):
        pricing_html = render_packages(ind["packages"], depth, slug)
    else:
        price = "".join(f"<li>{e(x)}</li>" for x in ind.get("price_factors", []))
        pricing_html = f"""
  <section class="ind-section" aria-labelledby="price-title">
    <div class="wrap-narrow">
      <p class="kicker">Cena</p>
      <h2 class="section-title reveal" id="price-title">Čo ovplyvňuje cenu</h2>
      <p class="ind-lead reveal">{e(ind.get("price_intro", ""))}</p>
      <ul class="ind-price-factors reveal">{price}</ul>
      <p class="ind-note reveal">Po konzultácii dostanete individuálnu nezáväznú ponuku.</p>
    </div>
  </section>
"""

    proof_html = ""
    if show_checklist and ind.get("checklist"):
        proof_html = f"""
  <section class="ind-section alt" aria-labelledby="proof-title">
    <div class="wrap-narrow">
      <p class="kicker">Odborný model</p>
      <h2 class="section-title reveal" id="proof-title">{e(ind["proof_title"])}</h2>
      <p class="ind-lead reveal">{e(ind["proof_intro"])}</p>
      {render_checklist(ind["checklist"])}
    </div>
  </section>
"""
    elif ind.get("offer_banner"):
        proof_html = render_offer_banner(ind["offer_banner"])

    body = f"""
<body id="top" class="industry-page">
{header_nav(depth)}
<main id="obsah">
  <section class="{hero_class}" aria-labelledby="ind-hero-title">
    <div class="wrap">
      <nav class="breadcrumbs reveal" aria-label="Navigácia breadcrumbs">
        <ol>
          <li><a href="{depth}">Domov</a></li>
          <li><a href="../">Tvorba webov</a></li>
          <li><a href="../odvetvia/">Odvetvia</a></li>
          <li aria-current="page">{e(ind["short_name"])}</li>
        </ol>
      </nav>
      <div class="ind-hero-inner">
        <p class="kicker reveal">{kicker}</p>
        <h1 id="ind-hero-title" class="reveal">{e(ind["h1"])}</h1>
        <p class="ind-hero-lead reveal">{e(ind["hero_lead"])}</p>
        <div class="ind-hero-actions reveal">
          <a class="btn btn-primary" href="{depth}kontakt/" data-analytics-cta="industry_hero_{e(slug)}">{e(ind["cta_primary"])} <span class="arrow">→</span></a>
          {secondary_cta}
        </div>
        <ul class="ind-hero-meta reveal" aria-label="Čo na stránke nájdete">{proof_li}</ul>
      </div>
    </div>
  </section>
{audience_html}
  <section class="ind-section ind-problems" aria-labelledby="problems-title">
    <div class="wrap">
      <div class="ind-section-head center reveal">
        <p class="kicker">Problémy odvetvia</p>
        <h2 class="section-title" id="problems-title">{e(problems_title)}</h2>
        <p class="ind-lead">{e(ind["problems_intro"])}</p>
      </div>
      {render_problems(ind["problems"])}
    </div>
  </section>

  <section class="ind-section" aria-labelledby="help-title">
    <div class="wrap">
      <div class="ind-section-head reveal">
        <p class="kicker">Ako pomáha web</p>
        <h2 class="section-title" id="help-title">{e(help_title)}</h2>
        <p class="ind-lead">{e(ind["help_intro"])}</p>
      </div>
      {render_cards(ind["help_points"])}
    </div>
  </section>

  <section class="ind-section alt" id="funkcie" aria-labelledby="features-title">
    <div class="wrap">
      <div class="ind-section-head reveal">
        <p class="kicker">Funkcie</p>
        <h2 class="section-title" id="features-title">{e(features_title)}</h2>
        <p class="ind-lead">{e(ind["features_intro"])}</p>
      </div>
      {render_cards(ind["features"])}
    </div>
  </section>
{scenario_html}
{process_html}
{pricing_html}
{proof_html}
  <section class="section dark ind-faq" id="faq" aria-labelledby="faq-title">
    <div class="wrap faq-grid">
      <div>
        <p class="kicker">FAQ</p>
        <h2 class="section-title reveal" id="faq-title">Časté otázky</h2>
      </div>
      <div class="faq-list">{render_faq(ind["faq"])}</div>
    </div>
  </section>

  <section class="ind-section ind-related-section" aria-labelledby="related-title">
    <div class="wrap">
      <div class="ind-section-head center reveal">
        <p class="kicker">Súvisiace</p>
        <h2 class="section-title" id="related-title">Ďalšie odvetvia a služby</h2>
        <p class="ind-lead">Prehľad <a href="../odvetvia/">všetkých odvetví</a> a pilier <a href="../">tvorby webov</a>.</p>
      </div>
      {render_related(peers)}
    </div>
  </section>

  <section class="ind-final" id="kontakt" aria-labelledby="final-title">
    <div class="wrap">
      <p class="kicker">Nezáväzná konzultácia</p>
      <h2 class="reveal" id="final-title">{e(ind["final_title"])}</h2>
      <p class="reveal">{e(ind["final_text"])}</p>
      <div class="hero-actions reveal">
        <a class="btn btn-light" href="{depth}kontakt/" data-analytics-cta="industry_final_{e(slug)}">Požiadať o konzultáciu <span class="arrow">→</span></a>
        <a class="btn btn-outline" href="mailto:ahoj@beewoy.sk">ahoj@beewoy.sk</a>
      </div>
      {footer_block(depth)}
    </div>
  </section>
</main>
{scripts(depth)}
"""

    return head_block(
        title=ind["title"],
        description=ind["description"],
        canonical=page_id,
        og_image=f"{BASE}/tvorba-webov/og-tvorba-webov.png",
        depth_css=depth,
        json_ld=graph,
        css_extra=css,
    ) + body


def render_hub(data: dict) -> str:
    hub = data["hub"]
    inds = data["industries"]
    depth = "../../"
    url = f"{BASE}/tvorba-webov/odvetvia/"
    css = '<link rel="stylesheet" href="./odvetvia.css">'

    cards = "".join(
        f"""
      <a class="ind-hub-card reveal" href="../pre-{e(i['slug'])}/">
        <span class="cluster">{e(i['cluster'])}</span>
        <h2>{e(i['short_name'])}</h2>
        <p>{e(i['hub_blurb'])}</p>
        <span class="more">Pozrieť stránku <span class="arrow">→</span></span>
      </a>"""
        for i in inds
    )

    graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": f"{url}#webpage",
                "url": url,
                "name": hub["title"],
                "description": hub["description"],
                "isPartOf": {"@id": f"{BASE}/#website"},
                "breadcrumb": {"@id": f"{url}#breadcrumb"},
                "inLanguage": "sk-SK",
            },
            {
                "@type": "BreadcrumbList",
                "@id": f"{url}#breadcrumb",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Domov", "item": f"{BASE}/"},
                    {"@type": "ListItem", "position": 2, "name": "Tvorba webov", "item": f"{BASE}/tvorba-webov/"},
                    {"@type": "ListItem", "position": 3, "name": "Odvetvia", "item": url},
                ],
            },
            {
                "@type": "ItemList",
                "@id": f"{url}#list",
                "name": "Odvetvové weby Beewoy",
                "numberOfItems": len(inds),
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": n,
                        "name": i["short_name"],
                        "url": f"{BASE}/tvorba-webov/pre-{i['slug']}/",
                    }
                    for n, i in enumerate(inds, 1)
                ],
            },
        ],
    }

    body = f"""
<body id="top" class="industry-page">
{header_nav(depth, current="hub")}
<main id="obsah">
  <section class="ind-hero" aria-labelledby="hub-hero-title">
    <div class="wrap">
      <nav class="breadcrumbs reveal" aria-label="Navigácia breadcrumbs">
        <ol>
          <li><a href="{depth}">Domov</a></li>
          <li><a href="../">Tvorba webov</a></li>
          <li aria-current="page">Odvetvia</li>
        </ol>
      </nav>
      <p class="kicker reveal">Tvorba webov</p>
      <h1 id="hub-hero-title" class="reveal">{e(hub["h1"])}</h1>
      <p class="ind-hero-lead reveal">{e(hub["lead"])}</p>
      <div class="ind-hero-actions reveal">
        <a class="btn btn-primary" href="{depth}kontakt/" data-analytics-cta="hub_hero">Chcem konzultáciu <span class="arrow">→</span></a>
        <a class="btn" href="../">Späť na tvorbu webov</a>
      </div>
    </div>
  </section>

  <section class="ind-section" aria-labelledby="hub-list-title">
    <div class="wrap">
      <p class="kicker">Wave 1</p>
      <h2 class="section-title reveal" id="hub-list-title">Aktívne odvetvové stránky</h2>
      <p class="ind-lead reveal">Sedem stránok s unikátnym obsahom pre konkrétne odvetvia. Každá má vlastné problémy, funkcie, FAQ a argumentáciu — nie len vymenený názov v šablóne.</p>
      <div class="ind-hub-grid">{cards}</div>
    </div>
  </section>

  <section class="ind-section alt" aria-labelledby="hub-more-title">
    <div class="wrap-narrow">
      <p class="kicker">Ďalšie odvetvia</p>
      <h2 class="section-title reveal" id="hub-more-title">Nemáte svoje odvetvie v zozname?</h2>
      <p class="ind-lead reveal">Pripravujeme ďalšie kategórie. Ak potrebujete web pre iný segment, navrhneme riešenie podľa vašich zákazníkov a cieľov — v plánoch Start, Profi alebo Individual.</p>
      <div class="ind-hero-actions reveal">
        <a class="btn btn-primary" href="{depth}kontakt/">Napísať o inom odvetví <span class="arrow">→</span></a>
      </div>
    </div>
  </section>

  <section class="ind-final" aria-labelledby="hub-final-title">
    <div class="wrap">
      <p class="kicker">Ďalší krok</p>
      <h2 class="reveal" id="hub-final-title">Začnime nezáväznou konzultáciou.</h2>
      <p class="reveal">Povieme vám, aký rozsah dáva zmysel pre vaše odvetvie a čo by mal web vedieť vyriešiť ako prvé.</p>
      <div class="hero-actions reveal">
        <a class="btn btn-light" href="{depth}kontakt/" data-analytics-cta="hub_final">Požiadať o konzultáciu <span class="arrow">→</span></a>
        <a class="btn btn-outline" href="mailto:ahoj@beewoy.sk">ahoj@beewoy.sk</a>
      </div>
      {footer_block(depth)}
    </div>
  </section>
</main>
{scripts(depth)}
"""
    return head_block(
        title=hub["title"],
        description=hub["description"],
        canonical=url,
        og_image=f"{BASE}/tvorba-webov/og-tvorba-webov.png",
        depth_css=depth,
        json_ld=graph,
        css_extra=css,
    ) + body


def update_sitemap(slugs: list[str]) -> None:
    sm = ROOT / "sitemap.xml"
    urls = [
        ("https://beewoy.sk/", "1.0", "weekly"),
        ("https://beewoy.sk/tvorba-webov/", "0.9", "monthly"),
        ("https://beewoy.sk/tvorba-webov/odvetvia/", "0.85", "monthly"),
    ]
    for s in slugs:
        urls.append((f"https://beewoy.sk/tvorba-webov/pre-{s}/", "0.8", "monthly"))
    urls += [
        ("https://beewoy.sk/cennik/", "0.9", "monthly"),
        ("https://beewoy.sk/kontakt/", "0.9", "monthly"),
        ("https://beewoy.sk/referencie/", "0.7", "monthly"),
        ("https://beewoy.sk/ochrana-udajov/", "0.3", "yearly"),
        ("https://beewoy.sk/cookies/", "0.3", "yearly"),
    ]
    parts = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, pri, freq in urls:
        parts.append(
            f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{TODAY}</lastmod>\n    <changefreq>{freq}</changefreq>\n    <priority>{pri}</priority>\n  </url>"
        )
    parts.append("</urlset>\n")
    sm.write_text("\n".join(parts), encoding="utf-8")


def patch_tvorba_webov(inds: list[dict]) -> None:
    path = TV / "index.html"
    text = path.read_text(encoding="utf-8")
    marker = '  <section class="section dark" id="faq"'
    if "web-industries-teaser" in text:
        return
    cards = "".join(
        f"""
        <a class="ind-hub-card reveal" href="./pre-{html.escape(i['slug'])}/">
          <span class="cluster">{html.escape(i['cluster'])}</span>
          <h3 style="margin:0;font-size:1.15rem">{html.escape(i['short_name'])}</h3>
          <p>{html.escape(i['hub_blurb'])}</p>
          <span class="more">Viac <span class="arrow">→</span></span>
        </a>"""
        for i in inds[:4]
    )
    block = f"""
  <section class="section web-industries-teaser" id="odvetvia" aria-labelledby="industries-teaser-title">
    <div class="wrap">
      <p class="kicker">Podľa odvetvia</p>
      <h2 class="section-title reveal" id="industries-teaser-title">Weby, ktoré rozumejú konkrétnemu biznisu.</h2>
      <p class="reveal" style="max-width:62ch;color:var(--muted);line-height:1.55">Pripravili sme odvetvové stránky so špecifickými problémami, funkciami a FAQ. Pozrite si prehľad alebo prejdite rovno na svoje odvetvie.</p>
      <p class="reveal" style="margin-top:18px"><a class="btn btn-primary" href="./odvetvia/">Všetky odvetvia <span class="arrow">→</span></a></p>
      <div class="ind-hub-grid" style="margin-top:28px">{cards}
      </div>
    </div>
  </section>

"""
    # inject stylesheet for teaser if missing
    if "odvetvia/odvetvia.css" not in text:
        text = text.replace(
            '<link rel="stylesheet" href="./hero-dark.css">',
            '<link rel="stylesheet" href="./hero-dark.css">\n<link rel="stylesheet" href="./odvetvia/odvetvia.css">',
        )
    # add nav link
    if 'href="#odvetvia"' not in text and 'href="./odvetvia/"' not in text.split("nav")[1][:800]:
        text = text.replace(
            '<a href="#co-ziskate">Čo získate</a>',
            '<a href="#co-ziskate">Čo získate</a>\n      <a href="./odvetvia/">Odvetvia</a>',
            1,
        )
        text = text.replace(
            '<a href="#co-ziskate">Čo získate</a>\n  <a href="#proces">Proces</a>',
            '<a href="#co-ziskate">Čo získate</a>\n  <a href="./odvetvia/">Odvetvia</a>\n  <a href="#proces">Proces</a>',
            1,
        )
    text = text.replace(marker, block + marker)
    path.write_text(text, encoding="utf-8")


def clean_html(s: str) -> str:
    return "\n".join(line.rstrip() for line in s.splitlines()) + "\n"


def main() -> None:
    data = json.loads(DATA.read_text(encoding="utf-8"))
    inds = data["industries"]

    (TV / "odvetvia" / "index.html").write_text(clean_html(render_hub(data)), encoding="utf-8")

    for ind in inds:
        out = TV / f"pre-{ind['slug']}" / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(clean_html(render_industry(ind, inds)), encoding="utf-8")
        print("Wrote", out.relative_to(ROOT))

    update_sitemap([i["slug"] for i in inds])
    patch_tvorba_webov(inds)
    print("Wrote hub, sitemap, patched tvorba-webov")
    print("OK", len(inds), "pages")


if __name__ == "__main__":
    main()
