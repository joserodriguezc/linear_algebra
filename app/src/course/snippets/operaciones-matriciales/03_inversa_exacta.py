# Con SymPy obtenemos resultados exactos (fracciones), ideales para comprobar cálculos a mano
from sympy import Matrix

A = Matrix([[1, 2],
            [3, 4]])
print(A.det())
print(A.inv())
print(A.adjugate() / A.det())   # fórmula: inversa = adjunta / determinante
