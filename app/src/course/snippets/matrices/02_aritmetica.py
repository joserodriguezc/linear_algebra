# Suma, resta, Hadamard y división: elemento a elemento, misma forma
from numpy import array

A = array([[1, 2, 3], [4, 5, 6]])
B = array([[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]])
print(A + B)
print(A - B)
print(A * B)    # producto de Hadamard
print(A / B)
