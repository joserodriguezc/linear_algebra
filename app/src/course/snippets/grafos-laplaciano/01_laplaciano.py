# Matriz de adyacencia, grados y laplaciano de un grafo
import numpy as np

aristas = [(0, 1), (1, 2), (2, 3)]        # un camino: 1 — 2 — 3 — 4
n = 4
A = np.zeros((n, n))
for i, j in aristas:
    A[i, j] = A[j, i] = 1
D = np.diag(A.sum(axis=1))
L = D - A
print(L)
print("L @ 1 =", L @ np.ones(n))           # cada fila suma 0
x = np.array([1.0, 1.0, -1.0, -1.0])
print("xᵀLx =", x @ L @ x, "= Σ (x_i − x_j)² =", sum((x[i] - x[j]) ** 2 for i, j in aristas))
