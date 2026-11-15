# El patrón clásico: entradas X (todas menos la última columna) y salida y (la última)
from numpy import array

data = array([[11, 22, 33],
              [44, 55, 66],
              [77, 88, 99]])
X, y = data[:, :-1], data[:, -1]
print(X)
print(y)
print(X.shape, y.shape)
