# SVD: A = U · Σ · Vᵀ
from numpy import array
from scipy.linalg import svd

A = array([[1, 2],
           [3, 4],
           [5, 6]])
U, s, VT = svd(A)
print(U)
print(s)     # los valores singulares vienen como vector
print(VT)
