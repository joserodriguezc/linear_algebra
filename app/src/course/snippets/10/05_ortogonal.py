# Matriz ortogonal: Q.T @ Q = I, por lo que inv(Q) = Q.T
from numpy import array
from numpy.linalg import inv

Q = array([[1, 0],
           [0, -1]])
print(Q)
print(inv(Q))
print(Q.T)
print(Q @ Q.T)
