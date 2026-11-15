# Mínimos cuadrados con QR: b = R⁻¹ Qᵀ y
from numpy import array
from numpy.linalg import inv, qr

data = array([[0.05, 0.12],
              [0.18, 0.22],
              [0.31, 0.35],
              [0.42, 0.38],
              [0.5, 0.49]])
X, y = data[:, 0], data[:, 1]
X = X.reshape((len(X), 1))
Q, R = qr(X)
b = inv(R).dot(Q.T).dot(y)
print(b)
