import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'numeric',
    prompt: 'Calcula $\\|v\\|_1$ para $v = (3, -4)$.',
    answer: 7,
    explanation: '$|3| + |-4| = 7$.',
  },
  {
    type: 'numeric',
    prompt: 'Calcula $\\|v\\|_2$ para $v = (3, -4)$.',
    answer: 5,
    explanation: '$\\sqrt{3^2 + (-4)^2} = \\sqrt{25} = 5$.',
  },
  {
    type: 'numeric',
    prompt: 'Calcula $\\|v\\|_\\infty$ para $v = (3, -4)$.',
    answer: 4,
    explanation: '$\\max(|3|, |-4|) = 4$.',
  },
  {
    type: 'numeric',
    prompt: 'Calcula la norma $L^2$ de $a = (1, 2, 3)$ (puedes escribir `sqrt(14)`).',
    answer: Math.sqrt(14),
    explanation: '$\\sqrt{1 + 4 + 9} = \\sqrt{14} \\approx 3.742$.',
  },
  {
    type: 'numeric',
    prompt: '¿Cuál es la distancia euclídea entre los puntos $(1, 1)$ y $(4, 5)$?',
    answer: 5,
    explanation: 'Es la norma $L^2$ de la diferencia $(3, 4)$: $\\sqrt{9 + 16} = 5$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué regularización tiende a dejar pesos exactamente en cero, haciendo selección de características?',
    options: ['Ridge (penaliza $\\|w\\|_2^2$)', 'Lasso (penaliza $\\|w\\|_1$)', 'Ninguna: ambas solo encogen los pesos'],
    answer: 1,
    explanation: 'La bola $L^1$ tiene esquinas sobre los ejes; el óptimo suele caer en una esquina, donde algunas coordenadas son 0.',
  },
  {
    type: 'choice',
    prompt: 'Para cualquier vector $v$, ¿qué desigualdad se cumple siempre?',
    options: [
      '$\\|v\\|_1 \\le \\|v\\|_2 \\le \\|v\\|_\\infty$',
      '$\\|v\\|_\\infty \\le \\|v\\|_2 \\le \\|v\\|_1$',
      '$\\|v\\|_2 \\le \\|v\\|_\\infty \\le \\|v\\|_1$',
    ],
    answer: 1,
    explanation: 'La máxima solo mira un componente, la $L^2$ los combina y la $L^1$ los suma todos en valor absoluto.',
  },
  {
    type: 'choice',
    prompt: '¿Qué norma calcula `numpy.linalg.norm(a)` sin más argumentos?',
    options: ['$L^1$', '$L^2$', '$L^\\infty$'],
    answer: 1,
    explanation: 'La euclídea ($L^2$) es la norma por defecto. Para las otras: `norm(a, 1)` y `norm(a, inf)`.',
  },
]
