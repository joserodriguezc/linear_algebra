# Un tensor de 3 dimensiones: 3 capas de matrices 3x3
from numpy import array

T = array([
    [[1, 2, 3],    [4, 5, 6],    [7, 8, 9]],
    [[11, 12, 13], [14, 15, 16], [17, 18, 19]],
    [[21, 22, 23], [24, 25, 26], [27, 28, 29]],
])
print(T.shape)
print(T)
print(T[0])         # primera capa
print(T[0, 1, 2])   # capa 0, fila 1, columna 2
