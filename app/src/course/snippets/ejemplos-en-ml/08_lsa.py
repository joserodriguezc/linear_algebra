# Análisis semántico latente (LSA): TF-IDF + SVD truncada para descubrir "temas"
from sklearn.decomposition import TruncatedSVD
from sklearn.feature_extraction.text import TfidfVectorizer

docs = [
    "el gato duerme en el sofá",
    "el perro y el gato juegan",
    "las matrices y los vectores",
    "álgebra lineal con vectores y matrices",
]
X = TfidfVectorizer().fit_transform(docs)        # matriz dispersa documentos x palabras
Z = TruncatedSVD(n_components=2, random_state=0).fit_transform(X)
for d, z in zip(docs, Z.round(2)):
    print(z, d)
