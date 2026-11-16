# Resolver un sistema de ecuaciones lineales:  x + y = 3,  x - y = 1
import numpy as np

A = np.array([[1.0, 1.0],
              [1.0, -1.0]])   # coeficientes
b = np.array([3.0, 1.0])      # términos independientes
x = np.linalg.solve(A, b)
print(x)                      # [2. 1.] -> x = 2, y = 1
print(A @ x)                  # comprobación: debe dar b
