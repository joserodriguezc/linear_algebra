# Con una base ortonormal Q del subespacio, la proyección se simplifica: P = Q Qᵀ
import numpy as np

B = np.column_stack([[1.0, 1.0, 0.0],
                     [0.0, 1.0, 1.0]])
Q, _ = np.linalg.qr(B)                      # base ortonormal del mismo plano (etapa de descomposiciones)
P1 = B @ np.linalg.inv(B.T @ B) @ B.T
P2 = Q @ Q.T
print("QᵀQ = I:", np.allclose(Q.T @ Q, np.eye(2)))
print("misma proyección:", np.allclose(P1, P2))
