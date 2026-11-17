# La misma convolución como producto por una matriz de Toeplitz (diagonales constantes)
import numpy as np
from scipy.linalg import toeplitz

x = np.array([2.0, 4.0, 6.0, 5.0, 1.0])
k = np.array([0.25, 0.5, 0.25])
n = len(x)

columna = np.r_[k[1], k[2], np.zeros(n - 2)]   # diagonal principal y la de debajo
fila = np.r_[k[1], k[0], np.zeros(n - 2)]      # diagonal principal y la de encima
T = toeplitz(columna, fila)
print(T)
print("T @ x          :", T @ x)
print("np.convolve    :", np.convolve(x, k, mode="same"))
