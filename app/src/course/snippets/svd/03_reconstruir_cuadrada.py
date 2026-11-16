# Con una matriz cuadrada, Σ = diag(s) directamente
from numpy import array, diag
from scipy.linalg import svd

A = array([[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]])
U, s, VT = svd(A)
Sigma = diag(s)
B = U.dot(Sigma.dot(VT))
print(B)
print("valores singulares:", s)   # el último ~0: la matriz tiene rango 2
