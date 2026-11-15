# Un vector 1D se "estira" sobre cada fila de la matriz
from numpy import array

A = array([[1, 2, 3],
           [1, 2, 3]])
b = array([1, 2, 3])
print(A.shape, b.shape)
print(A + b)
