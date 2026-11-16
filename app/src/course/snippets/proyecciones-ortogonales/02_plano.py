# Proyección sobre un plano de R^3 generado por b1 y b2: P = B (BᵀB)⁻¹ Bᵀ
import numpy as np

B = np.column_stack([[1.0, 1.0, 0.0],
                     [0.0, 1.0, 1.0]])   # columnas b1, b2
x = np.array([6.0, 0.0, 0.0])

coef = np.linalg.solve(B.T @ B, B.T @ x)  # coordenadas de la proyección en la base {b1, b2}
P = B @ np.linalg.inv(B.T @ B) @ B.T
print("coeficientes:", coef)
print("3·P =")
print((3 * P).round(6))
print("Px =", P @ x, "  residuo =", x - P @ x)
print("Bᵀ(x - Px) =", B.T @ (x - P @ x))    # [0, 0]: el residuo es perpendicular al plano
print("P² = P:", np.allclose(P @ P, P))
