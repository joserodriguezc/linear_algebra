import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: '¿Qué forma (`shape`) tiene `array([[1, 2, 3], [4, 5, 6]])`?',
    options: ['`(3, 2)`', '`(2, 3)`', '`(6,)`', '`(2,)`'],
    answer: 1,
    explanation: 'La forma se lee (filas, columnas): 2 listas internas (filas) de 3 elementos cada una.',
  },
  {
    type: 'choice',
    prompt: '¿Cuál es el `dtype` de `array([1, 2, 3.5])`?',
    options: ['`int64`', '`float64`', 'un tipo distinto por elemento', '`object`'],
    answer: 1,
    explanation: 'Un ndarray tiene un único tipo. Como hay un decimal, NumPy convierte todos los elementos a `float64`.',
  },
  {
    type: 'choice',
    prompt: 'Con `a1` y `a2` de forma `(3,)`, ¿qué forma tiene `vstack((a1, a2))`?',
    options: ['`(6,)`', '`(3, 2)`', '`(2, 3)`', '`(1, 6)`'],
    answer: 2,
    explanation: '`vstack` apila los vectores como filas: 2 filas de 3 columnas.',
  },
  {
    type: 'choice',
    prompt: '¿Y `hstack((a1, a2))` si `a1` tiene forma `(3,)` y `a2` tiene forma `(5,)`?',
    options: ['`(8,)`', '`(2, 5)`', 'Error: longitudes distintas', '`(3, 5)`'],
    answer: 0,
    explanation: 'Para arrays 1D, `hstack` concatena uno detrás de otro: 3 + 5 = 8 elementos. No necesitan la misma longitud.',
  },
  {
    type: 'choice',
    prompt: '¿Qué función crea un array cuyos valores iniciales son impredecibles?',
    options: ['`zeros`', '`ones`', '`empty`', '`array`'],
    answer: 2,
    explanation: '`empty` solo reserva memoria y no la inicializa: es rápida, pero debes rellenar los valores antes de usarlos.',
  },
  {
    type: 'numeric',
    prompt: '¿Cuántos elementos tiene `zeros([3, 5])`?',
    answer: 15,
    tolerance: 0,
    explanation: '3 filas × 5 columnas = 15 elementos (lo da `.size`).',
  },
  {
    type: 'choice',
    prompt: '¿Qué ocurre con `vstack((array([1, 2, 3]), array([4, 5])))`?',
    options: ['Devuelve forma `(2, 3)` rellenando con 0', 'Devuelve forma `(5,)`', 'Lanza `ValueError`'],
    answer: 2,
    explanation: 'Para apilar como filas, todas deben tener el mismo número de columnas (3 ≠ 2).',
  },
]
