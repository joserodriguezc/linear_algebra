# Matrices simétricas: valores propios reales y vectores propios ortogonales -> usa eigh
import numpy as np

S = np.array([[2.0, 1.0],
              [1.0, 2.0]])
values, Q = np.linalg.eigh(S)          # eigh: para matrices simétricas (más estable, ordena)
print(values)
print(Q)
print("QᵀQ =")
print(np.round(Q.T @ Q, 10))           # Q es ortogonal
print(np.allclose(Q @ np.diag(values) @ Q.T, S))   # S = Q Λ Qᵀ
