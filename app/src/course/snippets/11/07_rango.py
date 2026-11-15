# Rango: número de filas/columnas linealmente independientes
from numpy import array
from numpy.linalg import matrix_rank

print(matrix_rank(array([[0, 0], [0, 0]])))   # 0
print(matrix_rank(array([[1, 2], [1, 2]])))   # 1
print(matrix_rank(array([[1, 2], [3, 4]])))   # 2
print(matrix_rank(array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])))   # 2: por eso su det es 0
