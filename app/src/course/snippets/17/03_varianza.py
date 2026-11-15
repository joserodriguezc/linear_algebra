# Varianza y desviación estándar muestrales (ddof=1 -> dividir por n - 1)
from numpy import array, std, var

v = array([1, 2, 3, 4, 5, 6])
print(var(v, ddof=1))
print(std(v, ddof=1))
