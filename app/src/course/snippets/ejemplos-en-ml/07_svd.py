# SVD: toda matriz es U·Σ·Vᵀ
import numpy as np

A = np.array([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])
U, s, VT = np.linalg.svd(A, full_matrices=False)
print("valores singulares:", s.round(4))
print(np.allclose(U @ np.diag(s) @ VT, A))
