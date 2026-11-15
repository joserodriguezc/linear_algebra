# PCA paso a paso con NumPy
from numpy import array, cov, mean
from numpy.linalg import eigh

A = array([[1, 2],
           [3, 4],
           [5, 6]])
print(A)
M = mean(A.T, axis=1)        # 1. media de cada columna
C = A - M                    # 2. centrar
V = cov(C.T)                 # 3. matriz de covarianza (simétrica)
values, vectors = eigh(V)    # 4. eigendescomposición (eigh: para matrices simétricas)
orden = values.argsort()[::-1]            # de mayor a menor varianza
values, vectors = values[orden], vectors[:, orden]
print(vectors)               # cada COLUMNA es una componente principal
print(values)
P = vectors.T.dot(C.T)       # 5. proyectar los datos centrados
print(P.T)
