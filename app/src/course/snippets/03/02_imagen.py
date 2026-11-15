# Una imagen en escala de grises es una matriz de intensidades
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits

digits = load_digits()
img = digits.images[3]
print(img.astype(int))
print("forma:", img.shape, " aplanada:", img.reshape(-1).shape)
plt.figure(figsize=(2.5, 2.5))
plt.imshow(img, cmap="gray_r")
plt.title(f"etiqueta: {digits.target[3]}")
plt.axis("off")
