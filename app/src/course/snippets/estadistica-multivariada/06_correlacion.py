# Correlación de Pearson: covarianza normalizada entre -1 y 1
from numpy import array, corrcoef

x = array([1, 2, 3, 4, 5, 6, 7, 8, 9])
y = array([9, 8, 7, 6, 5, 4, 3, 2, 1])
corr = corrcoef(x, y)[0, 1]
print(corr)
