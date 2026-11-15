# Matriz por vector: cada fila hace un producto punto con el vector
from numpy import array

A = array([[1, 2], [3, 4], [5, 6]])
b = array([0.5, 0.5])
print(A @ b)
print(A.dot(b))
