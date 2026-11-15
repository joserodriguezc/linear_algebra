# Para sumar por filas hay que convertir el vector en columna (n, 1)
import numpy as np

A = np.array([[1, 2, 3],
              [4, 5, 6]])
c = np.array([10, 20])             # shape (2,): no casa con (2, 3)
print(A + c.reshape(2, 1))         # shape (2, 1): se estira por columnas
print(A + c[:, np.newaxis])        # forma equivalente

# Producto "exterior" con broadcasting: (3,1) * (1,4) -> (3,4)
print(np.arange(1, 4)[:, None] * np.arange(1, 5)[None, :])
