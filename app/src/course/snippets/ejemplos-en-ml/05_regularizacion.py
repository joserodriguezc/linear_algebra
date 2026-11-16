# Regularización: penalizar la norma de los coeficientes
import numpy as np
from sklearn.linear_model import Lasso, LinearRegression, Ridge

rng = np.random.default_rng(1)
X = rng.normal(size=(30, 5))
y = X[:, 0] * 3 + rng.normal(scale=0.5, size=30)     # solo la primera columna importa
for m in (LinearRegression(), Ridge(alpha=5), Lasso(alpha=0.2)):
    print(type(m).__name__.ljust(16), np.round(m.fit(X, y).coef_, 2))
