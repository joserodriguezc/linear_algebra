# One-hot encoding con NumPy puro y con scikit-learn
import numpy as np
from sklearn.preprocessing import OneHotEncoder

colores = np.array(["rojo", "verde", "azul", "verde", "rojo"])
categorias = np.unique(colores)
manual = (colores[:, None] == categorias[None, :]).astype(int)   # broadcasting (etapa 6)
print(categorias)
print(manual)

enc = OneHotEncoder(sparse_output=False)
print(enc.fit_transform(colores.reshape(-1, 1)))
