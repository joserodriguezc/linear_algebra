# De listas de Python a arrays 1D y 2D
from numpy import array

data = array([11, 22, 33, 44, 55])
print(data, type(data))

data2 = array([[11, 22],
               [33, 44],
               [55, 66]])
print(data2)
print(data2.shape)
