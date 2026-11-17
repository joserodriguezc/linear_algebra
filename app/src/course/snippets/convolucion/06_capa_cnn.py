# Una capa de una CNN: convolución + sesgo + ReLU (varios filtros = varios canales de salida)
import numpy as np
from scipy.signal import correlate2d
from sklearn.datasets import load_digits

img = load_digits().images[0] / 16.0
filtros = np.array([
    [[1, 0, -1], [2, 0, -2], [1, 0, -1]],     # bordes verticales
    [[1, 2, 1], [0, 0, 0], [-1, -2, -1]],     # bordes horizontales
], dtype=float)
sesgos = np.array([-0.5, -0.5])

mapas = np.stack([np.maximum(0, correlate2d(img, F, mode="valid") + b) for F, b in zip(filtros, sesgos)])
print("forma de la salida (canales, alto, ancho):", mapas.shape)
print("parámetros de la capa:", filtros.size + sesgos.size)
