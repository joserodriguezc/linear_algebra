import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: 'Según el enfoque de este curso, ¿cuál es la mejor forma de aprender álgebra lineal para ML?',
    options: [
      'Empezar por las demostraciones y los teoremas abstractos',
      'De arriba abajo: estructuras de datos concretas y ejemplos que funcionan, y después la teoría que los explica',
      'Memorizar fórmulas sin programarlas',
      'Saltársela por completo',
    ],
    answer: 1,
    explanation: 'Se aprende antes y mejor viendo para qué sirve cada operación con código y datos reales. Por eso cada etapa combina intuición, código y fórmulas.',
  },
  {
    type: 'choice',
    prompt: 'En $\\hat{y} = Xb$, ¿qué representa $X$?',
    options: ['Un número', 'La matriz de datos: una fila por observación y una columna por característica', 'El vector de predicciones', 'La matriz identidad'],
    answer: 1,
    explanation: 'Las mayúsculas suelen indicar matrices y las minúsculas, vectores o escalares. $b$ son los coeficientes e $\\hat{y}$ las predicciones.',
  },
  {
    type: 'choice',
    prompt: '¿Qué significa $\\sum_{i=1}^{n} a_i b_i$?',
    options: ['El producto de todos los $a_i$', 'La suma de los productos $a_1b_1 + \\dots + a_nb_n$, es decir, el producto punto', 'La media de $a$', 'El máximo de $a_i b_i$'],
    answer: 1,
    explanation: 'Es la sumatoria de los productos elemento a elemento: el producto punto $a \\cdot b$, en NumPy `a @ b`.',
  },
  {
    type: 'choice',
    prompt: '¿Qué área del álgebra lineal se usa en PCA y en la SVD?',
    options: ['La factorización de matrices', 'Solo la suma de vectores', 'La geometría euclídea clásica', 'Ninguna'],
    answer: 0,
    explanation: 'PCA usa la eigendescomposición de la covarianza o la SVD de los datos: ambas son factorizaciones (etapas 14 a 18).',
  },
  {
    type: 'choice',
    prompt: '¿Qué problema resuelve el método de mínimos cuadrados?',
    options: [
      'Encontrar los valores propios',
      'Encontrar la solución "más cercana" de un sistema $Xb = y$ que no tiene solución exacta, como en la regresión lineal',
      'Comprimir imágenes',
      'Ordenar un dataset',
    ],
    answer: 1,
    explanation: 'Minimiza $\\|y - Xb\\|_2^2$, la suma de los errores al cuadrado (etapa 19).',
  },
  {
    type: 'choice',
    prompt: '¿Por qué se recomienda escribir el código "vectorizado" (`a @ b`) en lugar de bucles?',
    options: [
      'Solo por estética',
      'Porque es más corto, se parece a la notación matemática y es mucho más rápido (usa BLAS)',
      'Porque los bucles dan resultados distintos',
    ],
    answer: 1,
    explanation: 'En el laboratorio, el producto punto de 500 000 elementos es cientos de veces más rápido con NumPy que con un bucle de Python.',
  },
]
