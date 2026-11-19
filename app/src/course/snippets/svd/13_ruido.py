# Eliminar ruido con la SVD truncada: la señal vive en pocos valores singulares grandes
import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(0)
m, n, r = 60, 40, 3
senal = rng.normal(size=(m, r)) @ rng.normal(size=(r, n))  # matriz de rango 3
ruidosa = senal + rng.normal(scale=0.5, size=(m, n))

U, s, VT = np.linalg.svd(ruidosa, full_matrices=False)
print("primeros valores singulares:", np.round(s[:6], 1))  # 3 grandes y luego el «suelo» del ruido

k = 3
limpia = U[:, :k] @ np.diag(s[:k]) @ VT[:k]
def error(B):
    return np.linalg.norm(B - senal) / np.linalg.norm(senal)
print(f"error relativo con ruido : {error(ruidosa):.3f}")
print(f"error tras truncar (k={k}): {error(limpia):.3f}")

plt.plot(np.arange(1, len(s) + 1), s, "o-", markersize=3)
plt.axvline(k + 0.5, color="red", linestyle="--")
plt.xlabel("índice")
plt.ylabel("valor singular")
plt.title("El «codo» separa la señal del ruido")
plt.show()
