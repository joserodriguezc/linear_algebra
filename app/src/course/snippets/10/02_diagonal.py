# Extraer la diagonal y construir una matriz diagonal
from numpy import array, diag

M = array([[1, 2, 3], [1, 2, 3], [1, 2, 3]])
d = diag(M)
print(d)
D = diag(d)
print(D)
