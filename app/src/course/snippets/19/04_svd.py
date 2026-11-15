# Mínimos cuadrados con la pseudoinversa (SVD): b = X⁺ y
from numpy import array
from numpy.linalg import pinv

data = array([[0.05, 0.12],
              [0.18, 0.22],
              [0.31, 0.35],
              [0.42, 0.38],
              [0.5, 0.49]])
X, y = data[:, 0], data[:, 1]
X = X.reshape((len(X), 1))
b = pinv(X).dot(y)
print(b)
