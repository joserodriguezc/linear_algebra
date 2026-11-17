# El número de condición mide cuánto se amplifica un error relativo al resolver Ax = b
import numpy as np
from scipy.linalg import hilbert

for n in (3, 6, 10):
    A = hilbert(n)                         # matrices de Hilbert: famosas por su mal condicionamiento
    x = np.ones(n)
    b = A @ x
    b_perturbado = b + 1e-10 * np.random.default_rng(0).normal(size=n)
    x_calc = np.linalg.solve(A, b_perturbado)
    err_b = np.linalg.norm(b_perturbado - b) / np.linalg.norm(b)
    err_x = np.linalg.norm(x_calc - x) / np.linalg.norm(x)
    print(f"n = {n:2d}  κ = {np.linalg.cond(A):.1e}  error relativo en b = {err_b:.1e}  en x = {err_x:.1e}")
