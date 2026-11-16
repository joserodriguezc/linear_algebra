import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: 'En $y = Xb$ con $n$ muestras y $p$ características, ¿qué formas tienen $X$, $b$ e $y$?',
    options: ['$X$: $(n, p)$, $b$: $(p,)$, $y$: $(n,)$', '$X$: $(p, n)$, $b$: $(n,)$, $y$: $(p,)$', '$X$: $(n, n)$, $b$: $(n,)$, $y$: $(n,)$'],
    answer: 0,
    explanation: 'Una fila de $X$ por muestra y un coeficiente de $b$ por característica: $(n, p)\\cdot(p,) \\to (n,)$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué minimiza la regresión por mínimos cuadrados?',
    options: [
      'La suma de los residuos',
      'La suma de los residuos al cuadrado, $\\|y - Xb\\|_2^2$',
      'El mayor residuo',
      'El número de puntos mal predichos',
    ],
    answer: 1,
    explanation: 'Elevar al cuadrado impide que los errores positivos y negativos se cancelen y penaliza más los errores grandes.',
  },
  {
    type: 'choice',
    prompt: '¿Cuál es la ecuación normal?',
    options: ['$b = X^{-1}y$', '$b = (X^TX)^{-1}X^Ty$', '$b = X^Ty$', '$b = (XX^T)^{-1}y$'],
    answer: 1,
    explanation: 'Sale de anular el gradiente de $\\|y - Xb\\|^2$: $X^TXb = X^Ty$. $X^{-1}$ no existe porque $X$ no es cuadrada.',
  },
  {
    type: 'numeric',
    prompt: 'Ajusta $y = b\\,x$ (sin término independiente) a los puntos $(1, 2)$ y $(2, 4)$. ¿Cuánto vale $b$?',
    answer: 2,
    explanation: 'Con una sola columna, $b = \\frac{\\sum x_iy_i}{\\sum x_i^2} = \\frac{2 + 8}{1 + 4} = 2$.',
  },
  {
    type: 'numeric',
    prompt: 'La recta de mínimos cuadrados que pasa por $(0, 1)$, $(1, 3)$ y $(2, 5)$ es $\\hat{y} = b_0 + b_1x$. ¿Cuánto vale $b_0$?',
    answer: 1,
    explanation: 'Los tres puntos están alineados sobre $y = 1 + 2x$: el ajuste es exacto, con $b_0 = 1$ y $b_1 = 2$.',
  },
  {
    type: 'choice',
    prompt: '¿Para qué se añade a $X$ una columna de unos?',
    options: [
      'Para que $X$ sea cuadrada',
      'Para estimar el término independiente $b_0$ (la recta no tiene por qué pasar por el origen)',
      'Para normalizar los datos',
      'Para evitar dividir por cero',
    ],
    answer: 1,
    explanation: 'Con la fila $[1, x_i]$, la predicción es $b_0\\cdot1 + b_1x_i$. `LinearRegression` lo hace por ti (`fit_intercept=True`).',
  },
  {
    type: 'choice',
    prompt: 'Si las columnas de $X$ son casi dependientes, ¿qué método es menos estable numéricamente?',
    options: ['Invertir $X^TX$ (ecuación normal)', 'QR', 'SVD / pseudoinversa (`lstsq`)'],
    answer: 0,
    explanation: 'Formar $X^TX$ eleva al cuadrado el número de condición y multiplica los errores de redondeo. QR y SVD trabajan directamente con $X$.',
  },
  {
    type: 'numeric',
    prompt: 'Con $\\hat{y} = 1 + 2x$, ¿cuál es el residuo $y - \\hat{y}$ del punto $(2, 6)$?',
    answer: 1,
    explanation: '$\\hat{y} = 1 + 2\\cdot2 = 5$ y el residuo es $6 - 5 = 1$ (el punto queda 1 unidad por encima de la recta).',
  },
]
