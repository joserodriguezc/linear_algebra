# Inversa: A @ inv(A) = I
from numpy import array
from numpy.linalg import inv

A = array([[1.0, 2.0],
           [3.0, 4.0]])
B = inv(A)
print(B)
print(A @ B)    # identidad (salvo errores de redondeo)
