# Con SymPy: el polinomio característico det(A − λI) = 0 y sus raíces exactas
from sympy import Matrix, eye, factor, symbols

lam = symbols("lambda")
A = Matrix([[2, 1],
            [1, 2]])
p = (A - lam * eye(2)).det()
print("det(A - λI) =", factor(p))
print("valores propios:", A.eigenvals())     # {valor: multiplicidad}
print("vectores propios:", A.eigenvects())
