import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: 'El dataset Iris tiene 150 flores y 4 medidas por flor. ¿Qué forma tiene su matriz $X$?',
    options: ['`(4, 150)`', '`(150, 4)`', '`(600,)`', '`(150,)`'],
    answer: 1,
    explanation: 'Una fila por observación (flor) y una columna por característica (medida).',
  },
  {
    type: 'numeric',
    prompt: 'Una imagen en escala de grises de 28×28 píxeles se aplana en un vector. ¿Cuántos elementos tiene?',
    answer: 784,
    tolerance: 0,
    explanation: '$28 \\times 28 = 784$. Es el tamaño de entrada clásico del dataset MNIST.',
  },
  {
    type: 'matrix',
    prompt: 'Codifica en one-hot la columna `[gato, perro, gato]` con las categorías ordenadas alfabéticamente `[gato, perro]`.',
    answer: [
      [1, 0],
      [0, 1],
      [1, 0],
    ],
    explanation: 'Una columna por categoría y un único 1 por fila, en la columna de su categoría.',
  },
  {
    type: 'choice',
    prompt: '¿Por qué no codificar los colores como rojo = 1, verde = 2, azul = 3?',
    options: [
      'Porque ocupa más memoria',
      'Porque inventa un orden y unas distancias que no existen (azul no es "el triple" de rojo)',
      'Porque los modelos no aceptan enteros',
    ],
    answer: 1,
    explanation: 'Un modelo lineal interpretaría esos números como cantidades. El one-hot trata cada categoría por igual.',
  },
  {
    type: 'choice',
    prompt: '¿Qué tienen en común PCA, LSA y los recomendadores por factorización?',
    options: [
      'Todos usan árboles de decisión',
      'Todos factorizan una matriz (eigendescomposición o SVD) para encontrar unas pocas dimensiones latentes',
      'Todos necesitan imágenes',
      'Nada',
    ],
    answer: 1,
    explanation: 'Reducen una matriz grande a unas pocas direcciones que capturan lo esencial: componentes principales, temas o gustos.',
  },
  {
    type: 'choice',
    prompt: '¿Qué operación hace, en esencia, una capa densa de una red neuronal?',
    options: ['Ordenar los datos', 'Un producto matricial $XW$ más un sesgo $b$, seguido de una función no lineal', 'Una SVD', 'Un one-hot'],
    answer: 1,
    explanation: 'Por eso el deep learning se ejecuta en GPU: son máquinas especializadas en multiplicar matrices.',
  },
  {
    type: 'choice',
    prompt: '¿Qué hace la regularización (Ridge, Lasso)?',
    options: [
      'Ordena los coeficientes',
      'Añade al error una penalización sobre la norma de los coeficientes para evitar el sobreajuste',
      'Normaliza las filas de $X$',
    ],
    answer: 1,
    explanation: 'Ridge penaliza $\\|b\\|_2^2$ y Lasso $\\|b\\|_1$; Lasso además deja coeficientes exactamente en 0 (etapa «Normas vectoriales»).',
  },
]
