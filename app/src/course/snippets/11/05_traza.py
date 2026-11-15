# Traza: suma de la diagonal
from numpy import array, trace

A = array([[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]])
print(trace(A))   # 1 + 5 + 9
