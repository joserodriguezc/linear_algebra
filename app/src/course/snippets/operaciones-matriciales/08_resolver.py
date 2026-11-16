# Resolver un sistema Ax = b. Mejor solve() que inv(A) @ b: más rápido y más estable
import numpy as np

A = np.array([[2.0, 1.0],
              [1.0, 3.0]])
b = np.array([3.0, 5.0])
print(np.linalg.solve(A, b))
print(np.linalg.inv(A) @ b)
