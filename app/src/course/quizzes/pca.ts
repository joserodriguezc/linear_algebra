import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'choice',
    prompt: '¿Cuál es el orden correcto de los pasos de PCA?',
    options: [
      'Covarianza → centrar → proyectar → eigendescomposición',
      'Centrar → covarianza → eigendescomposición → proyectar',
      'Proyectar → centrar → covarianza → eigendescomposición',
      'Eigendescomposición → centrar → covarianza → proyectar',
    ],
    answer: 1,
    explanation: 'Se resta la media, se calcula $\\Sigma$, se obtienen sus vectores propios (las componentes) y se proyectan los datos centrados sobre ellos.',
  },
  {
    type: 'choice',
    prompt: '¿Qué es la primera componente principal (PC1)?',
    options: [
      'La primera columna del dataset',
      'La dirección de máxima varianza: el vector propio de $\\Sigma$ con mayor valor propio',
      'La media de los datos',
      'La variable con mayor correlación con la salida',
    ],
    answer: 1,
    explanation: 'Al proyectar los datos sobre PC1, la varianza de las proyecciones es la máxima posible, y vale $\\lambda_1$.',
  },
  {
    type: 'numeric',
    prompt: 'Si los valores propios de la matriz de covarianza son $\\lambda_1 = 8$ y $\\lambda_2 = 2$, ¿qué fracción de la varianza explica PC1? (entre 0 y 1)',
    answer: 0.8,
    explanation: '$\\lambda_1 / (\\lambda_1 + \\lambda_2) = 8/10 = 0.8$, es decir, el 80 %.',
  },
  {
    type: 'numeric',
    prompt: 'PC1 es $\\tfrac{1}{\\sqrt2}(1, 1)$. ¿Cuál es la coordenada (score) en PC1 del punto centrado $(2, 2)$? (puedes escribir `2√2`)',
    answer: 2 * Math.SQRT2,
    explanation: 'Es el producto punto con la componente: $\\tfrac{1}{\\sqrt2}(2 + 2) = \\tfrac{4}{\\sqrt2} = 2\\sqrt2 \\approx 2.83$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué forma tiene `PCA(n_components=2).fit_transform(X)` si `X` es `(150, 4)`?',
    options: ['`(150, 4)`', '`(2, 4)`', '`(150, 2)`', '`(4, 2)`'],
    answer: 2,
    explanation: 'Cada una de las 150 muestras pasa a describirse con 2 coordenadas. `pca.components_` sí tiene forma `(2, 4)`.',
  },
  {
    type: 'choice',
    prompt: 'Si una variable está en metros y otra en milímetros, antes de PCA conviene…',
    options: ['No hacer nada', 'Estandarizar (media 0 y desviación 1 por columna)', 'Ordenar las filas', 'Eliminar la variable en milímetros'],
    answer: 1,
    explanation: 'PCA busca varianza: la variable con números más grandes dominaría solo por sus unidades. `StandardScaler` lo evita.',
  },
  {
    type: 'choice',
    prompt: '¿Por qué las componentes principales son perpendiculares entre sí?',
    options: [
      'Por casualidad',
      'Porque son vectores propios de $\\Sigma$, que es simétrica (teorema espectral)',
      'Porque los datos están centrados',
      'Porque se normalizan a longitud 1',
    ],
    answer: 1,
    explanation: 'Las matrices simétricas tienen vectores propios ortogonales, así que las nuevas coordenadas no están correlacionadas entre sí.',
  },
  {
    type: 'numeric',
    prompt: 'Los valores propios de la covarianza son $5$, $2$ y $1$. Si te quedas con 1 componente, ¿cuánta varianza pierdes (la suma de los $\\lambda$ descartados)?',
    answer: 3,
    explanation: 'El error de reconstrucción es proporcional a $\\lambda_2 + \\lambda_3 = 2 + 1 = 3$: la varianza de las direcciones descartadas.',
  },
  {
    type: 'choice',
    prompt: '¿Qué diferencia principal hay entre PCA y LDA?',
    options: [
      'Ninguna: dan siempre la misma dirección',
      'PCA maximiza la varianza sin usar etiquetas; LDA usa las etiquetas para maximizar la separación entre clases',
      'LDA no usa álgebra lineal',
      'PCA solo funciona con dos clases',
    ],
    answer: 1,
    explanation: 'PCA resuelve $\\Sigma v = \\lambda v$; LDA resuelve el problema generalizado $S_Bw = \\lambda S_Ww$.',
  },
  {
    type: 'numeric',
    prompt: 'Con LDA sobre un dataset de 4 clases y 10 características, ¿cuántas direcciones discriminantes útiles hay como máximo?',
    answer: 3,
    tolerance: 0,
    explanation: '$S_B$ es suma de $C$ matrices de rango 1 ligadas por la media global: tiene rango como mucho $C - 1 = 3$.',
  },
  {
    type: 'numeric',
    prompt: 'Datos de puro ruido con varianza $\\sigma^2 = 1$, $p = 100$ variables y $n = 400$ muestras. Según Marchenko-Pastur, ¿hasta qué valor llegan los valores propios de la covarianza? ($\\lambda_+$)',
    answer: 2.25,
    tolerance: 0.01,
    explanation: '$\\gamma = 100/400 = 0.25$ y $\\lambda_+ = (1 + \\sqrt{0.25})^2 = 1.5^2 = 2.25$. Un valor propio de 1.8 en esos datos no sería señal.',
  },
]
