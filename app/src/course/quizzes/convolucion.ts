import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: '¿Por qué una convolución se puede escribir como un producto matriz-vector?',
    options: [
      'Porque toda operación con vectores es una matriz',
      'Porque es lineal: convolucionar una combinación lineal de señales da la misma combinación de las salidas',
      'Porque el filtro es simétrico',
      'Solo se puede si la señal es periódica',
    ],
    answer: 1,
    explanation: 'Toda transformación lineal de vectores de longitud finita es una matriz. La de una convolución tiene diagonales constantes (Toeplitz).',
  },
  {
    type: 'numeric',
    prompt: 'Con la media móvil $k = (\\tfrac14, \\tfrac12, \\tfrac14)$ y bordes con ceros, ¿cuánto vale $y_2$ para $x = (2, 4, 6, 5, 1)$?',
    answer: 4,
    explanation: '$y_2 = \\tfrac14\\cdot2 + \\tfrac12\\cdot4 + \\tfrac14\\cdot6 = 0.5 + 2 + 1.5 = 4$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué caracteriza a una matriz de Toeplitz?',
    options: ['Es simétrica', 'Sus diagonales son constantes: cada fila es la anterior desplazada', 'Es triangular', 'Es ortogonal'],
    answer: 1,
    explanation: 'Todos los elementos de una misma diagonal son iguales: $T_{ij}$ solo depende de $i - j$. Si además las diagonales «dan la vuelta», es circulante.',
  },
  {
    type: 'matrix',
    prompt: 'Escribe la matriz $3\\times3$ (bordes con ceros) de la convolución con el filtro de diferencias $k = (1, -1, 0)$, es decir, $y_i = x_{i+1} - x_i$.',
    answer: [
      [-1, 1, 0],
      [0, -1, 1],
      [0, 0, -1],
    ],
    explanation: 'Fila $i$: $-1$ en la posición $i$ y $+1$ en la $i+1$. La última fila no tiene $x_4$ (borde con cero), así que solo queda $-x_3$.',
  },
  {
    type: 'choice',
    prompt: 'Una imagen de 28×28 pasa por un filtro 3×3 (modo válido). ¿Cuántos pesos tiene esa capa convolucional, sin contar el sesgo?',
    options: ['9', '784', '676', '784 · 676'],
    answer: 0,
    explanation: 'El mismo núcleo de 3×3 = 9 pesos se aplica en todas las posiciones. Una capa densa equivalente (784 → 676) necesitaría 529 984 pesos.',
  },
  {
    type: 'choice',
    prompt: '¿Qué significa que la convolución circular conmute con el desplazamiento ($CS = SC$)?',
    options: [
      'Que el filtro es la identidad',
      'Que desplazar la entrada desplaza igual la salida: un patrón se detecta igual esté donde esté (equivariancia)',
      'Que la matriz es invertible',
    ],
    answer: 1,
    explanation: 'Es la propiedad que hace útiles a las CNN: un detector de bordes funciona en cualquier zona de la imagen.',
  },
  {
    type: 'choice',
    prompt: '¿Qué hace el filtro $(0.5, 0, -0.5)$ sobre una señal?',
    options: ['La suaviza', 'Aproxima su derivada: responde a los cambios y vale 0 donde la señal es constante', 'La desplaza', 'La deja igual'],
    answer: 1,
    explanation: '$y_i = (x_{i+1} - x_{i-1})/2$ es una diferencia centrada. Los filtros de Sobel hacen lo mismo en 2D para detectar bordes.',
  },
]
