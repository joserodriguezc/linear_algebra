# QR reducida (la habitual) y comprobación de que Q tiene columnas ortonormales
import numpy as np

A = np.array([[1.0, 2.0],
              [3.0, 4.0],
              [5.0, 6.0]])
Q, R = np.linalg.qr(A)          # modo "reduced": Q es 3x2, R es 2x2
print(Q.shape, R.shape)
print(np.round(Q.T @ Q, 10))    # identidad 2x2
print(np.allclose(Q @ R, A))
