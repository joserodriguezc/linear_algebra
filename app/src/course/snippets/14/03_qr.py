# Descomposición QR: A = Q · R (Q con columnas ortonormales, R triangular superior)
from numpy import array
from numpy.linalg import qr

A = array([[1, 2],
           [3, 4],
           [5, 6]])
Q, R = qr(A, "complete")
print(Q)
print(R)
B = Q @ R
print(B)
