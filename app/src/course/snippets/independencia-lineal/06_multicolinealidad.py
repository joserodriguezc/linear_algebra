# En ML: una característica que es combinación lineal de otras deja a X sin rango completo
import numpy as np
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(0)
n = 50
x1 = rng.normal(size=n)
x2 = rng.normal(size=n)
x3 = x1 + 2 * x2                          # redundante: combinación lineal exacta
y = 3 * x1 - x2 + rng.normal(scale=0.1, size=n)

X = np.column_stack([x1, x2, x3])
print("rango de X:", np.linalg.matrix_rank(X), "de", X.shape[1], "columnas")
print(f"número de condición de X: {np.linalg.cond(X):.1e}")
print("coeficientes con x3:", LinearRegression().fit(X, y).coef_.round(3))   # no son únicos
X_ok = X[:, :2]
print("coeficientes sin x3:", LinearRegression().fit(X_ok, y).coef_.round(3))
