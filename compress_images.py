# compress_images.py
import os
from pathlib import Path
from PIL import Image

try:
    import pillow_avif  # noqa: F401  # enables AVIF in Pillow if installed
    AVIF_OK = True
except Exception:
    AVIF_OK = False

SRC_DIR = Path("public/images/slideshow")        # input folder with your originals
OUT_DIR = Path("public/images/slideshow/optimized")     # output folder served by Next.js
OUT_DIR.mkdir(parents=True, exist_ok=True)

MAX_W, MAX_H = 1920, 1080           # cap dimensions for hero/slideshow
WEBP_QUALITY = 80                   # 60–85 is a good range
AVIF_QUALITY = 55                   # AVIF gives similar quality at lower number

def process_one(src_path: Path):
    try:
        with Image.open(src_path) as im:
            im = im.convert("RGB")  # normalize
            # resize to fit in MAX_W×MAX_H preserving aspect
            im.thumbnail((MAX_W, MAX_H), Image.Resampling.LANCZOS)

            base = src_path.stem

            # Write WebP
            webp_path = OUT_DIR / f"{base}.webp"
            im.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)
            print("✓ WEBP", webp_path)

            # Optionally write AVIF too
            if AVIF_OK:
                avif_path = OUT_DIR / f"{base}.avif"
                im.save(avif_path, "AVIF", quality=AVIF_QUALITY)
                print("✓ AVIF", avif_path)

    except Exception as e:
        print("✗ Error", src_path, e)

def main():
    exts = {".jpg", ".jpeg", ".png", ".webp", ".tiff"}
    for root, _, files in os.walk(SRC_DIR):
        for fname in files:
            if Path(fname).suffix.lower() in exts:
                process_one(Path(root) / fname)

if __name__ == "__main__":
    main()
