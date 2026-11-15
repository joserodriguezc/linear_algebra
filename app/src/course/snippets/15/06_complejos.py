# Una rotación no deja ninguna dirección fija: sus valores propios son complejos
import numpy as np

R = np.array([[0.0, -1.0],
              [1.0, 0.0]])
values, vectors = np.linalg.eig(R)
print(values)      # ±1j (la unidad imaginaria)
