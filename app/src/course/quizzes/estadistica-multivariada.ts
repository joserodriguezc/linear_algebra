import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'numeric',
    prompt: 'Calcula la media de $x = (2, 4, 6, 8)$.',
    answer: 5,
    explanation: '$\\bar{x} = (2 + 4 + 6 + 8)/4 = 20/4 = 5$.',
  },
  {
    type: 'numeric',
    prompt: 'Calcula la varianza muestral (dividiendo por $n - 1$) de $x = (2, 4, 6, 8)$.',
    answer: 20 / 3,
    explanation: 'Desviaciones respecto a 5: $-3, -1, 1, 3$. Sus cuadrados suman $9 + 1 + 1 + 9 = 20$, y $20/3 \\approx 6.667$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué hace `ddof=1` en `numpy.var(v, ddof=1)`?',
    options: [
      'Divide por $n - 1$ en lugar de por $n$: la varianza muestral, que corrige el sesgo',
      'Ignora el primer elemento',
      'Calcula la desviación estándar en lugar de la varianza',
      'Redondea a un decimal',
    ],
    answer: 0,
    explanation: '*Delta degrees of freedom*: el divisor es $n - \\text{ddof}$. Por defecto NumPy usa `ddof=0`, mientras que `np.cov` y pandas usan $n - 1$.',
  },
  {
    type: 'numeric',
    prompt: 'Calcula la covarianza muestral entre $x = (1, 2, 3)$ e $y = (2, 4, 6)$.',
    answer: 2,
    explanation: '$\\bar{x} = 2$, $\\bar{y} = 4$. Productos: $(-1)(-2) + 0\\cdot0 + 1\\cdot2 = 4$, y $4 / (3 - 1) = 2$.',
  },
  {
    type: 'numeric',
    prompt: '¿Y su coeficiente de correlación de Pearson?',
    answer: 1,
    explanation: '$y = 2x$ exactamente, una relación lineal perfecta y creciente: $r = 1$. Comprobación: $s_x = 1$, $s_y = 2$, $r = 2/(1\\cdot2) = 1$.',
  },
  {
    type: 'choice',
    prompt: 'Si la correlación entre dos variables es 0, entonces…',
    options: [
      'son independientes seguro',
      'no hay relación LINEAL entre ellas, aunque puede haber otra (por ejemplo $y = x^2$)',
      'una es constante',
      'tienen la misma media',
    ],
    answer: 1,
    explanation: 'La correlación solo mide asociación lineal. Con $x$ simétrico alrededor de 0, $y = x^2$ tiene correlación 0 y depende totalmente de $x$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué hay en la diagonal de la matriz de covarianza $\\Sigma$?',
    options: ['Las medias', 'Las varianzas de cada variable', 'Las correlaciones', 'Unos'],
    answer: 1,
    explanation: '$\\Sigma_{ii} = \\operatorname{cov}(x_i, x_i) = \\operatorname{Var}(x_i)$. Fuera de la diagonal están las covarianzas, y la matriz es simétrica.',
  },
  {
    type: 'choice',
    prompt: 'Con un dataset `X` de forma `(100, 5)` (100 muestras, 5 variables), ¿qué forma tiene `np.cov(X.T)`?',
    options: ['`(100, 100)`', '`(5, 5)`', '`(5,)`', '`(100, 5)`'],
    answer: 1,
    explanation: 'Una fila y una columna por variable. Sin el `.T`, NumPy interpretaría cada muestra como una variable y devolvería `(100, 100)`.',
  },
]
