# En ML: una bolsa de palabras es una matriz dispersa (documentos x vocabulario)
from sklearn.feature_extraction.text import CountVectorizer

docs = [
    "el álgebra lineal es el lenguaje de los datos",
    "los datos se guardan en matrices",
    "las matrices dispersas ahorran memoria",
]
vec = CountVectorizer()
X = vec.fit_transform(docs)
print(type(X).__name__, X.shape)
print(vec.get_feature_names_out())
print(X.toarray())
print(f"dispersión: {1 - X.nnz / (X.shape[0] * X.shape[1]):.2f}")
