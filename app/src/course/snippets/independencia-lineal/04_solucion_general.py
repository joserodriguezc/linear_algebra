# Solución general de Ax = b cuando hay infinitas: una solución particular + el núcleo
import numpy as np
from sympy import Matrix, linsolve, symbols

A = Matrix([[1, 2, 1],
            [2, 1, -1],
            [3, 0, -3]])
b = Matrix([3, 3, 3])
x, y, z = symbols("x y z")
print(linsolve((A, b), x, y, z))          # una familia de soluciones con un parámetro

# Comprobación numérica: particular + cualquier múltiplo del núcleo sigue siendo solución
An = np.array(A.tolist(), dtype=float)
bn = np.array([3.0, 3.0, 3.0])
particular = np.array([1.0, 1.0, 0.0])
nucleo = np.array([1.0, -1.0, 1.0])
for t in (-2, 0, 0.5, 3):
    print(t, np.allclose(An @ (particular + t * nucleo), bn))
