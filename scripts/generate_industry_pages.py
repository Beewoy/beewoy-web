#!/usr/bin/env python3
"""Generate static HTML for /tvorba-webov/odvetvia/ hub and industry pages."""

from __future__ import annotations

import html
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from site_i18n import sitemap_entries  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
TV = ROOT / "tvorba-webov"
DATA = TV / "odvetvia" / "industries-data.json"
BASE = "https://beewoy.sk"

# Sitemap <lastmod> values maintained by hand; kept on regeneration.
SITEMAP_LASTMOD = {
    "https://beewoy.sk/kalkulacka/": "2026-09-23",
}


def e(s: str) -> str:
    return html.escape(s, quote=True)


def cap(s: str) -> str:
    return s[:1].upper() + s[1:] if s else s


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


def head_block(*, title: str, description: str, canonical: str, og_image: str, depth: str, json_ld: dict) -> str:
    return f"""<!DOCTYPE html>
<html lang="sk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(title)}</title>
<meta name="description" content="{e(description)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="Beewoy">
<meta name="theme-color" content="#ffffff">
<meta name="geo.region" content="SK">
<link rel="canonical" href="{e(canonical)}">
<link rel="manifest" href="{depth}manifest.webmanifest">
<link rel="icon" href="{depth}favicon.ico" sizes="any">
<link rel="icon" href="{depth}icons/favicon.svg" type="image/svg+xml">
<link rel="icon" type="image/png" sizes="32x32" href="{depth}icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="{depth}icons/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="{depth}icons/apple-touch-icon.png">

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

<link rel="stylesheet" href="{depth}styles.css">

<script type="application/ld+json">
{json.dumps(json_ld, ensure_ascii=False, indent=2)}
</script>
</head>
"""


def header_nav(depth: str, *, cta_href: str) -> str:
    return f"""<body>
<a class="skip" href="#obsah">Preskočiť na obsah</a>

<header class="header" id="siteHeader">
  <div class="wrap header-inner">
    <a class="logo" href="{depth}" aria-label="Beewoy — úvod"><img src="{depth}logo.svg" alt="" width="22" height="24">beewoy</a>
    <nav class="nav" aria-label="Hlavná navigácia">
      <a href="{depth}tvorba-webov/">Tvorba webov</a>
      <a href="{depth}cennik/">Cenník</a>
      <a href="{depth}referencie/">Referencie</a>
      <a href="{depth}kontakt/">Kontakt</a>
    </nav>
    <a class="btn btn-primary btn-sm header-cta" href="{cta_href}" data-analytics-cta="header_industry">Chcem web</a>
    <button type="button" class="burger" id="burger" aria-expanded="false" aria-controls="mobileMenu" aria-label="Otvoriť menu"><span></span><span></span></button>
  </div>
</header>
<nav class="mobile-menu" id="mobileMenu" aria-label="Mobilná navigácia">
  <a href="{depth}tvorba-webov/">Tvorba webov</a>
  <a href="{depth}cennik/">Cenník</a>
  <a href="{depth}referencie/">Referencie</a>
  <a href="{depth}kontakt/">Kontakt</a>
  <a class="btn btn-primary btn-lg" href="{cta_href}">Chcem web</a>
  <p class="mobile-menu-foot">Alebo napíšte na <a href="mailto:ahoj@beewoy.sk">ahoj@beewoy.sk</a></p>
</nav>
"""


