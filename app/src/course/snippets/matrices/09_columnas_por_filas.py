# AB como suma de matrices de rango 1: columna k de A por fila k de B
import numpy as np

A = np.array([[1, 2], [3, 4], [5, 6]])
B = np.array([[1, 2], [3, 4]])

capas = [np.outer(A[:, k], B[k, :]) for k in range(A.shape[1])]
for k, C_k in enumerate(capas, start=1):
    print(f"capa {k} (rango {np.linalg.matrix_rank(C_k)}):")
    print(C_k)
print("suma de las capas:")
print(sum(capas))
print("¿igual a A @ B?", np.array_equal(sum(capas), A @ B))
