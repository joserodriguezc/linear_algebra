import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'matrix',
    prompt: 'Calcula la matriz de proyección sobre la recta generada por $b = (1, 1)$, $P = \\dfrac{bb^T}{b^Tb}$.',
    answer: [
      [0.5, 0.5],
      [0.5, 0.5],
    ],
    explanation: '$bb^T = \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$ y $b^Tb = 2$.',
  },
  {
    type: 'matrix',
    prompt: 'Con esa $P$, calcula la proyección de $x = (2, 0)$ (como columna).',
    answer: [[1], [1]],
    explanation: '$Px = (0.5\\cdot2 + 0.5\\cdot0,\\ 0.5\\cdot2 + 0.5\\cdot0) = (1, 1)$. El residuo $(1, -1)$ es perpendicular a $b$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué significa que una matriz de proyección cumpla $P^2 = P$?',
    options: [
      'Que es la identidad',
      'Que proyectar dos veces da lo mismo que proyectar una: lo que ya está en el subespacio no se mueve',
      'Que es invertible',
      'Que sus valores propios son negativos',
    ],
    answer: 1,
    explanation: '$Px$ ya pertenece al subespacio, así que $P(Px) = Px$. Por eso sus valores propios solo pueden ser 0 o 1.',
  },
  {
    type: 'choice',
    prompt: 'En una proyección ortogonal, el residuo $x - Px$ es…',
    options: ['paralelo al subespacio', 'perpendicular a todo el subespacio', 'siempre el vector cero', 'igual a $Px$'],
    answer: 1,
    explanation: 'Por eso $Px$ es el punto del subespacio más cercano a $x$: $B^T(x - Px) = \\mathbf{0}$.',
  },
  {
    type: 'choice',
    prompt: 'Si las columnas de $Q$ son una base ortonormal del subespacio, la proyección es…',
    options: ['$P = Q^TQ$', '$P = QQ^T$', '$P = Q^{-1}$', '$P = I$'],
    answer: 1,
    explanation: 'Como $Q^TQ = I$, la fórmula $Q(Q^TQ)^{-1}Q^T$ se reduce a $QQ^T$, sin invertir nada.',
  },
  {
    type: 'choice',
    prompt: 'En la regresión lineal, las predicciones $\\hat{y}$ son la proyección ortogonal de $y$ sobre…',
    options: ['el eje x', 'el espacio columna de $X$ (todas las combinaciones de sus columnas)', 'el núcleo de $X$', 'el vector de unos'],
    answer: 1,
    explanation: 'Mínimos cuadrados busca el $Xb$ más cercano a $y$: su proyección sobre el espacio columna, $\\hat{y} = X(X^TX)^{-1}X^Ty$.',
  },
  {
    type: 'numeric',
    prompt: '¿Cuál es el rango de la matriz $3\\times3$ que proyecta sobre un plano de ℝ³ (los números reales en tres dimensiones)?',
    answer: 2,
    tolerance: 0,
    explanation: 'Su imagen es el plano (dimensión 2) y su núcleo, la recta perpendicular al plano (dimensión 1): $2 + 1 = 3$.',
  },
]
