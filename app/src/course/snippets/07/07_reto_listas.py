# Reto: implementa las operaciones a mano con listas de Python y compara con NumPy
import numpy as np


def suma(a, b):
    return [x + y for x, y in zip(a, b)]

def producto_punto(a, b):
    # TODO: escribe tu versión (pista: sum + zip)
    return sum(x * y for x, y in zip(a, b))

a, b = [1, 2, 3], [4, 5, 6]
print(suma(a, b), np.add(a, b))
print(producto_punto(a, b), np.dot(a, b))
