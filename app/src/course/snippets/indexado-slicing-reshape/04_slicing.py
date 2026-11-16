# Slicing: data[desde:hasta] (hasta NO incluido)
from numpy import array

data = array([11, 22, 33, 44, 55])
print(data[:])      # todo
print(data[0:1])    # solo el primero, pero sigue siendo un array
print(data[-2:])    # los dos últimos
print(data[::2])    # uno de cada dos
