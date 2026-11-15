# One-hot encoding: cada fila tiene un único 1 -> muy dispersa
import numpy as np
from sklearn.preprocessing import OneHotEncoder

colores = np.array([["rojo"], ["verde"], ["azul"], ["verde"], ["rojo"]])
enc = OneHotEncoder()          # devuelve una matriz dispersa por defecto
X = enc.fit_transform(colores)
print(enc.categories_)
print(X.toarray())
print(type(X).__name__)
