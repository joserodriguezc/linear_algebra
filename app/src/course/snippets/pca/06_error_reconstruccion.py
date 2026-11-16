# Error de reconstrucción de PCA = suma de las varianzas (valores propios) que se descartan
import numpy as np

rng = np.random.default_rng(1)
X = rng.multivariate_normal([0, 0, 0], [[4, 2, 0.5], [2, 3, 0.4], [0.5, 0.4, 0.5]], size=500)
n = len(X)
Xc = X - X.mean(axis=0)
valores, vectores = np.linalg.eigh(np.cov(Xc.T))
orden = valores.argsort()[::-1]
valores, vectores = valores[orden], vectores[:, orden]

for k in (1, 2, 3):
    Q = vectores[:, :k]
    Xrec = Xc @ Q @ Q.T                                   # proyectar y volver a R^3
    error = np.mean(np.sum((Xc - Xrec) ** 2, axis=1))
    teorico = (n - 1) / n * valores[k:].sum()
    print(f"k = {k}: error = {error:.4f}   ((n-1)/n)·Σ λ descartados = {teorico:.4f}")
