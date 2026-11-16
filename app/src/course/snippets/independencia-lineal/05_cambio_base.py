# Cambio de base: las coordenadas de x en la base {b1, b2} se obtienen resolviendo B c = x
import numpy as np

b1 = np.array([2.0, 1.0])
b2 = np.array([-1.0, 1.0])
B = np.column_stack([b1, b2])
x = np.array([1.0, 3.0])

c = np.linalg.solve(B, x)                # coordenadas de x en la nueva base
print("coordenadas en la base B:", c)
print("reconstrucción c1·b1 + c2·b2:", c[0] * b1 + c[1] * b2)
print("y de vuelta: B @ c =", B @ c)
