# Cholesky: A = L · Lᵀ para matrices simétricas definidas positivas
from numpy import array
from numpy.linalg import cholesky

A = array([[2, 1, 1],
           [1, 2, 1],
           [1, 1, 2]])
L = cholesky(A)
print(L)
B = L @ L.T
print(B)