def footer_block(depth: str) -> str:
    return f"""<footer class="footer">
  <div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="logo" href="{depth}"><img src="{depth}logo.svg" alt="" width="22" height="24">beewoy</a>
        <p>Moderné webstránky pre firmy v mesačnom paušále.</p>
        <a class="footer-mail" href="mailto:ahoj@beewoy.sk">ahoj@beewoy.sk</a>
      </div>
      <nav class="footer-col" aria-labelledby="f-offer"><h2 id="f-offer">Ponuka</h2><ul>
        <li><a href="{depth}tvorba-webov/">Tvorba webov</a></li>
        <li><a href="{depth}tvorba-webov/odvetvia/">Weby podľa odvetvia</a></li>
        <li><a href="{depth}cennik/">Cenník</a></li>
        <li><a href="{depth}kalkulacka/">Kalkulačka ceny</a></li>
      </ul></nav>
      <nav class="footer-col" aria-labelledby="f-beewoy"><h2 id="f-beewoy">Beewoy</h2><ul>
        <li><a href="{depth}referencie/">Referencie</a></li>
        <li><a href="{depth}kontakt/">Kontakt</a></li>
      </ul></nav>
      <nav class="footer-col" aria-labelledby="f-legal"><h2 id="f-legal">Právne</h2><ul>
        <li><a href="{depth}ochrana-udajov/">Ochrana údajov</a></li>
        <li><a href="{depth}cookies/">Cookies</a></li>
        <li><button type="button" data-cookie-settings>Nastavenia cookies</button></li>
      </ul></nav>
    </div>
    <div class="footer-bottom"><span>© 2026 Beewoy</span><span>Slovensko</span></div>
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


def section_head(eyebrow: str, title: str, title_id: str, lead: str = "") -> str:
    lead_html = f'\n        <p class="lead">{e(lead)}</p>' if lead else ""
    return f"""      <div class="section-head">
        <p class="eyebrow">{e(eyebrow)}</p>
        <h2 class="h2" id="{title_id}">{e(title)}</h2>{lead_html}
      </div>"""


def render_problems(items: list[dict]) -> str:
    rows = "".join(
        f'\n        <div class="row row--num"><span class="row-num">{n:02d}</span><h3 class="h4">{e(p["t"])}</h3><p>{e(p["d"])}</p></div>'
        for n, p in enumerate(items, 1)
    )
    return f'      <div class="rows">{rows}\n      </div>'


def render_items(items: list[dict]) -> str:
    cells = "".join(
        f'\n        <div class="item"><h3 class="h4">{e(x["t"])}</h3><p>{e(x["d"])}</p></div>'
        for x in items
    )
    return f'      <div class="grid-2">{cells}\n      </div>'


def render_feature_list(items: list[dict]) -> str:
    lis = "".join(f'\n        <li><span><strong>{e(x["t"])}</strong> {e(x["d"])}</span></li>' for x in items)
    return f'      <ul class="ind-checklist ind-checklist--rich">{lis}\n      </ul>'


def render_packages(packages: dict, depth: str, slug: str) -> str:
    cards = []
    for item in packages["items"]:
        popular = item.get("popular")
        custom = item.get("custom") or not item.get("price")
        rows = item["rows"]
        plan_for = cap(rows[0]["value"]) if rows else ""
        bullets = "".join(f"\n            <li>{e(cap(r['value']))}</li>" for r in rows[1:])
        if custom:
            price_html = f'<p class="plan-price plan-price--text">{e(item.get("price_label", "Dohodou"))}</p>'
        else:
            price = item["price"].replace("€", "").strip()
            price_html = f'<p class="plan-price">{e(price)}&nbsp;€<small>/ mesiac</small></p>'
        badge = '\n          <span class="plan-badge">Najčastejšia voľba</span>' if popular else ""
        btn = "btn-primary" if popular else "btn-secondary"
        cls = "plan plan--featured" if popular else "plan"
        cards.append(
            f"""
        <article class="{cls}">{badge}
          <h3 class="plan-name">{e(item["name"])}</h3>
          <p class="plan-for">{e(plan_for)}</p>
          {price_html}
          <ul class="plan-list">{bullets}
          </ul>
          <a class="btn {btn}" href="{depth}kontakt/?balik={e(item['id'])}&amp;odvetvie={e(slug)}#kontakt-form" data-analytics-cta="plan_{e(item['id'])}_{e(slug)}">{e(item["cta"])}</a>
        </article>"""
        )
    note = packages.get("note", "")
    note_html = f'\n      <p class="plans-note">{e(note)}</p>' if note else ""
    return f"""
  <section class="section section--soft" id="cena" aria-labelledby="price-title">
    <div class="wrap">
      <div class="section-head section-head--center">
        <div>
          <p class="eyebrow">Cena</p>
          <h2 class="h2" id="price-title">Web od 19&nbsp;€ mesačne.</h2>
        </div>
        <p class="lead">Bez vstupného poplatku a bez viazanosti. Paušál platíte od spustenia webu.</p>
      </div>
      <div class="plans">{"".join(cards)}
      </div>{note_html}
      <div class="plans-more">
        <a class="link-arrow" href="{depth}cennik/">Podrobný cenník <span class="arrow" aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>
