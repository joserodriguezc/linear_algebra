# reshape: misma cantidad de elementos, otra forma
from numpy import array

data = array([11, 22, 33, 44, 55])
print(data.shape)
data = data.reshape((data.shape[0], 1))     # 1D -> 2D (una columna)
print(data.shape)

data2 = array([[11, 22], [33, 44], [55, 66]])
data2 = data2.reshape((data2.shape[0], data2.shape[1], 1))   # 2D -> 3D (p. ej. para una LSTM)
print(data2.shape)

# -1 deja que NumPy calcule esa dimensión
print(array(range(12)).reshape(-1, 4))
