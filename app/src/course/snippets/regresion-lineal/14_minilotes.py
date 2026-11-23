# Descenso estocástico por mini-lotes: el gradiente se estima con m filas de X en cada paso
import numpy as np

rng = np.random.default_rng(2)
n, p = 10_000, 5
X = np.column_stack([np.ones(n), rng.normal(size=(n, p - 1))])
b_real = np.array([1.0, -2.0, 0.5, 3.0, 0.0])
y = X @ b_real + rng.normal(scale=0.5, size=n)

m, eta, epocas = 32, 0.05, 5
b = np.zeros(p)
for epoca in range(epocas):
    orden = rng.permutation(n)                 # barajar las filas en cada época
    for inicio in range(0, n, m):
        idx = orden[inicio : inicio + m]
        XB, yB = X[idx], y[idx]                # submatriz de m filas
        grad = 2 / len(idx) * XB.T @ (XB @ b - yB)
        b -= eta * grad
    print(f"época {epoca + 1}: ECM = {np.mean((X @ b - y) ** 2):.4f}")

b_ls = np.linalg.lstsq(X, y, rcond=None)[0]
print("mini-lotes:", np.round(b, 3))
print("lstsq     :", np.round(b_ls, 3))
print("pasos por época:", n // m, "  cada uno cuesta del orden de m·p =", m * p, "operaciones")
