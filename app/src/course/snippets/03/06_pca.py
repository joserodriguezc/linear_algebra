# PCA: de 64 dimensiones (píxeles) a 2
from sklearn.datasets import load_digits
from sklearn.decomposition import PCA

X = load_digits().data
Z = PCA(n_components=2).fit_transform(X)
print(X.shape, "->", Z.shape)
