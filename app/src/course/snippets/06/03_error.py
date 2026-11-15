# Las dimensiones finales (3 y 4) no coinciden y ninguna es 1 -> error
# expect-error: ValueError
from numpy import array

A = array([[1, 2, 3],
           [1, 2, 3]])
b = array([1, 2, 3, 4])
print(A.shape, b.shape)
print(A + b)
