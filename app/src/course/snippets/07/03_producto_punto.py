# Producto punto: suma de los productos elemento a elemento -> un escalar
from numpy import array

a = array([1, 2, 3])
b = array([1, 2, 3])

print(a.dot(b))         # método del array
print(a @ b)            # operador @ (recomendado en código moderno)
print(sum(a * b))       # la definición: multiplicar y sumar
