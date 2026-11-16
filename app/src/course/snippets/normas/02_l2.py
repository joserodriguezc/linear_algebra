# Norma L2: raíz de la suma de cuadrados (distancia euclídea). Es la norma por defecto
from numpy import array, sqrt
from numpy.linalg import norm

a = array([1, 2, 3])
print(norm(a))
print(sqrt(sum(a ** 2)))   # la definición
print(sqrt(a @ a))         # también: raíz del producto punto consigo mismo
