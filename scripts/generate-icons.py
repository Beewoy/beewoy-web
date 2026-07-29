#!/usr/bin/env python3
"""Regenerate Beewoy favicons + og-image from logo.svg.

Usage:
  python3 -m venv /tmp/beewoy-icons-venv
  /tmp/beewoy-icons-venv/bin/pip install cairosvg pillow
  /tmp/beewoy-icons-venv/bin/python scripts/generate-icons.py
"""
from __future__ import annotations

import io
from pathlib import Path

import cairosvg
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ICONS = ROOT / "icons"
PAPER = (243, 240, 232, 255)
INK = (21, 21, 21, 255)
YELLOW = (241, 196, 15, 255)


def render_logo_rgba(max_side: int) -> Image.Image:
    logo_svg = (ROOT / "logo.svg").read_bytes()
    w, h = 234, 257
    if w >= h:
        out_w, out_h = max_side, int(max_side * h / w)
    else:
        out_h, out_w = max_side, int(max_side * w / h)
    png = cairosvg.svg2png(bytestring=logo_svg, output_width=out_w, output_height=out_h)
    return Image.open(io.BytesIO(png)).convert("RGBA")


def icon_square(size: int, bg, pad_ratio: float = 0.18) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), bg)
    inner = max(1, int(size * (1 - 2 * pad_ratio)))
    logo = render_logo_rgba(inner)
    x = (size - logo.width) // 2
    y = (size - logo.height) // 2
    canvas.alpha_composite(logo, (x, y))
    return canvas


def load_font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            continue
    return ImageFont.load_default()


def main() -> None:
    ICONS.mkdir(exist_ok=True)
    sizes = {
        "favicon-16x16.png": (16, PAPER, 0.14),
        "favicon-32x32.png": (32, PAPER, 0.14),
        "favicon-48x48.png": (48, PAPER, 0.14),
        "apple-touch-icon.png": (180, PAPER, 0.16),
        "icon-192.png": (192, PAPER, 0.16),
        "icon-512.png": (512, PAPER, 0.16),
        "icon-192-maskable.png": (192, YELLOW, 0.22),
        "icon-512-maskable.png": (512, YELLOW, 0.22),
    }

    ico_frames = []
    for name, (size, bg, pad) in sizes.items():
        img = icon_square(size, bg, pad)
        img.save(ICONS / name, "PNG", optimize=True)
        if name in ("favicon-16x16.png", "favicon-32x32.png", "favicon-48x48.png"):
            ico_frames.append(img.convert("RGBA"))

    ico_frames[-1].save(
        ROOT / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=ico_frames[:-1],
    )

    # OG 1200x630
    w, h = 1200, 630
    og = Image.new("RGB", (w, h), PAPER[:3]).convert("RGBA")
    orb = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(orb)
    od.ellipse((720, -80, 1180, 380), fill=(241, 196, 15, 70))
    od.ellipse((-60, 380, 360, 760), fill=(241, 196, 15, 40))
    og = Image.alpha_composite(og, orb)

    grid = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, w, 72):
        gd.line([(x, 0), (x, h)], fill=(21, 21, 21, 14), width=1)
    for y in range(0, h, 72):
        gd.line([(0, y), (w, y)], fill=(21, 21, 21, 14), width=1)
    og = Image.alpha_composite(og, grid)

    logo = render_logo_rgba(210)
    og.alpha_composite(logo, (96, (h - logo.height) // 2 - 20))
    draw = ImageDraw.Draw(og)
    text_x = 340
    draw.text((text_x, 210), "beewoy", font=load_font(92, True), fill=INK[:3])
    draw.rectangle((text_x, 318, text_x + 72, 322), fill=YELLOW[:3])
    draw.text((text_x, 350), "Softvér na mieru, ktorý posúva biznis.", font=load_font(34), fill=(80, 78, 72))
    draw.text((text_x, 410), "Webové stránky · Aplikácie · Interné systémy · Slovensko", font=load_font(22), fill=(109, 106, 98))
    og.convert("RGB").save(ROOT / "og-image.png", "PNG", optimize=True)
    print("Icons + og-image regenerated.")


if __name__ == "__main__":
    main()
