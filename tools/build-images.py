#!/usr/bin/env python3
"""Turn the shop's original photos into the web-ready crops the site uses.

Usage:  python3 tools/build-images.py [SOURCE_DIR]
  SOURCE_DIR  folder holding the original WhatsApp photos
              (default: tools/source-photos)

Reads tools/image-map.json. For each entry it crops the photo around a focus
point (fx, fy = 0..1) to a 4:5 portrait (products) or 16:9 (hero), then writes
two sizes into public/images/. Needs:  pip install pillow
Edit fx/fy/zoom in image-map.json to re-frame any picture, then re-run.
"""
import json, sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "tools" / "source-photos"
MAP = json.loads((ROOT / "tools" / "image-map.json").read_text())

def crop(im, fx, fy, zoom, ratio):
    W, H = im.size
    if W / H > ratio:
        h = H / zoom; w = h * ratio
    else:
        w = W / zoom; h = w / ratio
    x = min(max(fx * W - w / 2, 0), W - w)
    y = min(max(fy * H - h / 2, 0), H - h)
    return im.crop((round(x), round(y), round(x + w), round(y + h)))

def save(im, path, width, ratio):
    out = im.resize((width, round(width / ratio)), Image.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    out.save(path, "JPEG", quality=78, optimize=True, progressive=True)

def run(group, outdir, widths, ratio):
    for name, s in MAP[group].items():
        im = ImageOps.exif_transpose(Image.open(SRC / s["src"])).convert("RGB")
        c = crop(im, s["fx"], s["fy"], s.get("zoom", 1.0), ratio)
        for w in widths:
            save(c, ROOT / "public" / "images" / outdir / f"{name}-{w}.jpg", w, ratio)
        print("ok", outdir, name)

run("products", "products", (480, 960), 4 / 5)
hero = MAP["site"]["hero"]
im = ImageOps.exif_transpose(Image.open(SRC / hero["src"])).convert("RGB")
c = crop(im, hero["fx"], hero["fy"], hero.get("zoom", 1.0), 16 / 9)
for w in (800, 1600):
    save(c, ROOT / "public" / "images" / "site" / f"hero-{w}.jpg", w, 16 / 9)
print("ok hero")
