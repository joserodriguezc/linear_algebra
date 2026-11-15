# Funciones para crear arrays de un tamaño dado
from numpy import empty, ones, zeros

print(empty([3, 3]))   # memoria sin inicializar: ¡valores basura impredecibles!
print(zeros([3, 5]))   # todo ceros: útil para acumular resultados
print(ones([5]))       # todo unos
