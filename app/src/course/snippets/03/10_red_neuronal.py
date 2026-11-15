# Deep learning: una capa densa es un producto matricial más un sesgo
import numpy as np

rng = np.random.default_rng(0)
X = rng.random((4, 3))          # lote de 4 ejemplos con 3 características
W = rng.normal(size=(3, 5))     # pesos: 3 entradas -> 5 neuronas
b = np.zeros(5)                 # sesgos
H = np.maximum(0, X @ W + b)    # capa densa con activación ReLU
print(H.shape)
print(H.round(3))
