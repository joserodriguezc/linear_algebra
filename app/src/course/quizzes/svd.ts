import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: 'Si $A$ es $3\\times2$, ¿qué formas tienen $U$, $\\Sigma$ y $V^T$ en la SVD completa?',
    options: ['$3\\times3$, $3\\times2$, $2\\times2$', '$3\\times2$, $2\\times2$, $2\\times3$', '$2\\times2$, $2\\times3$, $3\\times3$', 'Todas $3\\times2$'],
    answer: 0,
    explanation: '$U$ es $m\\times m$, $\\Sigma$ tiene la forma de $A$ ($m\\times n$) y $V^T$ es $n\\times n$. Por eso hay que crear $\\Sigma$ con ceros para reconstruir.',
  },
  {
    type: 'choice',
    prompt: '¿Qué propiedad tienen siempre los valores singulares $\\sigma_i$?',
    options: ['Pueden ser negativos o complejos', 'Son reales, $\\ge 0$, y se ordenan de mayor a menor', 'Siempre suman 1', 'Coinciden con los valores propios de $A$'],
    answer: 1,
    explanation: 'A diferencia de los valores propios, existen para toda matriz y nunca son negativos.',
  },
  {
    type: 'numeric',
    prompt: '¿Cuál es el menor valor singular de $\\begin{bmatrix}3&0\\\\0&-2\\end{bmatrix}$?',
    answer: 2,
    explanation: 'Estira un eje por 3 y el otro por 2 (además de invertirlo). Los valores singulares son 3 y 2: el signo se lo quedan $U$ o $V$.',
  },
  {
    type: 'numeric',
    prompt: 'La SVD de una matriz $3\\times3$ da $s = [16.8,\\ 1.07,\\ 4\\times10^{-16}]$. ¿Cuál es su rango?',
    answer: 2,
    tolerance: 0,
    explanation: 'El rango es el número de valores singulares no nulos; $4\\times10^{-16}$ es cero salvo por el redondeo.',
  },
  {
    type: 'choice',
    prompt: '¿Para qué sirve la pseudoinversa $A^+$?',
    options: [
      'Para invertir solo matrices diagonales',
      'Para "invertir" matrices no cuadradas o singulares; da la solución de mínimos cuadrados de $Ax = b$',
      'Para calcular valores propios',
      'Solo para comprimir imágenes',
    ],
    answer: 1,
    explanation: '$x = A^+b$ minimiza $\\|Ax - b\\|_2$. Es lo que hacen por dentro `lstsq` y `LinearRegression` (etapa «Regresión lineal»).',
  },
  {
    type: 'numeric',
    prompt: '¿Cuántos números hay que guardar para la aproximación de rango $k = 10$ de una matriz $100\\times200$? Se guardan $k$ columnas de $U$, $k$ valores singulares y $k$ filas de $V^T$.',
    answer: 3010,
    tolerance: 0,
    explanation: '$k\\,(m + n + 1) = 10\\cdot(100 + 200 + 1) = 3010$, frente a $20\\,000$ de la matriz completa (un 15 %).',
  },
  {
    type: 'choice',
    prompt: 'Geométricamente, la SVD dice que toda matriz…',
    options: ['es una rotación', 'equivale a girar, estirar los ejes y volver a girar', 'es simétrica', 'conserva las longitudes'],
    answer: 1,
    explanation: '$V^T$ gira (o refleja), $\\Sigma$ estira cada eje y $U$ vuelve a girar. Un círculo se convierte en una elipse de semiejes $\\sigma_i$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué relación hay entre los valores singulares de $A$ y la eigendescomposición?',
    options: [
      'Ninguna',
      '$\\sigma_i = \\sqrt{\\lambda_i}$, donde $\\lambda_i$ son los valores propios de $A^TA$',
      '$\\sigma_i = \\lambda_i^2$ de $A$',
    ],
    answer: 1,
    explanation: '$A^TA = V\\Sigma^2V^T$: los vectores singulares derechos son vectores propios de $A^TA$ y sus valores propios son $\\sigma_i^2$.',
  },
  {
    type: 'numeric',
    prompt: 'Los valores singulares de $A$ son 5 y 2. ¿Cuánto vale su norma espectral $\\|A\\|_2$?',
    answer: 5,
    explanation: 'La norma espectral es el mayor valor singular: lo máximo que $A$ puede estirar un vector de longitud 1.',
  },
  {
    type: 'numeric',
    prompt: 'Con los mismos valores singulares (5 y 2), ¿cuál es el número de condición $\\kappa(A)$?',
    answer: 2.5,
    explanation: '$\\kappa = \\sigma_{\\max}/\\sigma_{\\min} = 5/2 = 2.5$. Un $\\kappa$ enorme avisa de que resolver $Ax = b$ amplifica los errores.',
  },
  {
    type: 'choice',
    prompt: 'Una matriz de rango 3 con ruido tiene valores singulares $59, 48, 46, 6.9, 6.7, 6.2, \\dots$ ¿Qué $k$ elegirías para quitar el ruido con la SVD truncada?',
    options: ['$k = 1$', '$k = 3$', '$k = 6$', 'Todos'],
    answer: 1,
    explanation: 'Tras el tercero hay un salto (el «codo»): los demás son del tamaño del ruido.',
  },
]
