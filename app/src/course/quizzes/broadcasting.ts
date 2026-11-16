import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: '¿Cuál es la forma de `A + b` si `A.shape == (2, 3)` y `b.shape == (3,)`?',
    options: ['`(2, 3)`', '`(3, 3)`', '`(2,)`', 'Error'],
    answer: 0,
    explanation: 'Desde la derecha: 3 con 3 ✓; a b le falta el eje de filas, que se trata como 1 y se estira a 2.',
  },
  {
    type: 'choice',
    prompt: '¿Y si `A.shape == (2, 3)` y `b.shape == (2,)`?',
    options: ['`(2, 3)`: b se suma a cada columna', '`(2, 2)`', 'Error: 3 y 2 no son compatibles'],
    answer: 2,
    explanation: 'Se compara la última dimensión: 3 vs 2, distintas y ninguna es 1. Habría que usar `b.reshape(2, 1)`.',
  },
  {
    type: 'choice',
    prompt: '¿Qué forma tiene el resultado de operar `(4, 1)` con `(1, 5)`?',
    options: ['`(4, 5)`', '`(1, 1)`', '`(5, 4)`', 'Error'],
    answer: 0,
    explanation: 'En cada eje uno de los dos es 1, así que ambos se estiran: el resultado es `(4, 5)`.',
  },
  {
    type: 'choice',
    prompt: '¿Qué forma tiene el resultado de operar `(3, 4)` con `(3, 1)`?',
    options: ['`(3, 4)`', '`(3, 1)`', 'Error'],
    answer: 0,
    explanation: 'Columnas: 4 vs 1 ✓ (se estira la columna). Filas: 3 vs 3 ✓.',
  },
  {
    type: 'matrix',
    prompt: 'Calcula `A + b` con `A = [[1, 2, 3], [1, 2, 3]]` y `b = [10, 20, 30]`.',
    answer: [
      [11, 22, 33],
      [11, 22, 33],
    ],
    explanation: 'b se suma a cada fila de A.',
  },
  {
    type: 'choice',
    prompt: '¿Cuál es la regla de broadcasting?',
    options: [
      'Los arrays deben tener exactamente la misma forma',
      'Comparando las dimensiones desde la derecha, cada par debe ser igual o uno de ellos 1',
      'Comparando desde la izquierda, el primer array debe ser mayor',
      'El array más pequeño se rellena con ceros',
    ],
    answer: 1,
    explanation: 'Las dimensiones que faltan se tratan como 1; un 1 se "estira" para igualar al otro.',
  },
  {
    type: 'choice',
    prompt: 'Con `X` de forma `(100, 3)`, ¿qué hace `X - X.mean(axis=0)`?',
    options: [
      'Resta a cada fila su propia media',
      'Resta a cada columna su media (centra cada característica)',
      'Lanza un error de formas',
      'Resta la media global de todo X',
    ],
    answer: 1,
    explanation: '`X.mean(axis=0)` tiene forma `(3,)`: una media por columna, que se estira sobre las 100 filas.',
  },
]
