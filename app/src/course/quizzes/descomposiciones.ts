import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: 'En la descomposición $A = LU$, ¿qué son $L$ y $U$?',
    options: [
      '$L$ triangular inferior y $U$ triangular superior',
      '$L$ ortogonal y $U$ triangular superior',
      '$L$ diagonal y $U$ simétrica',
      '$L$ y $U$ son dos matrices ortogonales',
    ],
    answer: 0,
    explanation: 'Lower (inferior) y Upper (superior). $U$ es el resultado de la eliminación gaussiana y $L$ guarda los multiplicadores.',
  },
  {
    type: 'matrix',
    prompt: 'Calcula $U$ en la descomposición LU de $A = \\begin{bmatrix}2&1\\\\4&5\\end{bmatrix}$ (sin pivoteo).',
    answer: [
      [2, 1],
      [0, 3],
    ],
    explanation: 'Multiplicador $m = 4/2 = 2$; $F_2 \\leftarrow F_2 - 2F_1 = (4-4,\\ 5-2) = (0, 3)$.',
  },
  {
    type: 'numeric',
    prompt: 'En la misma descomposición, ¿cuánto vale el elemento $\\ell_{21}$ de $L$?',
    answer: 2,
    explanation: '$L$ guarda el multiplicador usado para anular $a_{21}$: $\\ell_{21} = 2$, así que $L = \\begin{bmatrix}1&0\\\\2&1\\end{bmatrix}$.',
  },
  {
    type: 'numeric',
    prompt: 'Usando esa LU, calcula $\\det A$ (pista: el determinante de una triangular es el producto de su diagonal).',
    answer: 6,
    explanation: '$\\det A = \\det L \\cdot \\det U = 1 \\cdot (2 \\cdot 3) = 6$. Comprobación: $2\\cdot5 - 1\\cdot4 = 6$.',
  },
  {
    type: 'choice',
    prompt: 'En $A = QR$, ¿qué propiedad tienen las columnas de $Q$?',
    options: ['Son las columnas de $A$ ordenadas', 'Son ortonormales: longitud 1 y perpendiculares entre sí', 'Son vectores propios de $A$', 'Suman 1'],
    answer: 1,
    explanation: 'Gram-Schmidt convierte las columnas de $A$ en una base ortonormal de las mismas direcciones; $R$ guarda los coeficientes.',
  },
  {
    type: 'numeric',
    prompt: 'En Gram-Schmidt, si la primera columna es $a_1 = (3, 4)$, ¿cuánto vale $r_{11} = \\|a_1\\|$?',
    answer: 5,
    explanation: '$\\sqrt{3^2 + 4^2} = 5$, y $q_1 = a_1 / 5 = (0.6, 0.8)$.',
  },
  {
    type: 'choice',
    prompt: '¿A qué matrices se puede aplicar la descomposición de Cholesky $A = LL^T$?',
    options: ['A cualquier matriz cuadrada', 'A matrices simétricas y definidas positivas', 'Solo a matrices diagonales', 'A matrices rectangulares'],
    answer: 1,
    explanation: 'Necesita simetría y que todos los valores propios sean positivos. A cambio es unas dos veces más rápida que LU.',
  },
  {
    type: 'choice',
    prompt: '¿Por qué es útil factorizar $A = LU$ si hay que resolver $Ax = b$ para muchos vectores $b$ distintos?',
    options: [
      'Porque LU da la inversa exacta',
      'Porque la factorización (lo caro) se hace una vez y cada sistema triangular se resuelve muy rápido',
      'Porque evita los errores de redondeo por completo',
    ],
    answer: 1,
    explanation: 'Factorizar cuesta $O(n^3)$; después, cada resolución con dos sistemas triangulares solo cuesta $O(n^2)$.',
  },
]
