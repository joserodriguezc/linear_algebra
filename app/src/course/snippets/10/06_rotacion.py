# Una rotación es ortogonal: conserva longitudes y ángulos
import numpy as np

theta = np.radians(30)
R = np.array([[np.cos(theta), -np.sin(theta)],
              [np.sin(theta),  np.cos(theta)]])
v = np.array([3.0, 4.0])
print("‖v‖  =", np.linalg.norm(v))
print("‖Rv‖ =", np.linalg.norm(R @ v))
print("RᵀR =")
print(np.round(R.T @ R, 10))
