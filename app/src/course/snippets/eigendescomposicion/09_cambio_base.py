# Diagonalizar es cambiar de base: en la base de vectores propios, A solo escala cada eje
import numpy as np

A = np.array([[2.0, 1.0],
              [1.0, 2.0]])
valores, Q = np.linalg.eigh(A)
x = np.array([3.0, 1.0])

c = Q.T @ x                    # 1. coordenadas de x en la base de vectores propios (Q⁻¹ = Qᵀ)
c_escalado = valores * c       # 2. en esa base, A solo multiplica cada coordenada por su λ
Ax = Q @ c_escalado            # 3. de vuelta a la base estándar
print(Ax, "=", A @ x)
