# Visualizar un dataset de 4 dimensiones en 2D con PCA
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

iris = load_iris()
X = StandardScaler().fit_transform(iris.data)    # estandarizar antes de PCA
Z = PCA(n_components=2).fit_transform(X)

plt.figure(figsize=(5, 4))
for k, nombre in enumerate(iris.target_names):
    plt.scatter(*Z[iris.target == k].T, s=15, label=nombre)
plt.xlabel("PC1"); plt.ylabel("PC2"); plt.legend(); plt.title("Iris proyectado con PCA")
