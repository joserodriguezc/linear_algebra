# Comprobar que A·v = λ·v para el primer par propio
from numpy import array
from numpy.linalg import eig

A = array([[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]])
values, vectors = eig(A)
B = A.dot(vectors[:, 0])
print(B)
C = vectors[:, 0] * values[0]
print(C)
