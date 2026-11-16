# Media de una matriz por columnas (axis=0) y por filas (axis=1)
from numpy import array, mean

M = array([[1, 2, 3, 4, 5, 6],
           [1, 2, 3, 4, 5, 6]])
print(M)
col_mean = mean(M, axis=0)   # una media por columna (característica)
print(col_mean)
row_mean = mean(M, axis=1)   # una media por fila (observación)
print(row_mean)
