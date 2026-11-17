# Los cuatro subespacios fundamentales y sus ortogonalidades
import numpy as np
from scipy.linalg import null_space, orth

A = np.array([[1.0, 2.0, 1.0],
              [2.0, 1.0, -1.0],
              [3.0, 0.0, -3.0]])
m, n = A.shape
r = np.linalg.matrix_rank(A)

fila = orth(A.T)            # espacio fila  Im(Aᵀ): dentro de los vectores de n componentes
nucleo = null_space(A)      # núcleo        ker(A)
columna = orth(A)           # espacio columna Im(A): dentro de los vectores de m componentes
nucleo_izq = null_space(A.T)  # núcleo izquierdo ker(Aᵀ)

print(f"m = {m}, n = {n}, rango r = {r}")
print("dimensiones:", fila.shape[1], nucleo.shape[1], columna.shape[1], nucleo_izq.shape[1])
print("espacio fila ⟂ núcleo:", np.allclose(fila.T @ nucleo, 0))
print("espacio columna ⟂ núcleo izquierdo:", np.allclose(columna.T @ nucleo_izq, 0))
