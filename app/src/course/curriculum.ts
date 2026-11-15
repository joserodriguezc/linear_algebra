import type { ComponentType } from 'react'

export interface Part {
  id: number
  title: string
  description: string
}

export interface Stage {
  /** Número de etapa (orden en el curso). */
  id: number
  slug: string
  title: string
  part: number
  summary: string
  objectives: string[]
}

export const parts: Part[] = [
  {
    id: 1,
    title: 'Fundamentos',
    description: 'Qué es el álgebra lineal y por qué es el lenguaje de los datos en machine learning.',
  },
  {
    id: 2,
    title: 'NumPy',
    description: 'Crear, indexar, transformar y combinar arrays: la estructura de datos de todo el curso.',
  },
  {
    id: 3,
    title: 'Matrices',
    description: 'Vectores, normas, matrices, sus tipos y operaciones, matrices dispersas y tensores.',
  },
  {
    id: 4,
    title: 'Factorización',
    description: 'Descomponer matrices: LU, QR, Cholesky, eigendescomposición y SVD.',
  },
  {
    id: 5,
    title: 'Estadística',
    description: 'Estadística multivariada, PCA y regresión lineal desde el álgebra lineal.',
  },
]

export const stages: Stage[] = [
  {
    id: 1,
    slug: 'introduccion',
    title: 'Introducción al álgebra lineal',
    part: 1,
    summary: 'Ecuaciones lineales, álgebra lineal numérica y su relación con la estadística.',
    objectives: [
      'Explicar qué es el álgebra lineal y qué estudia',
      'Ver un sistema de ecuaciones como una intersección de rectas',
      'Entender por qué importa la precisión numérica en el computador',
    ],
  },
  {
    id: 2,
    slug: 'algebra-lineal-y-ml',
    title: 'Álgebra lineal y machine learning',
    part: 1,
    summary: 'Qué partes del álgebra lineal necesitas realmente para machine learning.',
    objectives: [
      'Leer la notación de vectores y matrices',
      'Reconocer las áreas clave: aritmética, estadística, factorización y mínimos cuadrados',
    ],
  },
  {
    id: 3,
    slug: 'ejemplos-en-ml',
    title: 'Ejemplos de álgebra lineal en ML',
    part: 1,
    summary: 'Datasets, imágenes, one-hot, regresión, PCA, SVD, LSA, recomendadores y deep learning.',
    objectives: [
      'Ver un dataset y una imagen como matrices',
      'Construir una codificación one-hot',
      'Identificar el álgebra lineal detrás de métodos populares de ML',
    ],
  },
  {
    id: 4,
    slug: 'arrays-numpy',
    title: 'Introducción a los arrays de NumPy',
    part: 2,
    summary: 'El ndarray: forma, tipo, funciones de creación y combinación de arrays.',
    objectives: [
      'Crear arrays con array, empty, zeros y ones',
      'Leer shape y dtype',
      'Combinar arrays con vstack y hstack',
    ],
  },
  {
    id: 5,
    slug: 'indexado-slicing-reshape',
    title: 'Indexado, slicing y reshape',
    part: 2,
    summary: 'Acceder a elementos, separar X e y, y cambiar la forma de los arrays.',
    objectives: [
      'Convertir listas en arrays 1D y 2D',
      'Indexar y hacer slicing, incluido separar entradas y salida',
      'Cambiar la forma de un array (reshape) para modelos que esperan 3D',
    ],
  },
  {
    id: 6,
    slug: 'broadcasting',
    title: 'Broadcasting en NumPy',
    part: 2,
    summary: 'Operar arrays de formas distintas y saber cuándo no es posible.',
    objectives: [
      'Explicar la regla de broadcasting',
      'Predecir la forma del resultado',
      'Reconocer cuándo falla el broadcasting',
    ],
  },
  {
    id: 7,
    slug: 'vectores',
    title: 'Vectores y aritmética vectorial',
    part: 3,
    summary: 'Qué es un vector, cómo se suman y escalan, y el producto punto.',
    objectives: [
      'Interpretar un vector como punto, flecha y fila de datos',
      'Sumar, restar, multiplicar y dividir vectores elemento a elemento',
      'Calcular el producto punto e interpretarlo geométricamente',
    ],
  },
  {
    id: 8,
    slug: 'normas',
    title: 'Normas vectoriales',
    part: 3,
    summary: 'Medir el tamaño de un vector: normas L1, L2 y máxima.',
    objectives: [
      'Calcular las normas L1, L2 y max',
      'Relacionar cada norma con una forma de medir distancias',
      'Entender su papel en la regularización',
    ],
  },
  {
    id: 9,
    slug: 'matrices',
    title: 'Matrices y aritmética matricial',
    part: 3,
    summary: 'Operaciones entre matrices, producto matricial y matriz como transformación.',
    objectives: [
      'Sumar, restar y multiplicar matrices elemento a elemento',
      'Calcular el producto matriz-matriz y matriz-vector',
      'Ver una matriz como una transformación del plano',
    ],
  },
  {
    id: 10,
    slug: 'tipos-de-matrices',
    title: 'Tipos de matrices',
    part: 3,
    summary: 'Cuadradas, simétricas, triangulares, diagonales, identidad y ortogonales.',
    objectives: [
      'Reconocer cada tipo de matriz por su estructura',
      'Construirlas en NumPy',
      'Entender qué hace geométricamente una matriz ortogonal',
    ],
  },
  {
    id: 11,
    slug: 'operaciones-matriciales',
    title: 'Operaciones matriciales',
    part: 3,
    summary: 'Transpuesta, inversa, traza, determinante y rango.',
    objectives: [
      'Calcular transpuesta, inversa y traza',
      'Interpretar el determinante como factor de área',
      'Entender el rango como dimensión del espacio generado',
    ],
  },
  {
    id: 12,
    slug: 'matrices-dispersas',
    title: 'Matrices dispersas',
    part: 3,
    summary: 'Matrices con mayoría de ceros, formatos de almacenamiento y SciPy.',
    objectives: [
      'Calcular la dispersión (sparsity) de una matriz',
      'Entender el formato CSR',
      'Usar scipy.sparse para convertir entre denso y disperso',
    ],
  },
  {
    id: 13,
    slug: 'tensores',
    title: 'Tensores y aritmética tensorial',
    part: 3,
    summary: 'Generalizar vectores y matrices a n dimensiones.',
    objectives: [
      'Crear y leer tensores de 3 dimensiones',
      'Aplicar operaciones elemento a elemento',
      'Calcular el producto tensorial',
    ],
  },
  {
    id: 14,
    slug: 'descomposiciones',
    title: 'Descomposiciones matriciales',
    part: 4,
    summary: 'LU, QR y Cholesky: factorizar para resolver con eficiencia y estabilidad.',
    objectives: [
      'Calcular e interpretar la descomposición LU',
      'Entender QR como ortogonalización',
      'Saber cuándo aplicar Cholesky',
    ],
  },
  {
    id: 15,
    slug: 'eigendescomposicion',
    title: 'Eigendescomposición',
    part: 4,
    summary: 'Vectores y valores propios: las direcciones que una matriz solo estira.',
    objectives: [
      'Entender geométricamente un vector propio',
      'Calcular eigenvalores y eigenvectores',
      'Reconstruir la matriz original',
    ],
  },
  {
    id: 16,
    slug: 'svd',
    title: 'Descomposición en valores singulares (SVD)',
    part: 4,
    summary: 'Toda matriz es rotación · escalado · rotación; pseudoinversa y reducción de dimensión.',
    objectives: [
      'Calcular la SVD e interpretar U, Σ y Vᵀ',
      'Calcular la pseudoinversa',
      'Reducir dimensionalidad con SVD truncada',
    ],
  },
  {
    id: 17,
    slug: 'estadistica-multivariada',
    title: 'Estadística multivariada',
    part: 5,
    summary: 'Media, varianza, covarianza, correlación y matriz de covarianza.',
    objectives: [
      'Calcular media, varianza y desviación estándar con NumPy',
      'Interpretar covarianza y correlación',
      'Construir e interpretar la matriz de covarianza',
    ],
  },
  {
    id: 18,
    slug: 'pca',
    title: 'Análisis de componentes principales (PCA)',
    part: 5,
    summary: 'Reducir dimensiones proyectando sobre las direcciones de máxima varianza.',
    objectives: [
      'Calcular PCA paso a paso con NumPy',
      'Interpretar componentes y varianza explicada',
      'Usar PCA de scikit-learn',
    ],
  },
  {
    id: 19,
    slug: 'regresion-lineal',
    title: 'Regresión lineal',
    part: 5,
    summary: 'Mínimos cuadrados en forma matricial: inversa, QR, SVD y lstsq.',
    objectives: [
      'Escribir la regresión lineal como y = Xb',
      'Resolver por ecuación normal, QR y pseudoinversa',
      'Comparar la estabilidad numérica de cada método',
    ],
  },
]

type MdxModule = { default: ComponentType }

const stageModules = import.meta.glob<MdxModule>('./stages/*.mdx')

/** Devuelve el cargador del MDX de la etapa, o undefined si aún no existe. */
export function stageLoader(stage: Stage): (() => Promise<MdxModule>) | undefined {
  const key = `./stages/${String(stage.id).padStart(2, '0')}-${stage.slug}.mdx`
  return stageModules[key]
}

export function getStage(slug: string | undefined): Stage | undefined {
  return stages.find((s) => s.slug === slug)
}

export function neighbors(stage: Stage): { prev?: Stage; next?: Stage } {
  const i = stages.findIndex((s) => s.id === stage.id)
  return { prev: stages[i - 1], next: stages[i + 1] }
}
