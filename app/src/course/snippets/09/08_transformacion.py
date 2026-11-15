# Una matriz transforma puntos: aplicamos una cizalla a un cuadrado
import matplotlib.pyplot as plt
import numpy as np

cuadrado = np.array([[0, 1, 1, 0, 0],
                     [0, 0, 1, 1, 0]])       # cada columna es un punto
A = np.array([[1, 1],
              [0, 1]])
nuevo = A @ cuadrado

plt.figure(figsize=(4, 4))
plt.plot(*cuadrado, "o-", label="original")
plt.plot(*nuevo, "s-", label="A @ puntos")
plt.axis("equal")
plt.grid(alpha=0.3)
plt.legend()
plt.title("Cizalla")
