# El producto punto mide alineación: a·b = ‖a‖‖b‖cos(θ)
import numpy as np

a = np.array([2.0, 3.0])
b = np.array([4.0, 1.0])

cos_theta = a @ b / (np.linalg.norm(a) * np.linalg.norm(b))
theta = np.degrees(np.arccos(cos_theta))
print(f"a·b = {a @ b}")
print(f"cos(θ) = {cos_theta:.4f}  ->  θ = {theta:.1f}°")

# Vectores perpendiculares: producto punto = 0
print(np.array([1, 2]) @ np.array([-2, 1]))
