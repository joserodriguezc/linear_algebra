# Un dataset tabular es un array 2D: filas = observaciones, columnas = características
import numpy as np

altura = np.array([1.62, 1.75, 1.80, 1.68])
peso = np.array([58.0, 72.5, 80.1, 65.3])
edad = np.array([25, 32, 41, 29])

X = np.vstack((altura, peso, edad)).T   # .T convierte filas en columnas (ver la etapa de operaciones matriciales)
print(X)
print("shape:", X.shape, "-> 4 personas, 3 características")
