import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'matrix',
    prompt: 'Escribe `tril(M)` para $M = \\begin{bmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{bmatrix}$.',
    answer: [
      [1, 0, 0],
      [4, 5, 0],
      [7, 8, 9],
    ],
    explanation: 'Se conserva la diagonal y lo que está por debajo; lo de arriba se pone a cero.',
  },
  {
    type: 'choice',
    prompt: '¿Cuál de estas matrices es simétrica?',
    options: [
      '$\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}$',
      '$\\begin{bmatrix}1&7\\\\7&4\\end{bmatrix}$',
      '$\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$',
      '$\\begin{bmatrix}1&2&3\\\\2&1&2\\end{bmatrix}$',
    ],
    answer: 1,
    explanation: 'Simétrica: cuadrada y $a_{ij} = a_{ji}$. La tercera es antisimétrica ($a_{ij} = -a_{ji}$) y la cuarta ni siquiera es cuadrada.',
  },
  {
    type: 'choice',
    prompt: 'Si $Q$ es ortogonal, su inversa es…',
    options: ['$-Q$', '$Q^T$', '$Q$ siempre', 'no existe'],
    answer: 1,
    explanation: 'Por definición $Q^TQ = I$, así que $Q^{-1} = Q^T$: invertirla es gratis.',
  },
  {
    type: 'choice',
    prompt: '¿Qué devuelve `diag(array([[1, 2], [3, 4]]))`?',
    options: ['`[[1 0] [0 4]]`', '`[1 4]`', '`[2 3]`', '`5`'],
    answer: 1,
    explanation: 'Aplicada a una matriz, `diag` extrae la diagonal como vector. Aplicada a un vector, construye la matriz diagonal.',
  },
  {
    type: 'choice',
    prompt: '¿Es ortogonal $P = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$?',
    options: ['Sí: $P^TP = I$ (intercambia los ejes, es una reflexión)', 'No: tiene ceros en la diagonal', 'No: no es simétrica'],
    answer: 0,
    explanation: 'Sus columnas $(0,1)$ y $(1,0)$ son unitarias y perpendiculares. Además es simétrica, así que $P^{-1} = P^T = P$.',
  },
  {
    type: 'numeric',
    prompt: 'Si `A` tiene forma `(4, 3)`, `A.T @ A` es una matriz cuadrada de tamaño $n \\times n$. ¿Cuánto vale $n$?',
    answer: 3,
    tolerance: 0,
    explanation: '`(3, 4) @ (4, 3) → (3, 3)`. Además siempre es simétrica.',
  },
  {
    type: 'choice',
    prompt: 'Geométricamente, multiplicar por una matriz diagonal $\\text{diag}(2, 0.5)$…',
    options: ['rota el plano', 'estira el eje x al doble y encoge el eje y a la mitad', 'refleja respecto a la diagonal', 'colapsa el plano a una recta'],
    answer: 1,
    explanation: 'Cada elemento de la diagonal escala su propio eje de forma independiente.',
  },
]
