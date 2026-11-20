# ¿Cuántas componentes son señal? Ley de Marchenko-Pastur para la covarianza del ruido puro
import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(0)
n, p = 2000, 400
gamma = p / n

# Datos = 3 direcciones con señal + ruido de varianza 1
direcciones = np.linalg.qr(rng.normal(size=(p, 3)))[0]
fuerza = np.array([3.0, 2.0, 1.2])
X = rng.normal(size=(n, 3)) * fuerza @ direcciones.T + rng.normal(size=(n, p))

Xc = X - X.mean(axis=0)
lam = np.linalg.eigvalsh(Xc.T @ Xc / (n - 1))[::-1]

lam_mas = (1 + np.sqrt(gamma)) ** 2           # borde superior del ruido (σ² = 1)
lam_menos = (1 - np.sqrt(gamma)) ** 2
print(f"γ = p/n = {gamma}:  el ruido ocupa [{lam_menos:.3f}, {lam_mas:.3f}]")
print("5 mayores valores propios:", np.round(lam[:5], 3))
print("componentes por encima del borde (señal):", int((lam > lam_mas).sum()))

# Aunque el ruido tiene varianza 1 en todas las direcciones, sus valores propios se reparten
t = np.linspace(lam_menos, lam_mas, 300)
densidad = np.sqrt((lam_mas - t) * (t - lam_menos)) / (2 * np.pi * gamma * t)
plt.hist(lam, bins=80, density=True, alpha=0.6, label="valores propios de la covarianza")
plt.plot(t, densidad, label="Marchenko-Pastur (solo ruido)")
plt.axvline(lam_mas, color="k", ls="--", label="λ₊")
plt.legend()
plt.show()
