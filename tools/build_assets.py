"""``uv run build-assets``: genera de forma reproducible los datos que usan las visualizaciones.

Salida en app/public/data/:
- svd_image.json   imagen en escala de grises + su SVD (para la compresión con k valores singulares)

(Las nubes de puntos de PCA y regresión se generan en el navegador con una semilla fija.)
"""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np

OUT = Path(__file__).resolve().parent.parent / "app" / "public" / "data"


def _round(a: np.ndarray, d: int = 4) -> list:
    return np.round(a, d).tolist()


def svd_image(size: int = 64) -> dict:
    from PIL import Image
    from sklearn.datasets import load_sample_image

    img = Image.fromarray(load_sample_image("china.jpg")).convert("L")
    w, h = img.size
    side = min(w, h)
    img = img.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
    A = np.asarray(img.resize((size, size), Image.Resampling.LANCZOS), dtype=float) / 255.0
    U, s, Vt = np.linalg.svd(A)
    return {"size": size, "pixels": _round(A, 3), "U": _round(U), "s": _round(s), "Vt": _round(Vt)}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    assets = {"svd_image.json": svd_image()}
    for name, data in assets.items():
        (OUT / name).write_text(json.dumps(data, separators=(",", ":")), encoding="utf-8")
        print(f"escrito {OUT / name}")
