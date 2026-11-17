# Una capa de red neuronal de grafos (GCN): cada nodo promedia las características de sus vecinos
import numpy as np

A = np.array([[0, 1, 1, 0],
              [1, 0, 1, 0],
              [1, 1, 0, 1],
              [0, 0, 1, 0]], dtype=float)
A_hat = A + np.eye(4)                                 # cada nodo también se "escucha" a sí mismo
d = A_hat.sum(axis=1)
A_norm = np.diag(d ** -0.5) @ A_hat @ np.diag(d ** -0.5)   # normalización simétrica
X = np.array([[1.0, 0.0], [0.0, 1.0], [1.0, 1.0], [0.0, 0.0]])   # 2 características por nodo
W = np.array([[1.0, -1.0], [0.5, 2.0]])                          # pesos aprendidos
H = np.maximum(0, A_norm @ X @ W)                                 # Â X W + ReLU
print(H.round(3))
