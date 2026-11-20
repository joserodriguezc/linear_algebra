# Cadena de Markov: x_{k+1} = P x_k. Las potencias de P se calculan con la eigendescomposición
import matplotlib.pyplot as plt
import numpy as np

estados = ["soleado", "nublado", "lluvia"]
# Columna j = probabilidades de pasar desde el estado j (cada columna suma 1)
P = np.array([[0.7, 0.3, 0.2],
              [0.2, 0.4, 0.4],
              [0.1, 0.3, 0.4]])
print("columnas suman 1:", P.sum(axis=0))

valores, Q = np.linalg.eig(P)
orden = np.argsort(-np.abs(valores))
valores, Q = valores[orden], Q[:, orden]
print("valores propios:", np.round(valores.real, 4))

# P^k = Q Λ^k Q⁻¹: elevar la matriz es elevar sus valores propios
k = 10
Pk = Q @ np.diag(valores**k) @ np.linalg.inv(Q)
print("P^10 con eig coincide con matrix_power:", np.allclose(Pk.real, np.linalg.matrix_power(P, k)))

# El estado estacionario es el vector propio de λ = 1, normalizado para sumar 1
pi = Q[:, 0].real / Q[:, 0].real.sum()
print("estacionario π:", {e: round(float(v), 4) for e, v in zip(estados, pi)})
print("P π = π:", np.allclose(P @ pi, pi))

# Partiendo de «lluvia seguro», la distancia a π se reduce como |λ₂|^k
x = np.array([0.0, 0.0, 1.0])
dist = []
for _ in range(15):
    dist.append(np.abs(x - pi).sum())
    x = P @ x
print("|λ₂| =", round(abs(valores[1]), 4), "  cociente entre distancias sucesivas:", round(dist[10] / dist[9], 4))

plt.semilogy(dist, "o-", label="‖x_k − π‖₁")
plt.semilogy(dist[0] * abs(valores[1]) ** np.arange(15), "--", label="|λ₂|^k")
plt.xlabel("paso k")
plt.legend()
plt.show()
