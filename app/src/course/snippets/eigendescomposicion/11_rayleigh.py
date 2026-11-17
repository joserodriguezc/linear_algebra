# Cociente de Rayleigh: R(x) = xᵀSx / xᵀx siempre está entre el menor y el mayor valor propio
import numpy as np

S = np.array([[2.0, 1.0],
              [1.0, 2.0]])
rng = np.random.default_rng(0)
X = rng.normal(size=(5000, 2))
R = np.einsum("ij,jk,ik->i", X, S, X) / np.einsum("ij,ij->i", X, X)
print("R mínimo y máximo (muestreo):", R.min().round(4), R.max().round(4))
print("valores propios:", np.linalg.eigvalsh(S))
v = np.array([1.0, 1.0])
print("R en el vector propio (1, 1):", (v @ S @ v) / (v @ v))
