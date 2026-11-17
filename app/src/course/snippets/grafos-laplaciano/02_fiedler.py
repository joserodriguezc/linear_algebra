# Valores propios del laplaciano y vector de Fiedler (el ejemplo resuelto)
import numpy as np

L = np.array([[1, -1, 0, 0],
              [-1, 2, -1, 0],
              [0, -1, 2, -1],
              [0, 0, -1, 1]], dtype=float)
valores, vectores = np.linalg.eigh(L)      # orden creciente
print("valores propios:", valores.round(4))
fiedler = vectores[:, 1]
print("vector de Fiedler:", (fiedler * np.sign(fiedler[0])).round(4))
print("grupo de cada nodo:", np.where(fiedler * np.sign(fiedler[0]) > 0, "A", "B"))
