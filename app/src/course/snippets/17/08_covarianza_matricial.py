# La matriz de covarianza con álgebra lineal: Σ = Xcᵀ Xc / (n - 1)
import numpy as np

X = np.array([[1, 5, 8],
              [3, 5, 11],
              [2, 4, 9],
              [3, 6, 10],
              [1, 5, 10]], dtype=float)
Xc = X - X.mean(axis=0)              # centrar cada columna (broadcasting)
Sigma = Xc.T @ Xc / (X.shape[0] - 1)
print(Sigma)
print(np.allclose(Sigma, np.cov(X.T)))
