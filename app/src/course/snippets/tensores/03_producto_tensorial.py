# Producto tensorial (exterior): cada elemento de A multiplica a todo B
from numpy import array, tensordot

A = array([1, 2])
B = array([3, 4])
C = tensordot(A, B, axes=0)
print(C)
print(C.shape)     # (2,) ⊗ (2,) -> (2, 2)

# Con matrices: (2,2) ⊗ (2,2) -> (2,2,2,2)
M = array([[1, 2], [3, 4]])
print(tensordot(M, M, axes=0).shape)
