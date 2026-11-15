# Reconstruir una matriz rectangular: Σ debe tener la forma de A (3x2)
from numpy import array, diag, zeros
from scipy.linalg import svd

A = array([[1, 2],
           [3, 4],
           [5, 6]])
U, s, VT = svd(A)
Sigma = zeros((A.shape[0], A.shape[1]))
Sigma[:A.shape[1], :A.shape[1]] = diag(s)
B = U.dot(Sigma.dot(VT))
print(B)
