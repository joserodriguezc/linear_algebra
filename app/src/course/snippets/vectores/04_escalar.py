# Multiplicación vector-escalar: escala cada componente
from numpy import array

a = array([1, 2, 3])
s = 0.5
print(s * a)
# También funcionan +, - y / con un escalar
print(a + s, a - s, a / s)
