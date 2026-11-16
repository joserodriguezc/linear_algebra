import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: 'Si $A$ es $3\\times 2$ y $B$ es $2\\times 4$, ¿qué forma tiene $AB$?',
    options: ['$3\\times 4$', '$2\\times 2$', '$4\\times 3$', 'No se puede multiplicar'],
    answer: 0,
    explanation: 'Las dimensiones interiores (2 y 2) coinciden y se "cancelan"; quedan las exteriores: $3\\times4$.',
  },
  {
    type: 'choice',
    prompt: '¿Se puede calcular `A @ B` si ambas son de forma `(2, 3)`?',
    options: ['Sí, da `(2, 3)`', 'Sí, da `(3, 3)`', 'No: 3 columnas de A ≠ 2 filas de B'],
    answer: 2,
    explanation: 'Sí se puede `A @ B.T` (da 2×2) o `A * B` (Hadamard, 2×3).',
  },
  {
    type: 'matrix',
    prompt: 'Calcula $AB$ con $A = \\begin{bmatrix}1 & 2\\\\ 3 & 4\\end{bmatrix}$ y $B = \\begin{bmatrix}2 & 0\\\\ 1 & 1\\end{bmatrix}$.',
    answer: [
      [4, 2],
      [10, 4],
    ],
    explanation: '$c_{11} = 1\\cdot2+2\\cdot1 = 4$, $c_{12} = 1\\cdot0+2\\cdot1 = 2$, $c_{21} = 3\\cdot2+4\\cdot1=10$, $c_{22} = 3\\cdot0+4\\cdot1 = 4$.',
  },
  {
    type: 'matrix',
    prompt: 'Con las mismas matrices, calcula el producto de Hadamard $A \\circ B$ (`A * B`).',
    answer: [
      [2, 0],
      [3, 4],
    ],
    explanation: 'Elemento a elemento: $1\\cdot2,\\ 2\\cdot0,\\ 3\\cdot1,\\ 4\\cdot1$.',
  },
  {
    type: 'matrix',
    prompt: 'Calcula $Av$ con $A = \\begin{bmatrix}1 & 2\\\\ 3 & 4\\\\ 5 & 6\\end{bmatrix}$ y $v = (1, -1)$. Escríbelo como columna.',
    answer: [[-1], [-1], [-1]],
    explanation: 'Cada fila por $v$: $1-2$, $3-4$, $5-6$.',
  },
  {
    type: 'choice',
    prompt: 'Para dos matrices cuadradas $A$ y $B$ del mismo tamaño, en general…',
    options: ['$AB = BA$', '$AB \\ne BA$', '$AB = (BA)^{-1}$'],
    answer: 1,
    explanation: 'El producto matricial no es conmutativo: aplicar primero una transformación y luego otra no es lo mismo que al revés.',
  },
  {
    type: 'choice',
    prompt: 'Si una matriz $2\\times2$ se ve como transformación del plano, ¿qué representa su primera columna?',
    options: ['A dónde va el vector $\\hat{\\imath} = (1, 0)$', 'A dónde va $\\hat{\\jmath} = (0, 1)$', 'El área del paralelogramo'],
    answer: 0,
    explanation: '$A(1,0)^T$ selecciona la primera columna. Por eso conocer las columnas es conocer la transformación.',
  },
  {
    type: 'numeric',
    prompt: 'Con $A = \\begin{bmatrix}1&2\\\\3&4\\\\5&6\\end{bmatrix}$ y $B = \\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}$, ¿cuánto vale $c_{21}$ (fila 2, columna 1) de $C = AB$?',
    answer: 15,
    tolerance: 0,
    explanation: 'Fila 2 de A por columna 1 de B: $3\\cdot1 + 4\\cdot3 = 15$.',
  },
]
