# Indexado: posiciones desde 0; los índices negativos cuentan desde el final
from numpy import array

data = array([11, 22, 33, 44, 55])
print(data[0], data[4])
print(data[-1], data[-5])

M = array([[11, 22], [33, 44], [55, 66]])
print(M[0, 0])   # fila 0, columna 0
print(M[0])      # toda la fila 0 (un índice -> se pierde una dimensión)
