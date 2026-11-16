# SymPy resuelve sistemas de forma simbólica (exacta), como lo harías a mano
from sympy import Eq, solve, symbols

x, y = symbols("x y")
print(solve([Eq(x + y, 3), Eq(x - y, 1)], [x, y]))
print(solve([Eq(x + y, 3), Eq(2 * x + 2 * y, 6)], [x, y]))   # infinitas soluciones: x = 3 - y (cualquier y)
print(solve([Eq(x + y, 3), Eq(x + y, -1)], [x, y]))          # sin solución: []
