# Tres ecuaciones con tres incógnitas: la misma llamada, sea cual sea el tamaño
import numpy as np

A = np.array([[2.0, 1.0, -1.0],
              [-3.0, -1.0, 2.0],
              [-2.0, 1.0, 2.0]])
b = np.array([8.0, -11.0, -3.0])
print(np.linalg.solve(A, b))  # [ 2.  3. -1.]
