# Lo mismo con scikit-learn: TruncatedSVD
from numpy import array
from sklearn.decomposition import TruncatedSVD

A = array([
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]])
svd = TruncatedSVD(n_components=2)
svd.fit(A)
result = svd.transform(A)
print(result)     # igual que antes salvo, quizás, el signo de alguna columna