"""


def render_faq(faqs: list[dict]) -> str:
    return "".join(
        f'\n        <details class="faq-item"><summary>{e(f["q"])}</summary><div class="faq-answer">{e(f["a"])}</div></details>'
        for f in faqs
    )


def resolve_related(ind: dict, all_inds: list[dict] | None) -> list[dict]:
    """Use explicit related list from data (max 5); never dump all industries."""
    by_slug = {i["slug"]: i for i in (all_inds or [])}
    out: list[dict] = []
    for entry in (ind.get("related") or [])[:5]:
        slug = entry["slug"] if isinstance(entry, dict) else str(entry)
        peer = by_slug.get(slug)
        if not peer:
            continue
        label = None
        if isinstance(entry, dict):
            label = entry.get("label") or entry.get("short_name")
        out.append({"slug": peer["slug"], "short_name": label or peer["short_name"]})
    return out


def render_related(items: list[dict]) -> str:
    links = "".join(f'\n        <a href="../pre-{e(r["slug"])}/">{e(r["short_name"])}</a>' for r in items)
    return f"""      <div class="tag-links">{links}
        <a class="tag-more" href="../odvetvia/">Všetky odvetvia →</a>
      </div>"""


def cta_panel(title: str, text: str, href: str, label: str, analytics: str) -> str:
    return f"""
  <section class="section section--sm" id="kontakt" aria-labelledby="final-title">
    <div class="wrap">
      <div class="cta-panel">
        <h2 class="h2" id="final-title">{e(title)}</h2>
        <p>{e(text)}</p>
        <div class="actions">
          <a class="btn btn-light btn-lg" href="{href}" data-analytics-cta="{analytics}">{e(label)} <span class="arrow" aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  </section>
"""


def render_industry(ind: dict, all_inds=None) -> str:
    slug = ind["slug"]
    page_id = f"{BASE}/tvorba-webov/pre-{slug}/"
    depth = "../../"
    contact = f"{depth}kontakt/?odvetvie={e(slug)}#kontakt-form"
    layout = ind.get("layout") or {}
    show_scenario = layout.get("show_scenario", True) and ind.get("scenario")
    peers = resolve_related(ind, all_inds)

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

    meta = "".join(f"<li>{e(x)}</li>" for x in ["Od 19 € mesačne", *ind.get("hero_proof", [])[:3]])
    problems_title = ind.get("problems_title", "Čo firmy v tomto odvetví na webe najčastejšie trápi")
    help_title = ind.get("help_title", "Ako má web pomáhať podnikaniu")
    features_title = ind.get("features_title", "Odporúčané funkcie webu")

    scenario_html = ""
    if show_scenario:
        steps = "".join(f"\n        <li>{e(x)}</li>" for x in ind["scenario"])
        scenario_html = f"""
  <section class="section" aria-labelledby="scenario-title">
    <div class="wrap split">
      <div class="split-sticky">
        <p class="eyebrow">Scenár</p>
        <h2 class="h2" id="scenario-title">{e(ind["scenario_title"])}</h2>
        <p class="lead">{e(ind["scenario_intro"])}</p>
      </div>
      <ol class="ind-scenario">{steps}
      </ol>
    </div>
  </section>
"""

    body = f"""{header_nav(depth, cta_href=contact)}
<main id="obsah">
  <section class="page-hero" aria-labelledby="ind-hero-title">
    <div class="wrap">
      <nav class="breadcrumbs" aria-label="Omrvinková navigácia">
        <ol><li><a href="{depth}">Domov</a></li><li><a href="../">Tvorba webov</a></li><li><a href="../odvetvia/">Odvetvia</a></li><li aria-current="page">{e(ind["short_name"])}</li></ol>
      </nav>
      <h1 class="h1" id="ind-hero-title">{e(ind["h1"])}</h1>
      <p class="lead">{e(ind["hero_lead"])}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" href="{contact}" data-analytics-cta="industry_hero_{e(slug)}">Chcem web <span class="arrow" aria-hidden="true">→</span></a>
        <a class="btn btn-secondary btn-lg" href="#cena">Pozrieť cenu</a>
      </div>
      <ul class="page-hero-meta">{meta}</ul>
    </div>
  </section>

  <section class="section" aria-labelledby="problems-title">
    <div class="wrap">
{section_head("Na čo narážate", problems_title, "problems-title", ind.get("problems_intro", ""))}
{render_problems(ind["problems"])}
    </div>
  </section>

  <section class="section" aria-labelledby="help-title">
    <div class="wrap">
{section_head("Ako pomôže web", help_title, "help-title", ind.get("help_intro", ""))}
{render_items(ind["help_points"])}
    </div>
  </section>

  <section class="section" id="funkcie" aria-labelledby="features-title">
    <div class="wrap">
{section_head("Funkcie", features_title, "features-title", ind.get("features_intro", ""))}
{render_feature_list(ind["features"])}
    </div>
  </section>
{scenario_html}{render_packages(ind["packages"], depth, slug)}
  <section class="section" id="faq" aria-labelledby="faq-title">
    <div class="wrap split">
      <div class="split-sticky">
        <p class="eyebrow">Časté otázky</p>
        <h2 class="h2" id="faq-title">Na rovinu.</h2>
      </div>
      <div class="faq">{render_faq(ind["faq"])}
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="related-title">
    <div class="wrap">
      <div class="section-head">
        <h2 class="h3" id="related-title">Weby pre ďalšie odvetvia</h2>
      </div>
{render_related(peers)}
    </div>
  </section>
{cta_panel(ind["final_title"], ind["final_text"], contact, "Chcem web", f"industry_final_{e(slug)}")}</main>

