# LDA: dirección que separa las clases, como problema de valores propios generalizado S_B w = λ S_W w
import matplotlib.pyplot as plt
import numpy as np
from scipy.linalg import eigh
from sklearn.datasets import load_iris
from sklearn.decomposition import PCA
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis

X, y = load_iris(return_X_y=True)
mu = X.mean(axis=0)
Sw = np.zeros((4, 4))  # dispersión dentro de cada clase
Sb = np.zeros((4, 4))  # dispersión entre las medias de las clases
for c in np.unique(y):
    Xc = X[y == c]
    mc = Xc.mean(axis=0)
    Sw += (Xc - mc).T @ (Xc - mc)
    Sb += len(Xc) * np.outer(mc - mu, mc - mu)

valores, W = eigh(Sb, Sw)  # valores ascendentes
W = W[:, ::-1][:, :2]  # las 2 direcciones con mayor λ (con 3 clases, como mucho 2 son útiles)
print("λ (separación entre / dentro):", np.round(valores[::-1][:3], 3))

Z_lda = X @ W
Z_sk = LinearDiscriminantAnalysis(n_components=2).fit_transform(X, y)
corr = [abs(np.corrcoef(Z_lda[:, i], Z_sk[:, i])[0, 1]) for i in range(2)]
print("coincide con sklearn (|correlación| por eje):", np.round(corr, 4))

Z_pca = PCA(2).fit_transform(X)
fig, ax = plt.subplots(1, 2, figsize=(9, 4))
ax[0].scatter(Z_pca[:, 0], Z_pca[:, 1], c=y, s=12)
ax[0].set_title("PCA (no mira las etiquetas)")
ax[1].scatter(Z_lda[:, 0], Z_lda[:, 1], c=y, s=12)
ax[1].set_title("LDA (separa las clases)")
plt.show()
