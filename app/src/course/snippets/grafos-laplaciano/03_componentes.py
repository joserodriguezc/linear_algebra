# El número de valores propios nulos del laplaciano es el número de componentes conexas
import numpy as np


def laplaciano(aristas, n):
    A = np.zeros((n, n))
    for i, j in aristas:
        A[i, j] = A[j, i] = 1
    return np.diag(A.sum(axis=1)) - A

conexo = [(0, 1), (1, 2), (2, 0), (2, 3), (3, 4), (4, 5), (5, 3)]
separado = [(0, 1), (1, 2), (2, 0), (3, 4), (4, 5), (5, 3)]     # sin el puente 2–3
for nombre, aristas in [("con puente", conexo), ("sin puente", separado)]:
    valores = np.linalg.eigvalsh(laplaciano(aristas, 6))
    print(f"{nombre}: λ = {valores.round(3)}  → componentes = {np.sum(np.isclose(valores, 0))}")
