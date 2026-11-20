import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'numeric',
    prompt: 'Calcula $\\det\\begin{bmatrix}3&1\\\\2&4\\end{bmatrix}$.',
    answer: 10,
    explanation: '$ad - bc = 3\\cdot4 - 1\\cdot2 = 10$.',
  },
  {
    type: 'numeric',
    prompt: 'Calcula la traza de $\\begin{bmatrix}3&1\\\\2&4\\end{bmatrix}$.',
    answer: 7,
    explanation: 'Suma de la diagonal: $3 + 4 = 7$.',
  },
  {
    type: 'matrix',
    prompt: 'Calcula la inversa de $\\begin{bmatrix}2&0\\\\0&4\\end{bmatrix}$.',
    answer: [
      [0.5, 0],
      [0, 0.25],
    ],
    explanation: 'La inversa de una diagonal invierte cada elemento de la diagonal: $1/2$ y $1/4$.',
  },
  {
    type: 'matrix',
    prompt: 'Calcula la inversa de $A = \\begin{bmatrix}4&7\\\\2&6\\end{bmatrix}$ (usa decimales).',
    answer: [
      [0.6, -0.7],
      [-0.2, 0.4],
    ],
    explanation: '$\\det A = 24 - 14 = 10$; $A^{-1} = \\frac{1}{10}\\begin{bmatrix}6&-7\\\\-2&4\\end{bmatrix}$.',
  },
  {
    type: 'numeric',
    prompt: '¿Cuál es el rango de $\\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$?',
    answer: 1,
    tolerance: 0,
    explanation: 'La segunda fila es el doble de la primera: solo hay una dirección independiente.',
  },
  {
    type: 'choice',
    prompt: '¿Qué significa que $\\det A < 0$ para una matriz $2\\times2$?',
    options: ['Que A no es invertible', 'Que la transformación invierte la orientación (como un espejo)', 'Que A reduce las áreas', 'Que A es ortogonal'],
    answer: 1,
    explanation: 'El valor absoluto es el factor de área; el signo indica si el plano se "da la vuelta".',
  },
  {
    type: 'choice',
    prompt: '¿Cuánto vale $(AB)^T$?',
    options: ['$A^TB^T$', '$B^TA^T$', '$AB$', '$(BA)^{-1}$'],
    answer: 1,
    explanation: 'Al transponer un producto se invierte el orden. Lo mismo pasa con la inversa: $(AB)^{-1} = B^{-1}A^{-1}$.',
  },
  {
    type: 'choice',
    prompt: 'Si $\\det A = 0$, entonces…',
    options: [
      'A es la matriz cero',
      'A no tiene inversa: aplasta el espacio a una dimensión menor',
      'A es la identidad',
      'A tiene rango completo',
    ],
    answer: 1,
    explanation: 'Un área nula significa que el plano colapsa a una recta (o a un punto), y ese colapso no se puede deshacer.',
  },
  {
    type: 'numeric',
    prompt: '$A$ es de $5\\times4$ con rango 3 y $B$ es de $4\\times6$ con rango 2. ¿Cuál es el **máximo** rango posible de $AB$?',
    answer: 2,
    tolerance: 0,
    explanation: '$\\operatorname{rank}(AB) \\le \\min(\\operatorname{rank}(A), \\operatorname{rank}(B)) = \\min(3, 2) = 2$.',
  },
  {
    type: 'choice',
    prompt: '¿Cuándo es invertible $X^TX$ (con $X$ de $n\\times p$)?',
    options: [
      'Siempre, porque es cuadrada y simétrica',
      'Cuando las $p$ columnas de $X$ son linealmente independientes',
      'Cuando $n = p$',
      'Nunca',
    ],
    answer: 1,
    explanation: '$\\operatorname{rank}(X^TX) = \\operatorname{rank}(X)$: es $p$ (rango completo) solo si las columnas de $X$ son independientes.',
  },
]
