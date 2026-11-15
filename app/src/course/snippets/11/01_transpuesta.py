# Transpuesta: las filas pasan a ser columnas
from numpy import array

A = array([[1, 2], [3, 4], [5, 6]])
print(A)
print(A.T)
print(A.shape, "->", A.T.shape)
