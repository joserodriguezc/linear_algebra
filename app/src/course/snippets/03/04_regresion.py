# Regresión lineal = resolver un sistema por mínimos cuadrados
import numpy as np
from sklearn.linear_model import LinearRegression

X = np.array([[1.0], [2.0], [3.0], [4.0]])
y = np.array([2.1, 3.9, 6.2, 7.8])
modelo = LinearRegression().fit(X, y)
print("pendiente:", modelo.coef_, " intercepto:", round(modelo.intercept_, 3))
