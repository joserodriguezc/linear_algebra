# Regresión múltiple: varias características a la vez, la misma fórmula matricial
import numpy as np
from sklearn.datasets import load_diabetes

X, y = load_diabetes(return_X_y=True)          # 442 pacientes, 10 características
Xb = np.column_stack([np.ones(len(X)), X])
b, *_ = np.linalg.lstsq(Xb, y, rcond=None)
yhat = Xb @ b
r2 = 1 - np.sum((y - yhat) ** 2) / np.sum((y - y.mean()) ** 2)
print("forma de X:", Xb.shape, " coeficientes:", b.shape)
print("R² =", round(r2, 3))
