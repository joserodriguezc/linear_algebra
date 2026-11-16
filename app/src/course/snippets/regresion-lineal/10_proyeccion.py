# La regresión como proyección ortogonal: ŷ = P y con P = X (XᵀX)⁻¹ Xᵀ
import numpy as np

x = np.array([0.0, 1.0, 2.0])
y = np.array([1.0, 3.0, 4.0])
X = np.column_stack([np.ones_like(x), x])

P = X @ np.linalg.inv(X.T @ X) @ X.T
y_hat = P @ y
r = y - y_hat
print("ŷ =", y_hat.round(4))
print("Xᵀ r =", (X.T @ r).round(12))      # residuo ⟂ columnas de X
print("P² = P:", np.allclose(P @ P, P), "  P simétrica:", np.allclose(P, P.T))
