# Descenso de gradiente: b ← b − η·(2/n)·Xᵀ(Xb − y), comparado con la solución cerrada
import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(1)
n = 200
x = rng.uniform(0, 10, size=n)
y = 2 + 0.7 * x + rng.normal(scale=1.0, size=n)


def descenso(X, y, eta, pasos=500):
    b = np.zeros(X.shape[1])
    historia = []
    for _ in range(pasos):
        r = X @ b - y                    # residuos con el signo de la fórmula
        grad = 2 / len(y) * X.T @ r      # un producto matriz-vector con Xᵀ
        b = b - eta * grad
        historia.append(np.mean(r**2))
    return b, historia


def kappa(X):
    lam = np.linalg.eigvalsh(X.T @ X / len(X))
    return lam[-1] / lam[0], lam[-1]


# 1) x tal cual: XᵀX/n está mal condicionada
X = np.column_stack([np.ones(n), x])
k, lam_max = kappa(X)
eta = 0.9 / lam_max                      # converge si η < 1/λ_max(XᵀX/n)
b_gd, h1 = descenso(X, y, eta, pasos=3000)
b_ls = np.linalg.lstsq(X, y, rcond=None)[0]
ecm_min = np.mean((X @ b_ls - y) ** 2)
print(f"x sin escalar   κ = {k:7.1f}   descenso: {np.round(b_gd, 3)}   lstsq: {np.round(b_ls, 3)}")

# 2) x estandarizada (media 0, desviación 1): XᵀX/n ≈ I y κ ≈ 1
z = (x - x.mean()) / x.std()
Z = np.column_stack([np.ones(n), z])
k, lam_max = kappa(Z)
b_gd, h2 = descenso(Z, y, 0.9 / lam_max)
print(f"x estandarizada κ = {k:7.1f}   descenso: {np.round(b_gd, 3)}   lstsq: {np.round(np.linalg.lstsq(Z, y, rcond=None)[0], 3)}")

# 3) Paso demasiado grande: diverge
_, h3 = descenso(X, y, 1.1 / kappa(X)[1], pasos=30)
print(f"η por encima del límite: ECM tras 30 pasos = {h3[-1]:.2e}")

# Mismo modelo y mismo mínimo: solo cambia la forma del «cuenco»
for h, nombre in [(h1, "x sin escalar"), (h2, "x estandarizada")]:
    pasos = next((i for i, e in enumerate(h) if e - ecm_min < 1e-6), None)
    print(f"{nombre:16s}: pasos hasta ECM − ECM_min < 1e-6 = {pasos}")

plt.semilogy(np.array(h1[:1200]) - ecm_min, label="x sin escalar (κ grande)")
plt.semilogy(np.array(h2[:100]) - ecm_min, label="x estandarizada (κ ≈ 1)")
plt.xlabel("paso")
plt.ylabel("ECM − ECM mínimo")
plt.legend()
plt.show()
