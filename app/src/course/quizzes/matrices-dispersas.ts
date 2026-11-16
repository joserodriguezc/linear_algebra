import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'numeric',
    prompt:
      'Calcula la dispersión de $\\begin{bmatrix}1&0&0&1&0&0\\\\0&0&2&0&0&1\\\\0&0&0&2&0&0\\end{bmatrix}$ (proporción de ceros, con 2 decimales).',
    answer: 13 / 18,
    explanation: 'Hay 5 valores no nulos (1, 1, 2, 1, 2) entre $3 \\times 6 = 18$ elementos: $1 - 5/18 = 13/18 \\approx 0.72$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué tres arrays guarda el formato CSR?',
    options: [
      'filas, columnas y valores de todos los elementos',
      'los valores no nulos, su índice de columna y un puntero al inicio de cada fila',
      'la matriz densa comprimida con zip',
      'solo las posiciones de los ceros',
    ],
    answer: 1,
    explanation: '`data`, `indices` e `indptr`. Con ellos se reconstruye cualquier fila sin guardar los ceros.',
  },
  {
    type: 'choice',
    prompt: 'Para $M = \\begin{bmatrix}0&5\\\\0&0\\\\3&0\\end{bmatrix}$, ¿cuál es `indptr` en CSR?',
    options: ['`[0, 1, 1, 2]`', '`[1, 0]`', '`[0, 1, 2]`', '`[5, 3]`'],
    answer: 0,
    explanation:
      'La fila 0 tiene 1 valor (tramo 0:1), la fila 1 ninguno (1:1) y la fila 2 uno (1:2). `data = [5, 3]` e `indices = [1, 0]`.',
  },
  {
    type: 'numeric',
    prompt: 'Una codificación one-hot de 1000 muestras con 50 categorías tiene un único 1 por fila. ¿Cuál es su dispersión?',
    answer: 0.98,
    explanation: '1000 unos entre $1000 \\times 50 = 50\\,000$ elementos: $1 - 1/50 = 0.98$.',
  },
  {
    type: 'choice',
    prompt: '¿Cuál de estos datos NO suele ser disperso?',
    options: ['Bolsa de palabras de documentos', 'Valoraciones usuario × película', 'Píxeles de una fotografía', 'Codificación one-hot'],
    answer: 2,
    explanation: 'En una foto casi todos los píxeles tienen valor distinto de cero: es un dato denso.',
  },
  {
    type: 'choice',
    prompt: '¿Por qué un producto matriz-vector es mucho más rápido en CSR cuando la matriz es muy dispersa?',
    options: [
      'Porque usa la GPU',
      'Porque solo recorre los valores no nulos: las multiplicaciones por cero no se hacen',
      'Porque redondea los resultados',
    ],
    answer: 1,
    explanation: 'El coste pasa de $m\\times n$ operaciones a una por valor no nulo.',
  },
]
