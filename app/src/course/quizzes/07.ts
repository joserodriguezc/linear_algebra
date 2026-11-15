import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'numeric',
    prompt: 'Calcula el producto punto $a \\cdot b$ con $a = (2, -1, 3)$ y $b = (4, 0, -2)$.',
    answer: 2,
    explanation: '$2\\cdot4 + (-1)\\cdot0 + 3\\cdot(-2) = 8 + 0 - 6 = 2$.',
  },
  {
    type: 'choice',
    prompt: 'En NumPy, con `a = array([1, 2, 3])` y `b = array([1, 2, 3])`, ¿qué devuelve `a * b`?',
    options: ['`14`', '`[1 4 9]`', '`[2 4 6]`', 'Un error: hay que usar `dot`'],
    answer: 1,
    explanation: '`*` multiplica elemento a elemento (producto de Hadamard). El producto punto (14) se obtiene con `a.dot(b)` o `a @ b`.',
  },
  {
    type: 'choice',
    prompt: 'Si el producto punto de dos vectores no nulos es $0$, entonces los vectores…',
    options: ['son iguales', 'apuntan en direcciones opuestas', 'son perpendiculares (ortogonales)', 'tienen la misma longitud'],
    answer: 2,
    explanation: 'Como $a\\cdot b = \\|a\\|\\|b\\|\\cos\\theta$, el producto es cero cuando $\\cos\\theta = 0$, es decir $\\theta = 90^\\circ$.',
  },
  {
    type: 'matrix',
    prompt: 'Calcula $3a - b$ con $a = (1, 2)$ y $b = (4, -1)$. Escribe el resultado como columna.',
    answer: [[-1], [7]],
    explanation: '$3a = (3, 6)$; $3a - b = (3-4,\\ 6-(-1)) = (-1, 7)$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué ocurre con el vector $v$ al multiplicarlo por $s = -0.5$?',
    options: [
      'Se alarga y conserva el sentido',
      'Se acorta a la mitad e invierte su sentido',
      'Gira 90°',
      'No cambia, porque el escalar es negativo',
    ],
    answer: 1,
    explanation: '$|s| = 0.5 < 1$ lo acorta a la mitad y el signo negativo invierte el sentido: queda sobre la misma recta.',
  },
  {
    type: 'numeric',
    prompt:
      'Un modelo lineal tiene pesos $w = (0.5, -2, 1)$ y sesgo $b = 3$. ¿Qué predice para $x = (4, 1, 2)$? (es decir, $w\\cdot x + b$)',
    answer: 5,
    explanation: '$w\\cdot x = 0.5\\cdot4 - 2\\cdot1 + 1\\cdot2 = 2 - 2 + 2 = 2$; sumando el sesgo: $2 + 3 = 5$.',
  },
  {
    type: 'choice',
    prompt: '¿Se pueden sumar los vectores $(1, 2, 3)$ y $(1, 2)$?',
    options: [
      'Sí, el resultado es $(2, 4, 3)$',
      'Sí, el resultado es $(2, 4)$',
      'No: la suma vectorial exige vectores de la misma longitud',
    ],
    answer: 2,
    explanation:
      'Las operaciones elemento a elemento requieren la misma longitud. (NumPy daría un error de broadcasting: lo veremos en la etapa 6.)',
  },
]
