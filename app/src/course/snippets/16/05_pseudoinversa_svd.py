# La pseudoinversa calculada a mano con la SVD: A⁺ = V · D⁺ · Uᵀ
from numpy import array, diag, zeros
from scipy.linalg import svd

A = array([[0.1, 0.2],
           [0.3, 0.4],
           [0.5, 0.6],
           [0.7, 0.8]])
U, s, VT = svd(A)
d = 1.0 / s                     # invertir los valores singulares (no nulos)
D = zeros(A.shape)
D[:A.shape[1], :A.shape[1]] = diag(d)
B = VT.T.dot(D.T).dot(U.T)
print(B)
