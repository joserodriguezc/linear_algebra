# Convolución 2D sobre imágenes de dígitos: desenfoque y detección de bordes
import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import correlate2d
from sklearn.datasets import load_digits

img = load_digits().images[3]
nucleos = {
    "desenfoque": np.full((3, 3), 1 / 9),
    "bordes verticales": np.array([[1, 0, -1], [2, 0, -2], [1, 0, -1]]),
    "bordes horizontales": np.array([[1, 2, 1], [0, 0, 0], [-1, -2, -1]]),
}
fig, axes = plt.subplots(1, 4, figsize=(8, 2.3))
axes[0].imshow(img, cmap="gray_r")
axes[0].set_title("original")
for ax, (nombre, K) in zip(axes[1:], nucleos.items()):
    ax.imshow(correlate2d(img, K, mode="valid"), cmap="RdBu_r" if K.min() < 0 else "gray_r")
    ax.set_title(nombre, fontsize=9)
for ax in axes:
    ax.axis("off")
print("tamaño de entrada:", img.shape, " de salida (modo válido):", correlate2d(img, nucleos["desenfoque"], mode="valid").shape)
