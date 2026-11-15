# Álgebra lineal numérica: el computador redondea
import numpy as np

print(0.1 + 0.2)              # no es exactamente 0.3
print(0.1 + 0.2 == 0.3)       # False
print(np.isclose(0.1 + 0.2, 0.3))   # compara con tolerancia

A = np.array([[1.0, 2.0],
              [3.0, 4.0]])
print(A @ np.linalg.inv(A))   # "casi" la identidad
