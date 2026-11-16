# Forma escalonada reducida (rref) con SymPy: muestra qué columnas son pivote (independientes)
from sympy import Matrix

A = Matrix([[1, 2, 1],
            [2, 1, -1],
            [3, 0, -3]])
R, pivotes = A.rref()
print(R)
print("columnas pivote:", pivotes)   # (0, 1): x1 y x2 son una base del espacio columna
print("rango:", A.rank())
