# Un dataset tabular es una matriz: filas = observaciones, columnas = características
from sklearn.datasets import load_iris

iris = load_iris()
X, y = iris.data, iris.target
print(iris.feature_names)
print(X[:5])
print("X:", X.shape, " y:", y.shape)
