# Una capa convolucional es una matriz dispersa con pesos compartidos
import numpy as np
from scipy.signal import correlate2d

h = w = 8
K = np.array([[1, 0, -1], [2, 0, -2], [1, 0, -1]], dtype=float)
oh, ow = h - 2, w - 2

# Construir explícitamente la matriz M tal que salida.ravel() = M @ imagen.ravel()
M = np.zeros((oh * ow, h * w))
for i in range(oh):
    for j in range(ow):
        for a in range(3):
            for b in range(3):
                M[i * ow + j, (i + a) * w + (j + b)] = K[a, b]

img = np.random.default_rng(0).random((h, w))
print("misma salida:", np.allclose(M @ img.ravel(), correlate2d(img, K, mode="valid").ravel()))
print("forma de la matriz:", M.shape, f"  elementos no nulos: {np.count_nonzero(M)} de {M.size}")
print("parámetros de una capa densa 64 → 36:", 64 * 36, "   de la convolución 3×3:", K.size)
