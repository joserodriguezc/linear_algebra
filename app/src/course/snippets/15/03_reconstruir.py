# Reconstruir A = Q · Λ · Q⁻¹
from numpy import array, diag
from numpy.linalg import eig, inv

A = array([[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]])
values, vectors = eig(A)
Q = vectors
R = inv(Q)
L = diag(values)
B = Q.dot(L).dot(R)
print(B)
