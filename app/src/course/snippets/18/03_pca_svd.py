# PCA mediante SVD de los datos centrados (lo que hace scikit-learn por dentro)
import numpy as np

rng = np.random.default_rng(0)
X = rng.multivariate_normal([0, 0], [[3.0, 1.8], [1.8, 1.6]], size=200)
Xc = X - X.mean(axis=0)
U, s, VT = np.linalg.svd(Xc, full_matrices=False)
var_svd = s**2 / (len(X) - 1)                       # varianzas = σ² / (n - 1)
values, vectors = np.linalg.eigh(np.cov(Xc.T))
print("SVD :", np.round(var_svd, 4), np.round(VT[0], 4))
print("eigh:", np.round(values[::-1], 4), np.round(vectors[:, -1], 4))
