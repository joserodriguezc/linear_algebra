# En ML: un recomendador por factorización de bajo rango (SVD truncada)
import numpy as np

# Valoraciones (filas = usuarios, columnas = películas); 0 = no vista
R = np.array([[5, 4, 0, 1, 0],
              [4, 5, 1, 0, 1],
              [1, 0, 5, 4, 5],
              [0, 1, 4, 5, 4],
              [5, 5, 0, 0, 1]], dtype=float)
U, s, VT = np.linalg.svd(R)
k = 2                                    # 2 "gustos" latentes: acción vs. drama
R_k = U[:, :k] @ np.diag(s[:k]) @ VT[:k, :]
print(np.round(R_k, 1))
print("Predicción usuario 0, película 2:", round(R_k[0, 2], 2))
