import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: '¿Cuándo son linealmente independientes los vectores $x_1, \\dots, x_k$?',
    options: [
      'Cuando son todos distintos',
      'Cuando la única forma de obtener el vector cero, $c_1x_1 + \\dots + c_kx_k = \\mathbf{0}$, es con todos los $c_i = 0$',
      'Cuando son perpendiculares dos a dos',
      'Cuando tienen la misma longitud',
    ],
    answer: 1,
    explanation: 'Si hubiera otra forma, alguno sería combinación lineal de los demás: sería redundante. La perpendicularidad implica independencia, pero no al revés.',
  },
  {
    type: 'choice',
    prompt: '¿Son linealmente independientes $(1, 2)$ y $(2, 4)$?',
    options: ['Sí', 'No: el segundo es el doble del primero'],
    answer: 1,
    explanation: '$2\\cdot(1, 2) - (2, 4) = \\mathbf{0}$ con coeficientes no nulos. Generan una recta, no el plano.',
  },
  {
    type: 'numeric',
    prompt: '¿Cuál es el rango de $\\begin{bmatrix}1&2&1\\\\2&1&-1\\\\3&0&-3\\end{bmatrix}$?',
    answer: 2,
    tolerance: 0,
    explanation: 'La tercera columna es la segunda menos la primera; las dos primeras son independientes.',
  },
  {
    type: 'numeric',
    prompt: 'Una matriz de $3\\times5$ tiene rango 3. ¿Cuál es la dimensión de su núcleo?',
    answer: 2,
    tolerance: 0,
    explanation: 'Teorema rango–nulidad: $\\dim\\ker(A) = n - \\operatorname{rank}(A) = 5 - 3 = 2$, con $n$ el número de columnas.',
  },
  {
    type: 'matrix',
    prompt: 'Calcula las coordenadas de $x = (3, 2)$ en la base $b_1 = (1, 0)$, $b_2 = (1, 1)$ (como columna).',
    answer: [[1], [2]],
    explanation: '$x = c_1b_1 + c_2b_2$: la segunda componente da $c_2 = 2$ y la primera $c_1 + c_2 = 3$, así que $c_1 = 1$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué es el span de $(1, 0, 0)$ y $(0, 1, 0)$ en ℝ³ (los números reales en tres dimensiones)?',
    options: ['Todo ℝ³', 'El plano $z = 0$', 'La recta del eje x', 'Solo el origen'],
    answer: 1,
    explanation: 'Sus combinaciones son $(c_1, c_2, 0)$: todos los puntos con tercera coordenada nula. Dos vectores independientes generan un plano.',
  },
  {
    type: 'choice',
    prompt: 'Si $Ax = b$ tiene al menos una solución y el núcleo de $A$ contiene vectores no nulos, entonces…',
    options: [
      'la solución es única',
      'tiene infinitas soluciones: una particular más cualquier vector del núcleo',
      'no tiene solución',
    ],
    answer: 1,
    explanation: 'Si $Ax_p = b$ y $Ak = \\mathbf{0}$, entonces $A(x_p + tk) = b$ para todo $t$.',
  },
  {
    type: 'choice',
    prompt: 'En un dataset, la columna $x_3$ es exactamente $x_1 + 2x_2$. ¿Qué le pasa a la regresión lineal?',
    options: [
      'Nada: más columnas siempre mejoran el modelo',
      '$X$ no tiene rango completo, $X^TX$ es singular y los coeficientes no son únicos',
      'El modelo predice peor pero los coeficientes son únicos',
    ],
    answer: 1,
    explanation: 'Es multicolinealidad: hay infinitas combinaciones de coeficientes que dan las mismas predicciones. Se resuelve quitando la columna redundante o regularizando.',
  },
  {
    type: 'numeric',
    prompt: 'Una matriz de $5\\times3$ tiene rango 3. ¿Qué dimensión tiene su núcleo izquierdo, $\\ker(A^T)$?',
    answer: 2,
    tolerance: 0,
    explanation: '$\\dim\\ker(A^T) = m - r = 5 - 3 = 2$. El núcleo $\\ker(A)$, en cambio, tiene dimensión $n - r = 0$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué subespacio es perpendicular al núcleo de $A$?',
    options: ['El espacio columna', 'El espacio fila, $\\operatorname{Im}(A^T)$', 'El núcleo izquierdo', 'Ninguno'],
    answer: 1,
    explanation: 'Si $Ax = \\mathbf{0}$, $x$ es perpendicular a cada fila de $A$, y por tanto a todas sus combinaciones: el espacio fila.',
  },
]
