# Estabilidad: con columnas casi dependientes, la ecuación normal pierde precisión
import numpy as np

rng = np.random.default_rng(0)
x = rng.uniform(0, 1, 50)
X = np.column_stack([x, x + 1e-7 * rng.normal(size=50)])   # dos columnas casi iguales
b_real = np.array([1.0, 2.0])
y = X @ b_real

print("número de condición de X   :", f"{np.linalg.cond(X):.1e}")
print("número de condición de XᵀX :", f"{np.linalg.cond(X.T @ X):.1e}  (¡su cuadrado!)")
b_inv = np.linalg.inv(X.T @ X) @ X.T @ y
Q, R = np.linalg.qr(X)
b_qr = np.linalg.solve(R, Q.T @ y)
b_lstsq = np.linalg.lstsq(X, y, rcond=None)[0]
for nombre, b in [("inversa", b_inv), ("QR", b_qr), ("lstsq", b_lstsq)]:
    print(f"{nombre:8s} error = {np.linalg.norm(b - b_real):.2e}")
