# k-means desde cero: distancias con broadcasting, asignar con argmin y recalcular centroides
import matplotlib.pyplot as plt
import numpy as np
from sklearn.cluster import KMeans

rng = np.random.default_rng(0)
centros = np.array([[0.0, 0.0], [5.0, 1.0], [2.0, 5.0]])
X = np.vstack([c + rng.normal(scale=0.8, size=(50, 2)) for c in centros])  # 150 puntos de ℝ²


def kmeans(X, k, semilla, pasos=50):
    C = X[np.random.default_rng(semilla).choice(len(X), k, replace=False)]  # k puntos al azar
    for _ in range(pasos):
        # (150, 1, 2) - (1, 3, 2) -> (150, 3, 2): la diferencia de cada punto con cada centroide
        D = np.linalg.norm(X[:, None, :] - C[None, :, :], axis=2)  # matriz de distancias (150, 3)
        etiquetas = D.argmin(axis=1)  # el centroide más cercano
        nuevos = np.array([X[etiquetas == j].mean(axis=0) for j in range(k)])
        if np.allclose(nuevos, C):
            break
        C = nuevos
    inercia = np.sum(D[np.arange(len(X)), etiquetas] ** 2)  # suma de distancias² al centroide
    return C, etiquetas, inercia


# Un mal arranque puede dejar dos centroides en el mismo grupo: se prueban varios y se queda el mejor
resultados = [kmeans(X, 3, s) for s in range(10)]
print("inercia de cada arranque:", [round(r[2]) for r in resultados])
C, etiquetas, inercia = min(resultados, key=lambda r: r[2])
print("centroides:\n", np.round(C[np.argsort(C[:, 0])], 2))

sk = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
print("sklearn  :\n", np.round(sk.cluster_centers_[np.argsort(sk.cluster_centers_[:, 0])], 2))

plt.scatter(X[:, 0], X[:, 1], c=etiquetas, s=12, cmap="viridis")
plt.scatter(C[:, 0], C[:, 1], c="red", marker="x", s=120)
plt.title("k-means con NumPy")
plt.axis("equal")
plt.show()
