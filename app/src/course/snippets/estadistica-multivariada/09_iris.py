# En ML: matriz de correlación de un dataset real (Iris) con pandas
import pandas as pd
from sklearn.datasets import load_iris

iris = load_iris(as_frame=True)
df = iris.frame.drop(columns="target")
pd.set_option("display.width", 120)
print(df.describe().round(2))
print(df.corr().round(2))
