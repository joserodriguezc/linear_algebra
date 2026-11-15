# Norma L1: suma de valores absolutos (distancia "Manhattan")
from numpy import array
from numpy.linalg import norm

a = array([1, 2, 3])
print(norm(a, 1))
print(sum(abs(a)))   # la definición
