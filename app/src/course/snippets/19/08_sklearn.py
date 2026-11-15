# En ML: LinearRegression de scikit-learn resuelve exactamente este problema
import numpy as np
from sklearn.linear_model import LinearRegression

data = np.array([[0.05, 0.12],
                 [0.18, 0.22],
                 [0.31, 0.35],
                 [0.42, 0.38],
                 [0.5, 0.49]])
x, y = data[:, :1], data[:, 1]        # X debe ser 2D: (n_muestras, n_características)
modelo = LinearRegression().fit(x, y)
print("intercepto:", round(modelo.intercept_, 4), " pendiente:", np.round(modelo.coef_, 4))
print("predicción para x = 0.6:", modelo.predict([[0.6]]))
