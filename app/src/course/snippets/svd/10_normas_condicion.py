# Normas de matrices y número de condición, todas a partir de los valores singulares
import numpy as np

A = np.array([[1.0, 2.0],
              [3.0, 4.0]])
s = np.linalg.svd(A, compute_uv=False)
print("valores singulares:", s.round(4))

print("Frobenius:", np.linalg.norm(A, "fro").round(4), "=", np.sqrt(np.sum(s**2)).round(4), "=", np.sqrt(np.sum(A**2)).round(4))
print("espectral:", np.linalg.norm(A, 2).round(4), "= σ1 =", s[0].round(4))
print("nuclear  :", np.linalg.norm(A, "nuc").round(4), "= σ1 + σ2 =", s.sum().round(4))
print("número de condición:", np.linalg.cond(A).round(4), "= σ1/σ2 =", (s[0] / s[-1]).round(4))

# La norma espectral es lo máximo que A puede estirar un vector unitario
rng = np.random.default_rng(0)
x = rng.normal(size=(2, 10000))
x /= np.linalg.norm(x, axis=0)
print("máx ‖Ax‖ con ‖x‖ = 1 (muestreo):", np.linalg.norm(A @ x, axis=0).max().round(4))
