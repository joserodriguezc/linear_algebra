# Problema de valores propios generalizado: S v = λ T v
import numpy as np
from scipy.linalg import eigh

S = np.array([[4.0, 1.0], [1.0, 3.0]])  # simétrica
T = np.array([[2.0, 0.5], [0.5, 1.0]])  # simétrica y definida positiva

valores, V = eigh(S, T)  # SciPy resuelve S v = λ T v directamente
print("eigh(S, T)     :", np.round(valores, 4))

# Equivale a los valores propios de T⁻¹S
print("eig(inv(T) @ S):", np.round(np.sort(np.linalg.eigvals(np.linalg.inv(T) @ S).real), 4))

v = V[:, 0]
print("¿S v = λ T v?", np.allclose(S @ v, valores[0] * T @ v))
# Con T = I vuelve a ser el problema de siempre
print("eigh(S, I)     :", np.round(eigh(S, np.eye(2))[0], 4), " eigh(S):", np.round(eigh(S)[0], 4))

# AᵀA siempre es semidefinida positiva: xᵀAᵀAx = ‖Ax‖² ≥ 0
A = np.random.default_rng(0).normal(size=(5, 3))
print("valores propios de AᵀA:", np.round(np.linalg.eigvalsh(A.T @ A), 4))
