# Cholesky exige una matriz definida positiva (todos sus valores propios > 0)
import numpy as np

A = np.array([[1.0, 2.0],
              [2.0, 1.0]])   # simétrica, pero NO definida positiva
print("valores propios:", np.linalg.eigvalsh(A))   # uno es negativo (-1)

try:
    L = np.linalg.cholesky(A)
    print("L =", L)
    print("¡Cuidado! Esta versión de LAPACK no avisó; L @ L.T =", L @ L.T)
except np.linalg.LinAlgError as e:
    print("LinAlgError:", e)

# Comprobación segura antes de usar Cholesky:
print("¿definida positiva?", bool(np.all(np.linalg.eigvalsh(A) > 0)))
