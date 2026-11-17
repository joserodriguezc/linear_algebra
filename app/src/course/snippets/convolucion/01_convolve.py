# Convolución 1D: deslizar el filtro sobre la señal y sumar productos
import numpy as np

x = np.array([2.0, 4.0, 6.0, 5.0, 1.0])
k = np.array([0.25, 0.5, 0.25])          # media móvil: suaviza
print(np.convolve(x, k, mode="same"))     # misma longitud que x (bordes con ceros)
print(np.convolve(x, k, mode="full"))     # todas las posiciones en que se solapan
