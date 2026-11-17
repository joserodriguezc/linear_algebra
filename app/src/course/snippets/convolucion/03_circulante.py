# Convolución circular = matriz circulante; conmuta con el desplazamiento (equivariancia)
import numpy as np
from scipy.linalg import circulant

n = 6
c = np.zeros(n)
c[[0, 1, -1]] = [0.5, 0.25, 0.25]       # filtro (¼, ½, ¼) con vuelta por los bordes
C = circulant(c)
S = circulant(np.r_[0, 1, np.zeros(n - 2)])   # desplazamiento circular: (Sx)_i = x_(i−1)
print(C)
print("CS = SC:", np.allclose(C @ S, S @ C))

x = np.array([0, 0, 1, 3, 1, 0], dtype=float)
print("convolucionar y luego desplazar:", S @ (C @ x))
print("desplazar y luego convolucionar:", C @ (S @ x))
