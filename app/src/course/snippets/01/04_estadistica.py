# Estadística con álgebra lineal: la media es un producto punto
import numpy as np

x = np.array([2.0, 4.0, 6.0, 8.0])
n = len(x)
unos = np.ones(n)
print("media con np.mean :", np.mean(x))
print("media como x·1 / n:", x @ unos / n)
# La varianza también: (x - media)·(x - media) / (n - 1)
d = x - x.mean()
print("varianza:", d @ d / (n - 1), "=", np.var(x, ddof=1))
