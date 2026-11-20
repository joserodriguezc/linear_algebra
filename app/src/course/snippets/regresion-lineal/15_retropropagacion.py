# Retropropagación: los gradientes de una red de dos capas son productos con matrices traspuestas
import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(3)
n = 200
X = rng.uniform(-3, 3, size=(n, 1))
y = np.sin(X) + rng.normal(scale=0.1, size=(n, 1))   # una curva: la regresión lineal no basta

h = 16                                                # neuronas ocultas
W1, b1 = rng.normal(scale=1.0, size=(1, h)), np.zeros(h)
W2, b2 = rng.normal(scale=0.3, size=(h, 1)), np.zeros(1)


def adelante(X):
    Z1 = X @ W1 + b1          # (n, h)
    H1 = np.tanh(Z1)          # activación no lineal
    return Z1, H1, H1 @ W2 + b2


def gradientes(X, y):
    _, H1, y_hat = adelante(X)
    G2 = 2 / len(X) * (y_hat - y)       # ∂L/∂ŷ, de forma (n, 1): igual que en la regresión
    dW2 = H1.T @ G2                      # ∂L/∂W2 = H1ᵀ G2
    db2 = G2.sum(axis=0)                 # ∂L/∂b2 = suma de las filas
    G1 = (G2 @ W2.T) * (1 - H1**2)       # se propaga hacia atrás con W2ᵀ, por f'(Z1) = 1 − tanh²
    dW1 = X.T @ G1                       # ∂L/∂W1 = Xᵀ G1
    db1 = G1.sum(axis=0)
    return dW1, db1, dW2, db2


# Comprobación: el gradiente analítico coincide con diferencias finitas
def loss():
    return np.mean((adelante(X)[2] - y) ** 2)


dW1 = gradientes(X, y)[0]
eps = 1e-6
W1[0, 0] += eps
l_mas = loss()
W1[0, 0] -= 2 * eps
l_menos = loss()
W1[0, 0] += eps
print(f"∂L/∂W1[0,0]  analítico = {dW1[0, 0]:.6f}   numérico = {(l_mas - l_menos) / (2 * eps):.6f}")

eta = 0.05
for paso in range(3001):
    dW1, db1, dW2, db2 = gradientes(X, y)
    W1 -= eta * dW1
    b1 -= eta * db1
    W2 -= eta * dW2
    b2 -= eta * db2
    if paso % 1000 == 0:
        print(f"paso {paso:4d}: ECM = {loss():.4f}")

b_lin = np.linalg.lstsq(np.column_stack([np.ones(n), X]), y, rcond=None)[0]
print(f"ECM de una recta (lstsq): {np.mean((b_lin[0] + b_lin[1] * X - y) ** 2):.4f}")

t = np.linspace(-3, 3, 200).reshape(-1, 1)
plt.scatter(X, y, s=8, alpha=0.5, label="datos")
plt.plot(t, adelante(t)[2], color="C1", label="red de dos capas")
plt.plot(t, b_lin[0] + b_lin[1] * t, color="C2", label="recta")
plt.legend()
plt.show()
