# Descomposición LU con pivoteo parcial: A = P · L · U
from numpy import array
from scipy.linalg import lu

A = array([[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]])
P, L, U = lu(A)
print(P)
print(L)
print(U)
B = P @ L @ U     # reconstrucción
print(B)
