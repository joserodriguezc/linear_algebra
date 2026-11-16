import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: '¿Cuál de estas ecuaciones es lineal en $x$ e $y$?',
    options: ['$y = 4x + 1$', '$y = x^2$', '$xy = 3$', '$y = \\sin x$'],
    answer: 0,
    explanation: 'En una ecuación lineal las incógnitas solo aparecen multiplicadas por constantes y sumadas: sin potencias, productos entre ellas ni funciones.',
  },
  {
    type: 'numeric',
    prompt: 'Resuelve el sistema $x + y = 5$, $x - y = 1$. ¿Cuánto vale $x$?',
    answer: 3,
    explanation: 'Sumando ambas ecuaciones: $2x = 6$, así que $x = 3$ (y entonces $y = 2$).',
  },
  {
    type: 'choice',
    prompt: '¿Cuántas soluciones tiene $x + y = 3$, $2x + 2y = 6$?',
    options: ['Ninguna', 'Una', 'Infinitas'],
    answer: 2,
    explanation: 'La segunda ecuación es la primera multiplicada por 2: es la misma recta, y cada uno de sus puntos es solución.',
  },
  {
    type: 'choice',
    prompt: '¿Y $x + y = 3$, $x + y = -1$?',
    options: ['Ninguna: las rectas son paralelas', 'Una', 'Infinitas'],
    answer: 0,
    explanation: 'Misma inclinación, distinta posición: las rectas nunca se cortan.',
  },
  {
    type: 'choice',
    prompt: 'El sistema $2x + 3y = 7$, $x - y = 1$ escrito en forma matricial $Ax = b$ tiene…',
    options: [
      '$A = \\begin{bmatrix}2&3\\\\1&-1\\end{bmatrix}$, $b = \\begin{bmatrix}7\\\\1\\end{bmatrix}$',
      '$A = \\begin{bmatrix}2&1\\\\3&-1\\end{bmatrix}$, $b = \\begin{bmatrix}7\\\\1\\end{bmatrix}$',
      '$A = \\begin{bmatrix}7\\\\1\\end{bmatrix}$, $b = \\begin{bmatrix}2&3\\\\1&-1\\end{bmatrix}$',
    ],
    answer: 0,
    explanation: 'Cada fila de $A$ son los coeficientes de una ecuación y $b$ son los términos independientes.',
  },
  {
    type: 'choice',
    prompt: '¿Por qué `0.1 + 0.2 == 0.3` es `False` en Python?',
    options: [
      'Por un error de Python',
      'Porque los números en coma flotante se guardan en binario con precisión limitada y se redondean',
      'Porque 0.1 + 0.2 da 0.4',
    ],
    answer: 1,
    explanation: 'Es el objeto de estudio del álgebra lineal numérica: hacer los cálculos de forma eficiente y controlando el error de redondeo. Compara con `np.isclose`.',
  },
  {
    type: 'choice',
    prompt: '¿Qué hacen las librerías BLAS y LAPACK?',
    options: [
      'Dibujan gráficos',
      'Implementan de forma muy optimizada las operaciones de álgebra lineal que usan por dentro NumPy, SciPy o PyTorch',
      'Entrenan redes neuronales',
      'Gestionan paquetes de Python',
    ],
    answer: 1,
    explanation: 'Llevan décadas de optimización: por eso `A @ B` en NumPy es órdenes de magnitud más rápido que un bucle en Python.',
  },
]