{footer_block(depth)}{scripts(depth)}"""

    return head_block(
        title=ind["title"],
        description=ind["description"],
        canonical=page_id,
        og_image=f"{BASE}/og-main.png",
        depth=depth,
        json_ld=graph,
    ) + body


def render_hub(data: dict) -> str:
    hub = data["hub"]
    inds = data["industries"]
    depth = "../../"
    url = f"{BASE}/tvorba-webov/odvetvia/"

    clusters: dict[str, list[dict]] = {}
    for i in inds:
        clusters.setdefault(i["cluster"], []).append(i)

    groups = []
    for name, items in clusters.items():
        links = "".join(
            f"""
          <a class="ind-link" href="../pre-{e(i['slug'])}/"><strong>{e(i['short_name'])}</strong><span>{e(i['hub_blurb'])}</span><i aria-hidden="true">→</i></a>"""
            for i in items
        )
        groups.append(
            f"""
      <div class="ind-group">
        <h2>{e(name)}<span>{len(items)} {"odvetvie" if len(items) == 1 else ("odvetvia" if len(items) < 5 else "odvetví")}</span></h2>
        <div class="ind-links">{links}
        </div>
      </div>"""
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

    body = f"""{header_nav(depth, cta_href=f"{depth}kontakt/#kontakt-form")}
<main id="obsah">
  <section class="page-hero" aria-labelledby="hub-hero-title">
    <div class="wrap">
      <nav class="breadcrumbs" aria-label="Omrvinková navigácia">
        <ol><li><a href="{depth}">Domov</a></li><li><a href="../">Tvorba webov</a></li><li aria-current="page">Odvetvia</li></ol>
      </nav>
      <h1 class="h1" id="hub-hero-title">{e(hub["h1"])}</h1>
      <p class="lead">{e(hub["lead"])}</p>
    </div>
  </section>

  <section class="section section--flush-top" aria-label="Zoznam odvetví">
    <div class="wrap ind-index">{"".join(groups)}
    </div>
  </section>
{cta_panel("Nemáte svoje odvetvie v zozname?", "Napíšte nám. Web navrhneme podľa vašich zákazníkov, v plánoch Basic, Start alebo Individual.", f"{depth}kontakt/#kontakt-form", "Napísať nám", "hub_final")}</main>

{footer_block(depth)}{scripts(depth)}"""
    return head_block(
        title=hub["title"],
        description=hub["description"],
        canonical=url,
        og_image=f"{BASE}/og-main.png",
        depth=depth,
        json_ld=graph,
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
        ("https://beewoy.sk/kalkulacka/", "0.9", "monthly"),
        ("https://beewoy.sk/kontakt/", "0.9", "monthly"),
        ("https://beewoy.sk/referencie/", "0.7", "monthly"),
    ]
    translated = {loc: alts for loc, _, _, alts in sitemap_entries()}
    listed = {loc for loc, _, _ in urls}
    urls += [(loc, f"{float(pri) - 0.1:.1f}", freq) for loc, pri, freq, _ in sitemap_entries() if loc not in listed]
    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]
    for loc, pri, freq in urls:
        lastmod = SITEMAP_LASTMOD.get(loc)
        lastmod_xml = f"    <lastmod>{lastmod}</lastmod>\n" if lastmod else ""
        alt_xml = "".join(
            f'    <xhtml:link rel="alternate" hreflang="{lang}" href="{href}"/>\n'
            for lang, href in translated.get(loc, [])
        )
        parts.append(
            f"  <url>\n"
            f"    <loc>{loc}</loc>\n"
            f"{alt_xml}"
            f"{lastmod_xml}"
            f"    <changefreq>{freq}</changefreq>\n"
            f"    <priority>{pri}</priority>\n"
            f"  </url>"
        )
    parts.append("</urlset>\n")
    sm.write_text("\n".join(parts), encoding="utf-8")


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
    print("Wrote hub and sitemap")
    print("OK", len(inds), "pages")


if __name__ == "__main__":
    main()
