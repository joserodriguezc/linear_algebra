# Acceder fuera de los límites lanza IndexError
# expect-error: IndexError
from numpy import array

data = array([11, 22, 33, 44, 55])
print(data[5])
