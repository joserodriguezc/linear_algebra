# Un array tiene un único dtype: NumPy convierte los elementos para que todos coincidan
import numpy as np

print(np.array([1, 2, 3]).dtype)          # enteros
print(np.array([1, 2, 3.5]).dtype)        # basta un float para que todos sean float
print(np.array([1, 2, 3], dtype=np.float32).dtype)

# Memoria: cuántos bytes ocupa cada elemento y el total
x = np.zeros((1000, 100))
print(x.itemsize, "bytes por elemento,", x.nbytes / 1024, "KB en total")
