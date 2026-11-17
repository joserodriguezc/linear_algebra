# Eckart–Young: el error de la mejor aproximación de rango k lo dan los valores singulares descartados
import numpy as np

rng = np.random.default_rng(1)
A = rng.normal(size=(6, 5))
U, s, VT = np.linalg.svd(A, full_matrices=False)
for k in (1, 2, 3):
    A_k = U[:, :k] @ np.diag(s[:k]) @ VT[:k]
    print(f"k = {k}: ‖A − A_k‖₂ = {np.linalg.norm(A - A_k, 2):.4f}  σ_(k+1) = {s[k]:.4f}   "
          f"‖A − A_k‖_F = {np.linalg.norm(A - A_k, 'fro'):.4f}  √Σσ² = {np.sqrt(np.sum(s[k:]**2)):.4f}")
