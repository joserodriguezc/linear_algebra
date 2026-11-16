# Matriz definida positiva: xᵀAx > 0 para todo x ≠ 0  ⇔  todos sus valores propios son > 0
import numpy as np

rng = np.random.default_rng(0)
for nombre, A in [("[[2,1],[1,2]]", np.array([[2.0, 1.0], [1.0, 2.0]])),
                  ("[[1,2],[2,1]]", np.array([[1.0, 2.0], [2.0, 1.0]]))]:
    lam = np.linalg.eigvalsh(A)
    xs = rng.normal(size=(1000, 2))
    q = np.einsum("ij,jk,ik->i", xs, A, xs)    # xᵀAx para 1000 vectores aleatorios
    print(nombre, "λ =", lam.round(3), "  ¿xᵀAx > 0 siempre?", bool(np.all(q > 0)))

# Toda matriz de covarianza es semidefinida positiva: sus λ son ≥ 0
X = rng.normal(size=(100, 3))
print("λ de la covarianza:", np.linalg.eigvalsh(np.cov(X.T)).round(3))
