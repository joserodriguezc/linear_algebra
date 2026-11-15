# Aritmética elemento a elemento entre vectores de igual longitud
from numpy import array

a = array([1, 2, 3])
b = array([0.5, 0.5, 0.5])

print("a + b =", a + b)
print("a - b =", a - b)
print("a * b =", a * b)   # producto elemento a elemento (Hadamard), NO es el producto punto
print("a / b =", a / b)
