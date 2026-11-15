# Una matriz singular (det = 0) no tiene inversa
import numpy as np
from numpy.linalg import LinAlgError, det, inv, matrix_rank

A = np.array([[1.0, 2.0],
              [2.0, 4.0]])   # la 2.ª fila es el doble de la 1.ª
print("det :", det(A))
print("rank:", matrix_rank(A))

try:
    print(inv(A))
except LinAlgError as e:
    print("LinAlgError:", e)

# Ojo: según la librería LAPACK, inv() puede lanzar LinAlgError o devolver valores
# enormes/inf sin avisar. Por eso conviene comprobar el rango (o el determinante) antes.
