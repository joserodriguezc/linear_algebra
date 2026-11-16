import type { Question } from '../../components/quiz/quizEngine'

const T = 'Con el tensor $T$ de esta etapa (capas `[[1,2,3],[4,5,6],[7,8,9]]`, `[[11,12,13],[14,15,16],[17,18,19]]` y `[[21,22,23],[24,25,26],[27,28,29]]`), '

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: `${T}¿qué forma tiene?`,
    options: ['`(3, 3)`', '`(3, 3, 3)`', '`(9, 3)`', '`(27,)`'],
    answer: 1,
    explanation: '3 capas, cada una con 3 filas y 3 columnas.',
  },
  {
    type: 'numeric',
    prompt: `${T}¿cuánto vale \`T[0, 1, 2]\`?`,
    answer: 6,
    tolerance: 0,
    explanation: 'Capa 0, fila 1 (`[4, 5, 6]`), columna 2: 6.',
  },
  {
    type: 'numeric',
    prompt: `${T}¿cuánto vale \`T[2, 0, 1]\`?`,
    answer: 22,
    tolerance: 0,
    explanation: 'Capa 2, fila 0 (`[21, 22, 23]`), columna 1: 22.',
  },
  {
    type: 'choice',
    prompt: `${T}¿qué forma tiene \`T[:, 0, :]\`?`,
    options: ['`(3,)`', '`(3, 3)`', '`(1, 3, 3)`', '`(3, 1, 3)`'],
    answer: 1,
    explanation: 'La primera fila de cada capa: el índice entero elimina el eje de filas y quedan (capas, columnas).',
  },
  {
    type: 'matrix',
    prompt: 'Calcula `tensordot([1, 2], [3, 4], axes=0)`, es decir, el producto tensorial $a \\otimes b$.',
    answer: [
      [3, 4],
      [6, 8],
    ],
    explanation: 'Cada elemento de $a$ multiplica a todo $b$: fila 1 = $1\\cdot(3,4)$, fila 2 = $2\\cdot(3,4)$.',
  },
  {
    type: 'choice',
    prompt: 'Un lote de 32 imágenes RGB de 28×28 píxeles, en el formato habitual de TensorFlow, tiene forma…',
    options: ['`(28, 28, 3)`', '`(32, 28, 28, 3)`', '`(32, 784)`', '`(3, 32, 28, 28)`'],
    answer: 1,
    explanation: '(lote, alto, ancho, canales). PyTorch usa (lote, canales, alto, ancho): `(32, 3, 28, 28)`.',
  },
  {
    type: 'numeric',
    prompt: '¿Cuántos elementos tiene un tensor de forma `(2, 3, 4)`?',
    answer: 24,
    tolerance: 0,
    explanation: '$2 \\times 3 \\times 4 = 24$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué forma tiene $a \\otimes b$ si $a$ tiene forma `(2,)` y $b$ forma `(3,)`?',
    options: ['`(5,)`', '`(6,)`', '`(2, 3)`', '`(3, 2)`'],
    answer: 2,
    explanation: 'El producto tensorial concatena las formas: `(2,) ⊗ (3,) → (2, 3)`.',
  },
]
