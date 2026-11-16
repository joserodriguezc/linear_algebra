# Determinante: factor de escala del área (o del volumen)
from numpy import array
from numpy.linalg import det

A = array([[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]])
print(det(A))     # 0 en teoría (filas dependientes); según la plataforma puede salir 0.0 o algo como 6.7e-16 por redondeo

B = array([[2, 0], [0, 3]])
print(det(B))     # el cuadrado unidad pasa a tener área 6
