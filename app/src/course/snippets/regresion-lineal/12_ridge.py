# Ridge = desplazar la matriz: XᵀX + αI tiene rango completo y un número de condición menor
import numpy as np
from sklearn.linear_model import Ridge

rng = np.random.default_rng(0)
n = 50
x1 = rng.normal(size=n)
x2 = x1 + rng.normal(scale=1e-4, size=n)  # casi una copia de x1
X = np.column_stack([x1, x2])
y = 3 * x1 + rng.normal(scale=0.1, size=n)

G = X.T @ X
print("κ(XᵀX)      =", f"{np.linalg.cond(G):.2e}")
print("ecuación normal:", np.round(np.linalg.solve(G, X.T @ y), 2), " ← coeficientes inestables")

alpha = 1.0
G_ridge = G + alpha * np.eye(2)  # «desplazar» la matriz: suma α a cada valor propio
print("κ(XᵀX + αI) =", f"{np.linalg.cond(G_ridge):.2e}")
b = np.linalg.solve(G_ridge, X.T @ y)
print("Ridge         :", np.round(b, 3), " ← reparte el peso entre las dos columnas")
print("sklearn Ridge :", np.round(Ridge(alpha=alpha, fit_intercept=False).fit(X, y).coef_, 3))
print("valores propios de XᵀX       :", np.round(np.linalg.eigvalsh(G), 6))
print("valores propios de XᵀX + αI  :", np.round(np.linalg.eigvalsh(G_ridge), 6))
