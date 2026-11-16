# Espacio columna y núcleo: exactos con SymPy y numéricos (base ortonormal) con SciPy
import numpy as np
from scipy.linalg import null_space, orth
from sympy import Matrix

A = [[1, 2, 1],
     [2, 1, -1],
     [3, 0, -3]]

M = Matrix(A)
print("base del espacio columna:", [list(v) for v in M.columnspace()])
print("base del núcleo:", [list(v) for v in M.nullspace()])

N = null_space(np.array(A, dtype=float))   # columnas ortonormales que generan el núcleo
print("núcleo (SciPy):", N.ravel().round(4))
print("A @ N ≈ 0:", np.allclose(np.array(A) @ N, 0))
print("dimensión del espacio columna (SciPy):", orth(np.array(A, dtype=float)).shape[1])
