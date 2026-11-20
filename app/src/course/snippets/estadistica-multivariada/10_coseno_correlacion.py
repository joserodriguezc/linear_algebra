# La correlación de Pearson es el coseno del ángulo entre los vectores centrados
import numpy as np


def coseno(a, b):
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))


x = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
y = np.array([12.0, 11.0, 14.0, 13.0, 15.0])

print("coseno sin centrar      :", round(coseno(x, y), 4))  # alto solo porque todo es positivo
xc, yc = x - x.mean(), y - y.mean()
print("coseno de los centrados :", round(coseno(xc, yc), 4))
print("np.corrcoef             :", round(np.corrcoef(x, y)[0, 1], 4))

# Sumar una constante cambia el coseno, pero no la correlación
print("coseno(x, y + 100)      :", round(coseno(x, y + 100), 4))
print("corr(x, y + 100)        :", round(np.corrcoef(x, y + 100)[0, 1], 4))
