# El número total de elementos debe conservarse
# expect-error: ValueError
import numpy as np

a = np.arange(12)
print(a.reshape(5, 3))
