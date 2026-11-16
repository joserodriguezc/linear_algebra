# Un dataset pequeño: 5 puntos (x, y)
import matplotlib.pyplot as plt
from numpy import array

data = array([[0.05, 0.12],
              [0.18, 0.22],
              [0.31, 0.35],
              [0.42, 0.38],
              [0.5, 0.49]])
X, y = data[:, 0], data[:, 1]
X = X.reshape((len(X), 1))
plt.figure(figsize=(4, 3))
plt.scatter(X, y)
plt.title("Dataset de regresión")
