# Producto matricial: (3x2) · (2x2) -> (3x2)
from numpy import array

A = array([[1, 2], [3, 4], [5, 6]])
B = array([[1, 2], [3, 4]])
print(A.dot(B))
print(A @ B)       # operador recomendado
