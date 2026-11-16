# Combinar arrays: vstack apila filas, hstack concatena
from numpy import array, hstack, vstack

a1 = array([1, 2, 3])
a2 = array([4, 5, 6])

v = vstack((a1, a2))
print(v)
print(v.shape)    # (2, 3)

h = hstack((a1, a2))
print(h)
print(h.shape)    # (6,)
