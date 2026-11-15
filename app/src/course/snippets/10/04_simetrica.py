# Una matriz simétrica es igual a su transpuesta
import numpy as np

S = np.array([[1, 2, 3, 4, 5],
              [2, 1, 2, 3, 4],
              [3, 2, 1, 2, 3],
              [4, 3, 2, 1, 2],
              [5, 4, 3, 2, 1]])
print((S == S.T).all())

# Truco: A.T @ A siempre es simétrica (aparece en la regresión lineal)
A = np.random.default_rng(0).integers(0, 5, size=(4, 3))
G = A.T @ A
print(G)
print("¿simétrica?", np.allclose(G, G.T))
