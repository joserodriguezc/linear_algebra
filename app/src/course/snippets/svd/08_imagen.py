# Comprimir una imagen con SVD truncada
import matplotlib.pyplot as plt
import numpy as np

# Imagen sintética de 64x64: círculos concéntricos, un degradado y textura aleatoria
y, x = np.mgrid[-1:1:64j, -1:1:64j]
rng = np.random.default_rng(0)
img = (0.5 + 0.5 * np.sin(12 * np.sqrt(x**2 + y**2)) * np.exp(-2 * (x**2 + y**2))
       + 0.3 * x + 0.15 * rng.random((64, 64)))      # algo de textura/ruido

U, s, VT = np.linalg.svd(img)
fig, axes = plt.subplots(1, 4, figsize=(8, 2.3))
for ax, k in zip(axes, [1, 5, 15, 64]):
    ax.imshow(U[:, :k] @ np.diag(s[:k]) @ VT[:k, :], cmap="gray")
    ax.set_title(f"k = {k}")
    ax.axis("off")
energia = np.cumsum(s**2) / np.sum(s**2)
print("energía con k = 5, 15:", np.round(energia[[4, 14]], 4))
