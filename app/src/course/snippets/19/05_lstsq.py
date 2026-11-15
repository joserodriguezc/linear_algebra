# La función recomendada: lstsq
from numpy import array
from numpy.linalg import lstsq

data = array([[0.05, 0.12],
              [0.18, 0.22],
              [0.31, 0.35],
              [0.42, 0.38],
              [0.5, 0.49]])
X, y = data[:, 0], data[:, 1]
X = X.reshape((len(X), 1))
b, residuals, rank, s = lstsq(X, y, rcond=None)
print(b)
