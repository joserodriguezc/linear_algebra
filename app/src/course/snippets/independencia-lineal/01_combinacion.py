# Combinación lineal e independencia: ¿alguno de los vectores se obtiene a partir de los otros?
import numpy as np

x1 = np.array([1, 2, 3])
x2 = np.array([2, 1, 0])
x3 = np.array([1, -1, -3])

print("x2 - x1 =", x2 - x1)               # coincide con x3: x3 es combinación lineal de x1 y x2
A = np.column_stack([x1, x2, x3])         # los vectores como columnas
print(A)
print("rango:", np.linalg.matrix_rank(A))  # 2 < 3 -> son linealmente dependientes

B = np.column_stack([x1, x2, [0, 0, 1]])
print("rango con (0, 0, 1):", np.linalg.matrix_rank(B))  # 3 -> independientes: forman una base de R^3
