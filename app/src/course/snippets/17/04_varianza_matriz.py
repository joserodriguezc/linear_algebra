# Varianza y desviación estándar por columnas y por filas
from numpy import array, std, var

M = array([[1, 2, 3, 4, 5, 6],
           [1, 2, 3, 4, 5, 6]])
print(var(M, ddof=1, axis=0))
print(var(M, ddof=1, axis=1))
print(std(M, ddof=1, axis=1))
