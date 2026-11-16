import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: '¿Qué significa que $v \\neq 0$ sea un vector propio de $A$ con valor propio $\\lambda$?',
    options: ['$Av = v$', '$Av = \\lambda v$: A solo lo estira o encoge (o invierte), sin cambiar su dirección', '$A = \\lambda v$', '$v \\cdot Av = 0$'],
    answer: 1,
    explanation: 'Es la definición: aplicar $A$ a $v$ equivale a multiplicarlo por el número $\\lambda$.',
  },
  {
    type: 'numeric',
    prompt: '¿Cuál es el mayor valor propio de $\\begin{bmatrix}2&0\\\\0&5\\end{bmatrix}$?',
    answer: 5,
    explanation: 'En una matriz diagonal (o triangular) los valores propios son los elementos de la diagonal: 2 y 5.',
  },
  {
    type: 'choice',
    prompt: '¿Es $v = (1, 1)$ un vector propio de $A = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$?',
    options: ['Sí', 'No'],
    answer: 0,
    explanation: '$Av = (2+1,\\ 1+2) = (3, 3) = 3\\,(1, 1)$. Sí, con $\\lambda = 3$.',
  },
  {
    type: 'numeric',
    prompt: 'Calcula el mayor valor propio de $\\begin{bmatrix}4&1\\\\2&3\\end{bmatrix}$ (resuelve $\\det(A - \\lambda I) = 0$).',
    answer: 5,
    explanation: '$(4-\\lambda)(3-\\lambda) - 2 = \\lambda^2 - 7\\lambda + 10 = (\\lambda - 5)(\\lambda - 2)$. Los valores propios son 5 y 2.',
  },
  {
    type: 'choice',
    prompt: 'El producto de todos los valores propios de una matriz es igual a…',
    options: ['su traza', 'su determinante', 'su rango', 'su norma'],
    answer: 1,
    explanation: 'El producto es el determinante y la suma es la traza. En el ejemplo anterior: $5\\cdot2 = 10 = \\det A$ y $5+2 = 7 = \\operatorname{tr}A$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué valores propios tiene una rotación de 90° en el plano?',
    options: ['1 y 1', '0 y 1', 'Complejos ($\\pm i$): ninguna dirección real se conserva', '-1 y -1'],
    answer: 2,
    explanation: 'Una rotación gira todos los vectores, así que ninguno queda sobre su misma recta.',
  },
  {
    type: 'choice',
    prompt: 'Si $A$ es simétrica, sus valores y vectores propios…',
    options: [
      'pueden ser complejos',
      'son reales y los vectores propios son ortogonales entre sí, así que $A = Q\\Lambda Q^T$',
      'son siempre todos iguales',
    ],
    answer: 1,
    explanation: 'Es el teorema espectral. Por eso para la matriz de covarianza (simétrica) se usa `eigh`, y en eso se basa PCA.',
  },
  {
    type: 'choice',
    prompt: 'En $A = Q\\Lambda Q^{-1}$, ¿qué es $\\Lambda$?',
    options: ['La matriz de vectores propios', 'Una matriz diagonal con los valores propios', 'La inversa de $Q$', 'Una matriz triangular inferior'],
    answer: 1,
    explanation: '$Q$ tiene los vectores propios en sus columnas y $\\Lambda = \\operatorname{diag}(\\lambda_1, \\dots, \\lambda_n)$.',
  },
]
