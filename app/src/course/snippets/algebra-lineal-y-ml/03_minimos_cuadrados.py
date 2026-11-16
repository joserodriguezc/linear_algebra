# Un adelanto: mínimos cuadrados en tres líneas (lo veremos a fondo en la etapa de regresión lineal)
import numpy as np

x = np.array([0.0, 1.0, 2.0, 3.0])
y = np.array([1.1, 2.9, 5.2, 6.8])
X = np.column_stack([np.ones_like(x), x])
b, *_ = np.linalg.lstsq(X, y, rcond=None)
print(f"y ≈ {b[0]:.2f} + {b[1]:.2f}·x")
