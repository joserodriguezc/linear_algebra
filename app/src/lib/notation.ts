/**
 * Glosario de notación matemática. `detectNotation(tex)` encuentra los símbolos presentes en una
 * fórmula LaTeX y devuelve su explicación, para que cada fórmula aclare qué significa, por ejemplo,
 * ℝⁿ ("vectores de n números reales") sin depender de que el autor lo recuerde.
 */

export interface NotationItem {
  /** Símbolo en LaTeX, tal como se mostrará. */
  tex: string
  meaning: string
}

interface Rule {
  re: RegExp
  explain: (m: RegExpExecArray) => NotationItem
}

/** Convierte un exponente LaTeX como `m\times n` en texto legible ("m × n"). */
const plainDims = (s: string) =>
  s
    .replace(/\\times/g, '×')
    .replace(/_\{?(\w)\}?/g, '$1')
    .replace(/[{}\s]/g, '')
    .replace(/×/g, ' × ')

const RULES: Rule[] = [
  {
    // ℝ^{m×n}, ℝ^{n_1×n_2×n_3}
    re: /\\mathbb\{R\}\^\{([^}]*\\times[^}]*(?:\}[^}]*)*?)\}(?=[^}]|$)/,
    explain: (m) => {
      const dims = plainDims(m[1])
      const k = dims.split('×').length
      return {
        tex: m[0],
        meaning: `el conjunto de ${k === 2 ? 'todas las matrices' : 'todos los tensores'} de tamaño ${dims} cuyos elementos son números reales (ℝ = los números reales)`,
      }
    },
  },
  {
    // ℝⁿ, ℝ^{n}
    re: /\\mathbb\{R\}\^\{?(\w)\}?/,
    explain: (m) => ({
      tex: m[0],
      meaning: `el conjunto de todos los vectores con ${m[1]} componentes, cada una un número real (ℝ = los números reales)`,
    }),
  },
  {
    re: /\\mathbb\{R\}(?!\^)/,
    explain: (m) => ({ tex: m[0], meaning: 'el conjunto de los números reales (enteros, decimales, negativos, √2, π…)' }),
  },
  { re: /\\in(?![a-z])/, explain: () => ({ tex: '\\in', meaning: '«pertenece a»: el objeto de la izquierda es un elemento del conjunto de la derecha' }) },
  { re: /\\\{/, explain: () => ({ tex: '\\{\\ \\}', meaning: 'llaves: definen un conjunto enumerando sus elementos' }) },
  { re: /\\cap/, explain: () => ({ tex: '\\cap', meaning: 'intersección: los elementos que están en ambos conjuntos' }) },
  {
    re: /\[\s*\w+\s*,\s*\w+\s*\)/,
    explain: (m) => ({ tex: m[0], meaning: 'intervalo semiabierto: incluye el extremo izquierdo y excluye el derecho' }),
  },
  { re: /\\sum/, explain: () => ({ tex: '\\sum', meaning: 'sumatoria: sumar los términos para cada valor del índice, desde el valor inferior hasta el superior' }) },
  { re: /\\prod/, explain: () => ({ tex: '\\prod', meaning: 'productorio: multiplicar los términos para cada valor del índice' }) },
  {
    re: /_\{?[ijkdp\d]{1,3}\}?/,
    explain: () => ({
      tex: 'a_{ij}',
      meaning: 'subíndices: indican qué elemento es o su posición (i = fila, j = columna, k = tercer eje o índice de una suma)',
    }),
  },
  { re: /\\(?:c|v|d|l)?dots/, explain: () => ({ tex: '\\dots', meaning: 'puntos suspensivos: los términos continúan siguiendo el mismo patrón' }) },
  { re: /\\\|/, explain: () => ({ tex: '\\|v\\|', meaning: 'norma: la longitud o magnitud del vector (el subíndice indica qué norma)' }) },
  { re: /(?<!\\)\|(?!\|)/, explain: () => ({ tex: '|x|', meaning: 'valor absoluto: el número sin signo (|−3| = 3)' }) },
  { re: /\\infty/, explain: () => ({ tex: '\\infty', meaning: 'infinito' }) },
  { re: /\\max/, explain: () => ({ tex: '\\max', meaning: 'máximo: el mayor de los valores indicados' }) },
  { re: /\\le(?![a-z])/, explain: () => ({ tex: '\\le', meaning: 'menor o igual que' }) },
  { re: /\\lor/, explain: () => ({ tex: '\\lor', meaning: '«o» lógico: basta con que se cumpla una de las condiciones' }) },
  { re: /\\(?:Long)?[Rr]ightarrow/, explain: () => ({ tex: '\\Rightarrow', meaning: '«implica»: si se cumple lo de la izquierda, se cumple lo de la derecha' }) },
  { re: /\\to(?![a-z])/, explain: () => ({ tex: '\\to', meaning: '«se convierte en» (o «tiende a», cuando se habla de un límite)' }) },
  { re: /\\times/, explain: () => ({ tex: '\\times', meaning: '«por»: multiplicación; en un tamaño se lee filas × columnas' }) },
  { re: /\\pm/, explain: () => ({ tex: '\\pm', meaning: '«más o menos»: la fórmula vale tanto con + como con −' }) },
  { re: /(?<!\^)\\circ(?![a-z])/, explain: () => ({ tex: '\\circ', meaning: 'producto de Hadamard: multiplicación elemento a elemento' }) },
  { re: /\\oslash/, explain: () => ({ tex: '\\oslash', meaning: 'división elemento a elemento' }) },
  { re: /\\otimes/, explain: () => ({ tex: '\\otimes', meaning: 'producto tensorial (exterior): cada elemento del primero multiplica a todo el segundo' }) },
  { re: /\\cdot(?!s)/, explain: () => ({ tex: '\\cdot', meaning: 'punto: producto escalar entre vectores, o simple multiplicación entre números' }) },
  { re: /\^T|\^\{T\}/, explain: () => ({ tex: 'A^T', meaning: 'transpuesta: las filas pasan a ser columnas' }) },
  { re: /\^\{-1\}/, explain: () => ({ tex: 'A^{-1}', meaning: 'inversa: la matriz que deshace A (A·A⁻¹ = I)' }) },
  { re: /(?<![a-zA-Z\\])I(?:_\w)?(?![a-zA-Z])/, explain: () => ({ tex: 'I', meaning: 'matriz identidad: unos en la diagonal y ceros fuera' }) },
  { re: /\\det/, explain: () => ({ tex: '\\det', meaning: 'determinante de la matriz' }) },
  { re: /\\operatorname\{tr\}/, explain: () => ({ tex: '\\operatorname{tr}', meaning: 'traza: suma de los elementos de la diagonal' }) },
  { re: /\\operatorname\{rank\}/, explain: () => ({ tex: '\\operatorname{rank}', meaning: 'rango: número de filas o columnas linealmente independientes' }) },
  { re: /\\operatorname\{nnz\}/, explain: () => ({ tex: '\\operatorname{nnz}', meaning: 'number of non-zeros: cantidad de elementos distintos de cero' }) },
  { re: /\\mathbb\{E\}/, explain: () => ({ tex: '\\mathbb{E}', meaning: 'esperanza o valor esperado: el promedio teórico (en una muestra, la media)' }) },
  { re: /\\operatorname\{Var\}/, explain: () => ({ tex: '\\operatorname{Var}', meaning: 'varianza: el promedio de las desviaciones al cuadrado respecto a la media' }) },
  {
    re: /\\operatorname\{[Cc]ov\}/,
    explain: () => ({ tex: '\\operatorname{cov}', meaning: 'covarianza: cuánto varían juntas dos variables (positiva si suben juntas, negativa si una sube cuando la otra baja)' }),
  },
  { re: /\\bar\{?\w/, explain: () => ({ tex: '\\bar{x}', meaning: '«x barra»: la media muestral de los valores de x' }) },
  { re: /\\mu/, explain: () => ({ tex: '\\mu', meaning: 'mu: la media (de una población o de cada columna de los datos)' }) },
  { re: /\\rho/, explain: () => ({ tex: '\\rho', meaning: 'rho: el coeficiente de correlación de Pearson, entre −1 y 1' }) },
  { re: /\\hat\{?\w/, explain: () => ({ tex: '\\hat{y}', meaning: '«y sombrero»: un valor estimado o predicho por el modelo' }) },
  { re: /\\operatorname\{arg\\?\s*min\}|\\arg\\?min|\\operatorname\*?\{argmin\}/, explain: () => ({ tex: '\\arg\\min', meaning: 'argumento mínimo: el valor de la variable que hace mínima la expresión' }) },
  { re: /\\arg\\?\s*max|\\operatorname\*?\{argmax\}/, explain: () => ({ tex: '\\arg\\max', meaning: 'argumento máximo: el valor de la variable que hace máxima la expresión' }) },
  { re: /\\min(?![a-z])/, explain: () => ({ tex: '\\min', meaning: 'mínimo: el menor de los valores indicados' }) },
  { re: /\\mathbf\{1\}/, explain: () => ({ tex: '\\mathbf{1}', meaning: 'vector de unos: (1, 1, …, 1)' }) },
  { re: /\\alpha/, explain: () => ({ tex: '\\alpha', meaning: 'alfa: un parámetro que se fija a mano (aquí, la fuerza de la regularización)' }) },
  { re: /\\leftarrow/, explain: () => ({ tex: '\\leftarrow', meaning: '«se reemplaza por»: lo de la izquierda pasa a valer lo de la derecha' }) },
  { re: /\\iff/, explain: () => ({ tex: '\\iff', meaning: '«si y solo si»: ambas afirmaciones son equivalentes' }) },
  { re: /\\ell/, explain: () => ({ tex: '\\ell_{ij}', meaning: 'ele cursiva: un elemento de la matriz L (en la LU, un multiplicador de la eliminación)' }) },
  { re: /\\lambda/, explain: () => ({ tex: '\\lambda', meaning: 'lambda: un valor propio (eigenvalor), el factor por el que la matriz estira su vector propio' }) },
  { re: /\\Lambda/, explain: () => ({ tex: '\\Lambda', meaning: 'lambda mayúscula: matriz diagonal con los valores propios en la diagonal' }) },
  {
    re: /\\Sigma/,
    explain: () => ({
      tex: '\\Sigma',
      meaning: 'sigma mayúscula: en la SVD, matriz diagonal con los valores singulares; en estadística, la matriz de covarianza',
    }),
  },
  {
    re: /\\sigma/,
    explain: () => ({ tex: '\\sigma', meaning: 'sigma minúscula: en la SVD, un valor singular (≥ 0); en estadística, la desviación estándar' }),
  },
  { re: /\^\{?\+\}?/, explain: () => ({ tex: 'A^+', meaning: 'pseudoinversa: generaliza la inversa a matrices no cuadradas o singulares' }) },
  { re: /\\approx/, explain: () => ({ tex: '\\approx', meaning: 'aproximadamente igual a' }) },
  { re: /\\neq?(?![a-z])/, explain: () => ({ tex: '\\neq', meaning: 'distinto de' }) },
  { re: /\\operatorname\{diag\}/, explain: () => ({ tex: '\\operatorname{diag}', meaning: 'matriz diagonal con esos valores en la diagonal' }) },
  { re: /\\sqrt/, explain: () => ({ tex: '\\sqrt{\\ }', meaning: 'raíz cuadrada' }) },
  { re: /(?<![a-zA-Z\\])O\(/, explain: () => ({ tex: 'O(\\cdot)', meaning: 'notación O grande: cómo crece el número de operaciones con el tamaño del problema' }) },
]

/** Devuelve las explicaciones de los símbolos presentes en `tex`, en orden de aparición y sin repetir. */
export function detectNotation(tex: string): NotationItem[] {
  const found: { pos: number; item: NotationItem }[] = []
  const seen = new Set<string>()
  let realHandled = false
  for (const rule of RULES) {
    const m = rule.re.exec(tex)
    if (!m) continue
    const item = rule.explain(m)
    // Si ya se explicó ℝⁿ o ℝ^{m×n}, no repetir "ℝ" a secas
    const isReal = item.tex.includes('\\mathbb{R}')
    if (isReal && realHandled) continue
    if (seen.has(item.tex)) continue
    if (isReal) realHandled = true
    seen.add(item.tex)
    found.push({ pos: m.index, item })
  }
  // Si aparece arg max / arg min, no explicar además max / min por separado
  const has = (t: string) => found.some((f) => f.item.tex === t)
  const redundant = new Set<string>([...(has('\\arg\\max') ? ['\\max'] : []), ...(has('\\arg\\min') ? ['\\min'] : [])])
  return found
    .filter((f) => !redundant.has(f.item.tex))
    .sort((a, b) => a.pos - b.pos)
    .map((f) => f.item)
}

/** Número de reglas del glosario (para comprobar que la página de referencia las cubre todas). */
export const NOTATION_RULE_COUNT = RULES.length

/** Fórmulas de muestra que, juntas, activan todas las reglas: alimentan el glosario de la página de referencia. */
const SAMPLES = [
  's \\in \\mathbb{R}',
  'v \\in \\mathbb{R}^n',
  'A \\in \\mathbb{R}^{m\\times n}',
  '\\{a, b\\} \\cap [a, b)',
  '\\sum_{i=1}^{n} a_{ij}',
  '\\prod_k n_k',
  'a_1, \\dots, a_n',
  '\\|v\\|_2 \\le |x|',
  '\\infty',
  '\\max_i x_i',
  '\\min(m, n)',
  'p \\lor q \\Rightarrow r',
  '(m, n) \\to (n, m)',
  'm \\times n',
  'a \\pm b',
  'a \\circ b,\\ a \\oslash b,\\ a \\otimes b,\\ a \\cdot b',
  'A^T,\\ A^{-1},\\ I',
  '\\det A,\\ \\operatorname{tr}(A),\\ \\operatorname{rank}(A),\\ \\operatorname{nnz}(A)',
  'O(n)',
  '\\mathbb{E}[X],\\ \\operatorname{Var}(x),\\ \\operatorname{cov}(x, y),\\ \\bar{x},\\ \\mu,\\ \\rho,\\ \\hat{y}',
  '\\arg\\max_q f',
  '\\arg\\min_b f',
  '\\mathbf{1},\\ \\alpha',
  'F_i \\leftarrow F_i - \\ell_{ik} F_k \\iff x',
  'Av = \\lambda v,\\ \\Lambda,\\ \\Sigma,\\ \\sigma_1,\\ A^+',
  'a \\approx b,\\ a \\neq b,\\ \\operatorname{diag}(d),\\ \\sqrt{x}',
]

/** Glosario completo y sin duplicados, en orden alfabético por significado. */
export function glossary(): NotationItem[] {
  const map = new Map<string, NotationItem>()
  for (const s of SAMPLES) for (const item of detectNotation(s)) if (!map.has(item.tex)) map.set(item.tex, item)
  return [...map.values()].sort((a, b) => a.meaning.localeCompare(b.meaning, 'es'))
}
