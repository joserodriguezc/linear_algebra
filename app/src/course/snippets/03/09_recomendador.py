# Recomendadores: la matriz usuarios x productos y su similitud (producto punto normalizado)
import numpy as np

R = np.array([[5, 4, 0, 1],
              [4, 5, 1, 0],
              [0, 1, 5, 4]], dtype=float)     # 3 usuarios, 4 películas
norma = np.linalg.norm(R, axis=1, keepdims=True)
similitud = (R / norma) @ (R / norma).T       # similitud coseno entre usuarios
print(similitud.round(2))
