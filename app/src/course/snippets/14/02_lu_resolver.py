# LU sirve para resolver muchos sistemas Ax = b con la misma A: se factoriza una vez
import numpy as np
from scipy.linalg import lu_factor, lu_solve

A = np.array([[2.0, 1.0, 1.0],
              [4.0, -6.0, 0.0],
              [-2.0, 7.0, 2.0]])
fact = lu_factor(A)                 # el trabajo caro, una sola vez
for b in ([5.0, -2.0, 9.0], [1.0, 0.0, 0.0]):
    x = lu_solve(fact, b)            # cada resolución es muy barata
    print(x, "comprobación:", np.allclose(A @ x, b))
