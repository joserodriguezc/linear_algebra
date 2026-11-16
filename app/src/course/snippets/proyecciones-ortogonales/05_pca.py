# PCA también proyecta: sobre el subespacio de las k primeras componentes principales
import numpy as np

rng = np.random.default_rng(0)
X = rng.multivariate_normal([0, 0, 0], [[3, 1.5, 0.5], [1.5, 2, 0.3], [0.5, 0.3, 0.2]], size=200)
Xc = X - X.mean(axis=0)
_, _, VT = np.linalg.svd(Xc, full_matrices=False)
Vk = VT[:2].T                                   # 2 primeras componentes (columnas ortonormales)
P = Vk @ Vk.T                                   # proyección sobre el plano principal
Xproj = Xc @ P                                  # cada fila proyectada (P es simétrica)
print("P² = P:", np.allclose(P @ P, P))
print("error medio de reconstrucción:", np.mean(np.sum((Xc - Xproj) ** 2, axis=1)).round(4))
