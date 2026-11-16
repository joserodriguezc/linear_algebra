# Método de la potencia: multiplicar repetidamente por A converge al vector propio dominante
import numpy as np

A = np.array([[2.0, 1.0],
              [1.0, 3.0]])
v = np.array([1.0, 0.0])
for i in range(25):
    v = A @ v
    v = v / np.linalg.norm(v)
lam = v @ A @ v                      # cociente de Rayleigh
print("vector:", np.round(v, 4), " λ ≈", round(lam, 4))
print("eigh :", np.linalg.eigh(A))
