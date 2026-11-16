# En ML: estandarizar cada columna (media 0, desviación 1) en una sola línea
import numpy as np

X = np.array([[1.62, 58.0],
              [1.75, 72.5],
              [1.80, 80.1],
              [1.68, 65.3]])
mu = X.mean(axis=0)       # shape (2,)
sigma = X.std(axis=0)     # shape (2,)
Z = (X - mu) / sigma      # (4,2) - (2,) -> broadcasting por filas
print(np.round(Z, 3))
print("medias:", np.round(Z.mean(axis=0), 10), " desviaciones:", Z.std(axis=0))
