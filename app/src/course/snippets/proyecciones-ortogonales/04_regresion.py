# La regresión lineal es una proyección: ŷ = P y, con P la proyección sobre el espacio columna de X
import numpy as np

x = np.array([0.0, 1.0, 2.0])
y = np.array([1.0, 4.0, 3.0])
X = np.column_stack([np.ones_like(x), x])

P = X @ np.linalg.inv(X.T @ X) @ X.T
b, *_ = np.linalg.lstsq(X, y, rcond=None)
print("ŷ = P y        :", (P @ y).round(4))
print("ŷ = X b (lstsq):", (X @ b).round(4))
print("Xᵀ(y - ŷ) =", (X.T @ (y - P @ y)).round(12))   # el residuo es perpendicular a cada columna de X
