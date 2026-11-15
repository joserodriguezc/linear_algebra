# Covarianza entre dos variables
from numpy import array, cov

x = array([1, 2, 3, 4, 5, 6, 7, 8, 9])
y = array([9, 8, 7, 6, 5, 4, 3, 2, 1])
Sigma = cov(x, y)        # devuelve la matriz de covarianza 2x2
print(Sigma)
print(Sigma[0, 1])       # la covarianza entre x e y
