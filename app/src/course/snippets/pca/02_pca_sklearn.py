# PCA con scikit-learn (mismo resultado, salvo el signo de las componentes)
from numpy import array
from sklearn.decomposition import PCA

A = array([[1, 2],
           [3, 4],
           [5, 6]])
pca = PCA(2)
pca.fit(A)
print(pca.components_)           # direcciones (vectores propios), una por fila
print(pca.explained_variance_)   # varianzas (valores propios)
B = pca.transform(A)
print(B)
