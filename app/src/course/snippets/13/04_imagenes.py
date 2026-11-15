# En ML: un lote de imágenes en color es un tensor 4D (lote, alto, ancho, canales)
import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(0)
lote = rng.random((8, 16, 16, 3))      # 8 imágenes RGB de 16x16
print("shape:", lote.shape, " ndim:", lote.ndim)

primera = lote[0]                      # (16, 16, 3)
rojo = lote[:, :, :, 0]                # canal rojo de todas: (8, 16, 16)
print(primera.shape, rojo.shape)

# Una operación por lote: media por canal en todo el lote -> (3,)
print(lote.mean(axis=(0, 1, 2)))

fig, ax = plt.subplots(1, 4, figsize=(6, 1.8))
for i in range(4):
    ax[i].imshow(lote[i])
    ax[i].axis("off")
