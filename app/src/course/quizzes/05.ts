import type { Question } from '../../components/quiz/quizEngine'

const D = 'Con `data = array([[11, 22, 33], [44, 55, 66], [77, 88, 99]])`, '

export const quiz: Question[] = [
  {
    type: 'numeric',
    prompt: `${D}¿cuánto vale \`data[1, 2]\`?`,
    answer: 66,
    tolerance: 0,
    explanation: 'Fila 1 (la segunda, se cuenta desde 0) y columna 2 (la tercera): 66.',
  },
  {
    type: 'numeric',
    prompt: `${D}¿cuánto vale \`data[-1, 0]\`?`,
    answer: 77,
    tolerance: 0,
    explanation: '-1 es la última fila; columna 0 es la primera: 77.',
  },
  {
    type: 'choice',
    prompt: `${D}¿qué forma tiene \`data[:, :-1]\`?`,
    options: ['`(3, 2)`', '`(2, 3)`', '`(3,)`', '`(2, 2)`'],
    answer: 0,
    explanation: 'Todas las filas (3) y todas las columnas salvo la última (2). Es el patrón para obtener X.',
  },
  {
    type: 'choice',
    prompt: `${D}¿qué devuelve \`data[:, -1]\`?`,
    options: ['`[[33], [66], [99]]` con forma `(3, 1)`', '`[33 66 99]` con forma `(3,)`', '`[77 88 99]`', '`99`'],
    answer: 1,
    explanation: 'El índice entero `-1` en el eje de columnas elimina ese eje: se obtiene un vector 1D (la y).',
  },
  {
    type: 'choice',
    prompt: '¿Qué formas tienen `data[0]` y `data[0:1]` respectivamente?',
    options: ['`(3,)` y `(3,)`', '`(1, 3)` y `(3,)`', '`(3,)` y `(1, 3)`', '`(1, 3)` y `(1, 3)`'],
    answer: 2,
    explanation: 'Un índice entero quita la dimensión; un slice la conserva aunque seleccione un único elemento.',
  },
  {
    type: 'choice',
    prompt: '¿Qué forma tiene `arange(12).reshape(3, -1)`?',
    options: ['`(3, 12)`', '`(3, 4)`', '`(4, 3)`', 'Error: -1 no es válido'],
    answer: 1,
    explanation: '`-1` le pide a NumPy que calcule esa dimensión: 12 / 3 = 4.',
  },
  {
    type: 'choice',
    prompt: '¿Qué pasa con `arange(12).reshape(5, 3)`?',
    options: ['Rellena con ceros', 'Descarta los elementos sobrantes', 'Lanza `ValueError`'],
    answer: 2,
    explanation: 'reshape debe conservar el número total de elementos: 5 × 3 = 15 ≠ 12.',
  },
  {
    type: 'numeric',
    prompt: 'Una LSTM espera datos `[muestras, pasos, características]`. Si `X` tiene forma `(100, 5)` y haces `X.reshape(100, 5, 1)`, ¿cuántas dimensiones (`ndim`) tiene el resultado?',
    answer: 3,
    tolerance: 0,
    explanation: 'Se añade un eje de tamaño 1 al final: forma `(100, 5, 1)`, 3 dimensiones, mismos 500 elementos.',
  },
]
