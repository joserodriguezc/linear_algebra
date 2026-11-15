# Pseudoinversa: generaliza la inversa a matrices no cuadradas
from numpy import array
from numpy.linalg import pinv

A = array([[0.1, 0.2],
           [0.3, 0.4],
           [0.5, 0.6],
           [0.7, 0.8]])
print(A)
B = pinv(A)
print(B)
