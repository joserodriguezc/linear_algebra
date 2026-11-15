# Pensar en vectores no solo es más corto: es mucho más rápido
import time

import numpy as np

rng = np.random.default_rng(0)
a = rng.random(500_000)
b = rng.random(500_000)

t = time.perf_counter()
total = 0.0
for i in range(len(a)):
    total += a[i] * b[i]
t_bucle = time.perf_counter() - t

t = time.perf_counter()
total_np = a @ b
t_np = time.perf_counter() - t
print(f"bucle: {t_bucle * 1e3:.1f} ms   NumPy: {t_np * 1e3:.2f} ms   (mismo resultado: {np.isclose(total, total_np)})")
