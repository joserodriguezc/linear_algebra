# Proyección sobre una recta: P = b bᵀ / (bᵀ b)
import numpy as np

b = np.array([3.0, 4.0])
P = np.outer(b, b) / (b @ b)
print(P)
x = np.array([1.0, 3.0])
p = P @ x
print("Px =", p, "  residuo =", x - p)
print("residuo · b =", round((x - p) @ b, 12))     # 0: perpendicular
print("P @ P == P:", np.allclose(P @ P, P), "  P simétrica:", np.allclose(P, P.T))
