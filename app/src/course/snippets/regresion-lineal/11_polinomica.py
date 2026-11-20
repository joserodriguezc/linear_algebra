# Regresión polinómica: sigue siendo mínimos cuadrados, con una matriz de Vandermonde
import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(0)
x = np.sort(rng.uniform(-1, 1, 20))
y = np.sin(3 * x) + rng.normal(scale=0.15, size=20)
x_val = np.sort(rng.uniform(-1, 1, 200))  # datos de validación
y_val = np.sin(3 * x_val) + rng.normal(scale=0.15, size=200)

xs = np.linspace(-1, 1, 200)
plt.scatter(x, y, color="black", s=15)
for d in (1, 3, 15):
    X = np.vander(x, d + 1, increasing=True)  # columnas 1, x, x², …, x^d
    b, *_ = np.linalg.lstsq(X, y, rcond=None)
    ecm = np.mean((X @ b - y) ** 2)
    ecm_val = np.mean((np.vander(x_val, d + 1, increasing=True) @ b - y_val) ** 2)
    print(f"grado {d:2d}: ECM entrenamiento = {ecm:.4f}  validación = {ecm_val:.4f}  κ(X) = {np.linalg.cond(X):.1e}")
    plt.plot(xs, np.vander(xs, d + 1, increasing=True) @ b, label=f"grado {d}")
plt.ylim(-2, 2)
plt.legend()
plt.show()
