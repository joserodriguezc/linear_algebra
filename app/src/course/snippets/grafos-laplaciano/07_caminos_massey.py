# Potencias de la adyacencia y clasificación por mínimos cuadrados (método de Massey)
import numpy as np

# 1) (A^k)_ij cuenta los caminos de longitud k entre i y j
A = np.array([[0, 1, 1, 0],
              [1, 0, 1, 0],
              [1, 1, 0, 1],
              [0, 0, 1, 0]])
print("A² =\n", A @ A, "\n(la diagonal de A² son los grados)")
print("caminos de longitud 3 de 0 a 3:", np.linalg.matrix_power(A, 3)[0, 3])

# 2) Massey: cada partido es una ecuación r_ganador − r_perdedor ≈ diferencia de puntos
equipos = ["Águilas", "Búhos", "Cóndores", "Delfines"]
partidos = [(0, 1, 7), (0, 2, 3), (1, 2, 10), (1, 3, 4), (2, 3, 6), (3, 0, 2)]  # (ganador, perdedor, diferencia)
X = np.zeros((len(partidos), len(equipos)))
y = np.zeros(len(partidos))
for f, (g, p, d) in enumerate(partidos):
    X[f, g], X[f, p], y[f] = 1, -1, d

M = X.T @ X
print("\nXᵀX =\n", M.astype(int))
print("¿es el laplaciano del grafo de partidos? filas suman 0:", np.allclose(M.sum(axis=1), 0))

# M es singular (M·1 = 0): lstsq da la solución de norma mínima, que además suma 0
r = np.linalg.lstsq(X, y, rcond=None)[0]
for i in np.argsort(-r):
    print(f"{equipos[i]:9s} {r[i]:+.2f}")
print("suma de ratings:", round(r.sum(), 10))
