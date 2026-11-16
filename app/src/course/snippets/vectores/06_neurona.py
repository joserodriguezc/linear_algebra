# En ML: la predicción de un modelo lineal (o una neurona) es un producto punto
import numpy as np

x = np.array([120.0, 3.0, 1.0])     # características de una casa: m², habitaciones, garaje
w = np.array([1500.0, 8000.0, 5000.0])  # pesos aprendidos por el modelo
b = 20000.0                          # sesgo

precio = w @ x + b
print(f"Precio estimado: {precio:,.0f}")

# Con muchas casas a la vez: cada fila de X es un vector de características
X = np.array([[120, 3, 1], [80, 2, 0], [200, 5, 1]], dtype=float)
print(X @ w + b)
