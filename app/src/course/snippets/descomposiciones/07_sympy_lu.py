# SymPy da la LU exacta (sin redondeos) para comprobar cálculos a mano
from sympy import Matrix

A = Matrix([[2, 1, 1],
            [4, -6, 0],
            [-2, 7, 2]])
L, U, _ = A.LUdecomposition()
print(L)
print(U)
print(L * U == A)
