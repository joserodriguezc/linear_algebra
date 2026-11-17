# Clustering espectral frente a k-means: grupos que no son "bolas" se separan bien con el laplaciano
from sklearn.cluster import KMeans, SpectralClustering
from sklearn.datasets import make_moons
from sklearn.metrics import adjusted_rand_score

X, y = make_moons(n_samples=300, noise=0.06, random_state=0)
km = KMeans(n_clusters=2, n_init=10, random_state=0).fit_predict(X)
sc = SpectralClustering(n_clusters=2, affinity="nearest_neighbors", n_neighbors=10, random_state=0).fit_predict(X)
print("acuerdo con los grupos reales (1 = perfecto)")
print(f"  k-means             : {adjusted_rand_score(y, km):.2f}")
print(f"  clustering espectral: {adjusted_rand_score(y, sc):.2f}")
