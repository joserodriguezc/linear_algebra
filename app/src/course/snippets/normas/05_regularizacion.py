# En ML: Ridge (penaliza L2²) encoge los pesos; Lasso (penaliza L1) anula algunos
import numpy as np
from sklearn.linear_model import Lasso, Ridge

rng = np.random.default_rng(0)
X = rng.normal(size=(100, 6))
w_real = np.array([3.0, -2.0, 0.0, 0.0, 1.5, 0.0])   # solo 3 características importan
y = X @ w_real + rng.normal(scale=0.5, size=100)

for modelo in (Ridge(alpha=10), Lasso(alpha=0.3)):
    w = modelo.fit(X, y).coef_
    print(type(modelo).__name__.ljust(6), np.round(w, 2),
          f"‖w‖₁={np.linalg.norm(w, 1):.2f}  ‖w‖₂={np.linalg.norm(w):.2f}")
