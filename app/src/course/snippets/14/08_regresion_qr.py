# En ML: mínimos cuadrados con QR (más estable que invertir XᵀX); lo veremos en la etapa 19
import numpy as np

rng = np.random.default_rng(0)
x = rng.uniform(0, 10, 20)
y = 1.5 + 0.8 * x + rng.normal(0, 1, 20)
X = np.column_stack([np.ones_like(x), x])   # columna de unos para el término independiente

Q, R = np.linalg.qr(X)
b = np.linalg.solve(R, Q.T @ y)             # R es triangular: el sistema es fácil
print("intercepto y pendiente:", np.round(b, 3))
