# Dispersión (sparsity) = proporción de ceros
from numpy import array, count_nonzero

A = array([[1, 0, 0, 1, 0, 0],
           [0, 0, 2, 0, 0, 1],
           [0, 0, 0, 2, 0, 0]])
sparsity = 1.0 - count_nonzero(A) / A.size
print(sparsity)
