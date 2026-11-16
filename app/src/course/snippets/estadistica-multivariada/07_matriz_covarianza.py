# Matriz de covarianza de un dataset (filas = observaciones, columnas = variables)
from numpy import array, cov

X = array([[1, 5, 8],
           [3, 5, 11],
           [2, 4, 9],
           [3, 6, 10],
           [1, 5, 10]])
Sigma = cov(X.T)     # np.cov espera las variables en filas: por eso X.T
print(Sigma)
