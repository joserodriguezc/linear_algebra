# Norma máxima (L-infinito): el mayor valor absoluto
from numpy import array, inf
from numpy.linalg import norm

a = array([1, 2, 3])
print(norm(a, inf))
print(max(abs(a)))
