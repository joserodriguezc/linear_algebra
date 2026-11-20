# Reglas del rango y la matriz AᵀA
import numpy as np
from numpy.linalg import matrix_rank as rank

rng = np.random.default_rng(0)


def con_rango(m, n, r):
    """Matriz aleatoria m×n de rango r: producto de (m×r)·(r×n)."""
    return rng.normal(size=(m, r)) @ rng.normal(size=(r, n))


A = con_rango(6, 5, 3)
B = con_rango(5, 4, 2)
C = con_rango(6, 5, 2)
print("rank(A) =", rank(A), " rank(B) =", rank(B), " rank(C) =", rank(C))
print("rank(AB)  =", rank(A @ B), " ≤ min(3, 2) = 2")
print("rank(A+C) =", rank(A + C), " ≤ 3 + 2 = 5")
print("rank(AᵀA) =", rank(A.T @ A), " = rank(A) =", rank(A))

S = A.T @ A
print("AᵀA es simétrica:", np.allclose(S, S.T))
M = rng.normal(size=(3, 3))
print("(M + Mᵀ)/2 es simétrica:", np.allclose((M + M.T) / 2, ((M + M.T) / 2).T))

# Consecuencia: XᵀX es invertible solo si X tiene columnas independientes
X = con_rango(10, 3, 2)  # 3 columnas, pero solo 2 independientes
print("rank(XᵀX) =", rank(X.T @ X), "de 3 → XᵀX es singular")
