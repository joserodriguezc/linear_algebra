# Cuánta varianza explica cada componente en un dataset real (dígitos 8x8 = 64 dimensiones)
import numpy as np
from sklearn.datasets import load_digits
from sklearn.decomposition import PCA

X = load_digits().data
pca = PCA().fit(X)
acum = np.cumsum(pca.explained_variance_ratio_)
for k in (2, 10, 20, 30):
    print(f"{k:>2} componentes -> {acum[k - 1]:.1%} de la varianza")
print("componentes para el 95 %:", np.searchsorted(acum, 0.95) + 1, "de", X.shape[1])
