# Una matriz grande y muy dispersa: memoria y velocidad
import time

import numpy as np
from scipy.sparse import random as sparse_random

S = sparse_random(2000, 2000, density=0.001, format="csr", random_state=0)
D = S.toarray()
mem_csr = S.data.nbytes + S.indices.nbytes + S.indptr.nbytes
print(f"densa: {D.nbytes / 1e6:.1f} MB   CSR: {mem_csr / 1e3:.1f} KB")

v = np.ones(2000)
t = time.perf_counter()
D @ v
t_d = time.perf_counter() - t
t = time.perf_counter()
S @ v
t_s = time.perf_counter() - t
print(f"producto matriz-vector  densa: {t_d * 1e3:.2f} ms   CSR: {t_s * 1e3:.3f} ms")
