# Con término independiente: añadir una columna de unos a X
import matplotlib.pyplot as plt
import numpy as np

data = np.array([[0.05, 0.12],
                 [0.18, 0.22],
                 [0.31, 0.35],
                 [0.42, 0.38],
                 [0.5, 0.49]])
x, y = data[:, 0], data[:, 1]
X = np.column_stack([np.ones_like(x), x])     # [1, x] por fila
b, *_ = np.linalg.lstsq(X, y, rcond=None)
print("b0 (intercepto) =", round(b[0], 4), "  b1 (pendiente) =", round(b[1], 4))

plt.figure(figsize=(4, 3))
plt.scatter(x, y)
plt.plot(x, X @ b, "r")
plt.title("ŷ = b0 + b1·x")
