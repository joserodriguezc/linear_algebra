# tensordot con axes=1 (o einsum) generaliza el producto matricial
import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print(np.tensordot(A, B, axes=1))      # = A @ B
print(np.einsum("ik,kj->ij", A, B))    # misma operación, indicando los índices
print(A @ B)
