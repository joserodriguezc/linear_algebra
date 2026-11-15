# Matriz identidad: I @ v = v
from numpy import array, identity

I = identity(3)
print(I)
v = array([7, 8, 9])
print(I @ v)
