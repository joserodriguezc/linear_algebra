# Inversa por Gauss-Jordan: [A | I] → [I | A⁻¹]
import numpy as np
import sympy as sp


def inversa_gauss_jordan(A):
    n = len(A)
    M = np.hstack([A.astype(float), np.eye(n)])  # matriz aumentada [A | I]
    for j in range(n):
        p = j + np.argmax(np.abs(M[j:, j]))  # pivoteo: la fila con el mayor pivote
        M[[j, p]] = M[[p, j]]
        M[j] /= M[j, j]  # pivote = 1
        for i in range(n):
            if i != j:
                M[i] -= M[i, j] * M[j]  # ceros en el resto de la columna
    return M[:, n:]


A = np.array([[2.0, 1.0], [5.0, 3.0]])
print("Gauss-Jordan:\n", inversa_gauss_jordan(A))
print("np.linalg.inv:\n", np.linalg.inv(A))

B = np.array([[1.0, 2.0, 0.0], [0.0, 1.0, 1.0], [2.0, 0.0, 3.0]])
print("¿B · B⁻¹ = I?", np.allclose(B @ inversa_gauss_jordan(B), np.eye(3)))

# Con SymPy, exacto: la forma escalonada reducida de [A | I]
As = sp.Matrix([[2, 1], [5, 3]])
R, _ = sp.Matrix.hstack(As, sp.eye(2)).rref()
print(R)
