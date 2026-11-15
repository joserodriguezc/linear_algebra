# En ML: PageRank es el vector propio dominante (λ = 1) de una matriz de transición
import numpy as np

# Enlaces entre 4 páginas: columna j = a dónde enlaza la página j (probabilidades)
M = np.array([[0.0, 0.5, 0.0, 0.0],
              [0.5, 0.0, 0.0, 1.0],
              [0.5, 0.0, 0.0, 0.0],
              [0.0, 0.5, 1.0, 0.0]])
d = 0.85
G = d * M + (1 - d) / 4          # matriz de Google (con "teletransporte")
values, vectors = np.linalg.eig(G)
i = np.argmax(values.real)
rank = np.abs(vectors[:, i].real)
rank = rank / rank.sum()
print("λ dominante:", round(values[i].real, 4))
print("PageRank:", np.round(rank, 3))
