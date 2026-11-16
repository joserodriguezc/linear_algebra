# Reducción de dimensionalidad: quedarse con los k valores singulares mayores
from numpy import array, diag, zeros
from scipy.linalg import svd

A = array([
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]])
U, s, VT = svd(A)
Sigma = zeros((A.shape[0], A.shape[1]))
Sigma[:A.shape[0], :A.shape[0]] = diag(s)
k = 2
Sigma = Sigma[:, :k]
VT = VT[:k, :]
B = U.dot(Sigma.dot(VT))     # aproximación de A
print(B)
T = U.dot(Sigma)             # datos proyectados: 3 filas, ahora con 2 columnas
print(T)
T = A.dot(VT.T)              # forma equivalente
print(T)
