#!/usr/bin/env python3
"""Language versions of beewoy.sk: route map, hreflang, header switcher, sitemap entries.

Run after editing any public page or adding a translation:
    python3 scripts/build_i18n.py
"""

from __future__ import annotations

import html

BASE = "https://beewoy.sk"
LANGS = ("sk", "pl", "en")
DEFAULT_LANG = "sk"
LANG_NAMES = {"sk": "Slovenčina", "pl": "Polski", "en": "English"}
SWITCH_LABEL = {"sk": "Jazyk", "pl": "Język", "en": "Language"}

# Every page that exists in all languages. `index` = listed in sitemap with hreflang.
ROUTES: dict[str, dict] = {
    "home": {"sk": "/", "pl": "/pl/", "en": "/en/", "index": True, "priority": "1.0", "freq": "weekly"},
    "web": {"sk": "/tvorba-webov/", "pl": "/pl/tworzenie-stron/", "en": "/en/web-design/", "index": True, "priority": "0.9", "freq": "monthly"},
    "pricing": {"sk": "/cennik/", "pl": "/pl/cennik/", "en": "/en/pricing/", "index": True, "priority": "0.9", "freq": "monthly"},
    "calculator": {"sk": "/kalkulacka/", "pl": "/pl/kalkulator/", "en": "/en/calculator/", "index": True, "priority": "0.9", "freq": "monthly"},
    "contact": {"sk": "/kontakt/", "pl": "/pl/kontakt/", "en": "/en/contact/", "index": True, "priority": "0.9", "freq": "monthly"},
    "work": {"sk": "/referencie/", "pl": "/pl/realizacje/", "en": "/en/work/", "index": True, "priority": "0.7", "freq": "monthly"},
    "privacy": {"sk": "/ochrana-udajov/", "pl": "/pl/polityka-prywatnosci/", "en": "/en/privacy/", "index": False},
    "cookies": {"sk": "/cookies/", "pl": "/pl/cookies/", "en": "/en/cookies/", "index": False},
}


def path_to_file(path: str) -> str:
    return path.lstrip("/") + "index.html"


def find_route(url_path: str) -> tuple[str | None, str]:
    """Return (route key or None, language) for a URL path like /pl/cennik/."""
    for key, r in ROUTES.items():
        for lang in LANGS:
            if r[lang] == url_path:
                return key, lang
    for lang in LANGS:
        if lang != DEFAULT_LANG and url_path.startswith(f"/{lang}/"):
            return None, lang
    return None, DEFAULT_LANG


def alternates(key: str | None) -> str:
    if not key or not ROUTES[key]["index"]:
        return ""
    r = ROUTES[key]
    lines = [f'<link rel="alternate" hreflang="{lang}" href="{BASE}{r[lang]}">' for lang in LANGS]
    lines.append(f'<link rel="alternate" hreflang="x-default" href="{BASE}{r[DEFAULT_LANG]}">')
    return "\n".join(lines)


def og_alternates(lang: str, key: str | None) -> str:
    if not key or not ROUTES[key]["index"]:
        return ""
    locale = {"sk": "sk_SK", "pl": "pl_PL", "en": "en_GB"}
    return "\n".join(f'<meta property="og:locale:alternate" content="{locale[l]}">' for l in LANGS if l != lang)


def target(key: str | None, lang: str) -> str:
    return ROUTES[key][lang] if key else ROUTES["home"][lang]


def switcher(lang: str, key: str | None) -> str:
    items = []
    for l in LANGS:
        current = ' aria-current="true"' if l == lang else ""
        items.append(
            f'    <li><a href="{target(key, l)}" hreflang="{l}" lang="{l}" data-lang="{l}"{current}>'
            f'<span>{l.upper()}</span>{html.escape(LANG_NAMES[l])}</a></li>'
        )
    label = f"{SWITCH_LABEL[lang]}: {LANG_NAMES[lang]}"
    return (
        '<details class="lang" data-lang-switch>\n'
        f'  <summary class="lang-btn" aria-label="{html.escape(label)}">{lang.upper()}'
        '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>\n'
        '  <ul class="lang-menu">\n' + "\n".join(items) + "\n  </ul>\n</details>"
    )


def mobile_switcher(lang: str, key: str | None) -> str:
    links = []
    for l in LANGS:
        current = ' aria-current="true"' if l == lang else ""
        links.append(f'<a href="{target(key, l)}" hreflang="{l}" lang="{l}" data-lang="{l}"{current}>{l.upper()}</a>')
    return f'<div class="mobile-lang" role="group" aria-label="{SWITCH_LABEL[lang]}">' + "".join(links) + "</div>"


def sitemap_entries() -> list[tuple[str, str, str, list[tuple[str, str]]]]:
    """(loc, priority, changefreq, [(hreflang, href), ...]) for every indexable translated URL."""
    out = []
    for r in ROUTES.values():
        if not r["index"]:
            continue
        alts = [(l, BASE + r[l]) for l in LANGS] + [("x-default", BASE + r[DEFAULT_LANG])]
        for l in LANGS:
            out.append((BASE + r[l], r["priority"], r["freq"], alts))
    return out
