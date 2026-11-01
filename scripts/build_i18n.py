#!/usr/bin/env python3
"""Inject hreflang links, language detection and the language switcher into every public page.

Idempotent: content between <!-- i18n:* --> markers is regenerated on each run.
Run after scripts/generate_industry_pages.py and after editing any public page.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from site_i18n import alternates, find_route, mobile_switcher, og_alternates, switcher  # noqa: E402

ROOT = HERE.parent
SKIP_DIRS = {"projekty", "scripts", "source", "signatures", "node_modules", ".git", "functions", "care"}
DETECT_SCRIPT = "<script>\n" + (HERE / "lang-detect.js").read_text(encoding="utf-8").strip() + "\n</script>"

HEAD_ANCHORS = [re.compile(r'<link rel="canonical"[^>]*>\n'), re.compile(r'<meta name="viewport"[^>]*>\n')]
OG_ANCHORS = [re.compile(r'<meta property="og:locale" [^>]*>\n')]
SWITCH_ANCHORS = [re.compile(r'[ \t]*<a class="btn btn-primary btn-sm header-cta"')]
MSWITCH_ANCHORS = [re.compile(r'[ \t]*<p class="mobile-menu-foot">')]
LOOSE_OG_ALT = re.compile(r'^<meta property="og:locale:alternate"[^>]*>\n', re.M)


def public_pages() -> list[Path]:
    pages = []
    for p in ROOT.rglob("*.html"):
        rel = p.relative_to(ROOT)
        if rel.parts[0] in SKIP_DIRS or rel.name.startswith("__") or "source" in rel.name:
            continue
        if 'id="siteHeader"' in p.read_text(encoding="utf-8"):
            pages.append(p)
    return sorted(pages)


def url_path(p: Path) -> str:
    rel = p.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[: -len("index.html")]
    return "/" + rel


def strip_block(s: str, name: str) -> str:
    start, end = re.escape(f"<!-- i18n:{name} -->"), re.escape(f"<!-- /i18n:{name} -->")
    return re.sub(r"[ \t]*" + start + r".*?" + end + r"\n?", "", s, count=1, flags=re.S)


def insert_block(s: str, name: str, content: str, anchors: list[re.Pattern], *, before: bool, indent: str = "") -> str:
    if not content:
        return s
    m = next((m for a in anchors if (m := a.search(s))), None)
    if not m:
        raise SystemExit(f"anchor for i18n:{name} not found")
    lines = [f"<!-- i18n:{name} -->", *content.split("\n"), f"<!-- /i18n:{name} -->"]
    block = "\n".join(indent + line for line in lines) + "\n"
    pos = m.start() if before else m.end()
    return s[:pos] + block + s[pos:]


def main() -> None:
    changed = 0
    for p in public_pages():
        s = p.read_text(encoding="utf-8")
        key, lang = find_route(url_path(p))
        new = s
        for name in ("head", "og", "switch", "mswitch"):
            new = strip_block(new, name)
        new = LOOSE_OG_ALT.sub("", new)
        head = "\n".join(x for x in (alternates(key), DETECT_SCRIPT) if x)
        new = insert_block(new, "head", head, HEAD_ANCHORS, before=False)
        new = insert_block(new, "og", og_alternates(lang, key), OG_ANCHORS, before=False)
        new = insert_block(new, "switch", switcher(lang, key), SWITCH_ANCHORS, before=True, indent="    ")
        new = insert_block(new, "mswitch", mobile_switcher(lang, key), MSWITCH_ANCHORS, before=True, indent="  ")
        if new != s:
            p.write_text(new, encoding="utf-8")
            changed += 1
    print(f"{changed} pages updated")


if __name__ == "__main__":
    main()
