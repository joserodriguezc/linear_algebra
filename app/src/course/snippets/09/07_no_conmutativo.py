# AB != BA en general (aunque ambas existan)
import numpy as np

A = np.array([[1, 1], [0, 1]])   # cizalla
B = np.array([[0, -1], [1, 0]])  # rotación 90°
print(A @ B)
print(B @ A)
print("¿iguales?", np.array_equal(A @ B, B @ A))
