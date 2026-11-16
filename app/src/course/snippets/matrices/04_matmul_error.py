# El orden importa: (2x2) · (3x2) no es válido (2 != 3)
# expect-error: ValueError
from numpy import array

A = array([[1, 2], [3, 4], [5, 6]])
B = array([[1, 2], [3, 4]])
print(B @ A)
