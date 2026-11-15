# Distancia entre dos puntos = norma de su diferencia
import numpy as np

p = np.array([1.0, 1.0])
q = np.array([4.0, 5.0])
d = q - p
print("L1  :", np.linalg.norm(d, 1))       # 3 + 4 = 7 (caminando por calles)
print("L2  :", np.linalg.norm(d))          # 5 (en línea recta)
print("Linf:", np.linalg.norm(d, np.inf))  # 4 (el mayor desplazamiento)
