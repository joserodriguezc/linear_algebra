# Triangular inferior y superior
from numpy import array, tril, triu

M = array([[1, 2, 3],
           [1, 2, 3],
           [1, 2, 3]])
print(tril(M))
print(triu(M))
