# Crear un array a partir de una lista y leer sus atributos
from numpy import array

lista = [1.0, 2.0, 3.0]
a = array(lista)
print(a)
print("shape:", a.shape)   # (3,) -> 1 dimensión con 3 elementos
print("dtype:", a.dtype)   # tipo de dato de TODOS los elementos
print("ndim :", a.ndim)
