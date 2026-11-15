import { useState } from 'react'
import { matMul, transpose, type Mat } from '../../lib/linalg'
import { MatrixGrid, type CellTone } from './MatrixGrid'

const M3: Mat = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
]

const TYPES: Record<string, { label: string; m: Mat; code: string; tone?: (i: number, j: number) => CellTone | undefined; note: string }> = {
  cuadrada: {
    label: 'Cuadrada',
    m: M3,
    code: 'M = array([[1, 2, 3], [1, 2, 3], [1, 2, 3]])',
    tone: (i, j) => (i === j ? 'd' : undefined),
    note: 'Mismo número de filas que de columnas (n×n). Sus elementos a_ii forman la diagonal principal (resaltada).',
  },
  simetrica: {
    label: 'Simétrica',
    m: [
      [1, 2, 3, 4, 5],
      [2, 1, 2, 3, 4],
      [3, 2, 1, 2, 3],
      [4, 3, 2, 1, 2],
      [5, 4, 3, 2, 1],
    ],
    code: 'M == M.T  # True para todos los elementos',
    tone: (i, j) => (i < j ? 'a' : i > j ? 'b' : 'd'),
    note: 'Es igual a su transpuesta: a_ij = a_ji. El triángulo superior (azul) es el espejo del inferior (rojo). Las matrices de covarianza son simétricas.',
  },
  inferior: {
    label: 'Triangular inferior',
    m: [
      [1, 0, 0],
      [1, 2, 0],
      [1, 2, 3],
    ],
    code: 'lower = tril(M)',
    tone: (i, j) => (i >= j ? 'c' : undefined),
    note: 'Ceros por encima de la diagonal. Aparece en las descomposiciones LU y Cholesky.',
  },
  superior: {
    label: 'Triangular superior',
    m: [
      [1, 2, 3],
      [0, 2, 3],
      [0, 0, 3],
    ],
    code: 'upper = triu(M)',
    tone: (i, j) => (i <= j ? 'c' : undefined),
    note: 'Ceros por debajo de la diagonal. Los sistemas triangulares se resuelven fácilmente por sustitución.',
  },
  diagonal: {
    label: 'Diagonal',
    m: [
      [1, 0, 0],
      [0, 2, 0],
      [0, 0, 3],
    ],
    code: 'd = diag(M)   # vector [1 2 3]\nD = diag(d)   # matriz diagonal',
    tone: (i, j) => (i === j ? 'd' : undefined),
    note: 'Solo la diagonal es distinta de cero. Multiplicar por una diagonal escala cada eje por separado.',
  },
  identidad: {
    label: 'Identidad',
    m: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    code: 'I = identity(3)',
    tone: (i, j) => (i === j ? 'd' : undefined),
    note: 'Diagonal de unos: I·v = v. Es el "1" de las matrices; A·A⁻¹ = I.',
  },
  ortogonal: {
    label: 'Ortogonal',
    m: [
      [0.6, -0.8],
      [0.8, 0.6],
    ],
    code: 'Q.T @ Q   # = I  ->  inv(Q) = Q.T',
    tone: (_, j) => (j === 0 ? 'a' : 'b'),
    note: 'Sus columnas son vectores unitarios y perpendiculares entre sí: QᵀQ = I, así que la inversa es simplemente la transpuesta. Geométricamente rota o refleja sin deformar.',
  },
}

const eq = (a: number, b: number) => Math.abs(a - b) < 1e-9

function properties(M: Mat) {
  const n = M.length
  const square = M.every((r) => r.length === n)
  const all = (f: (i: number, j: number) => boolean) => M.every((r, i) => r.every((_, j) => f(i, j)))
  const symmetric = square && all((i, j) => eq(M[i][j], M[j][i]))
  const lower = square && all((i, j) => j <= i || eq(M[i][j], 0))
  const upper = square && all((i, j) => j >= i || eq(M[i][j], 0))
  const identity = square && all((i, j) => eq(M[i][j], i === j ? 1 : 0))
  const QtQ = square ? matMul(transpose(M), M) : null
  const orthogonal = !!QtQ && QtQ.every((r, i) => r.every((v, j) => Math.abs(v - (i === j ? 1 : 0)) < 1e-6))
  return [
    ['cuadrada', square],
    ['simétrica', symmetric],
    ['triangular inferior', lower],
    ['triangular superior', upper],
    ['diagonal', lower && upper],
    ['identidad', identity],
    ['ortogonal', orthogonal],
  ] as const
}

export function MatrixTypeGallery() {
  const [type, setType] = useState('simetrica')
  const t = TYPES[type]
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(TYPES).map(([k, v]) => (
          <button
            key={k}
            type="button"
            onClick={() => setType(k)}
            className={`rounded-md border px-2 py-0.5 text-xs ${
              k === type ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100' : 'border-slate-200 hover:border-brand-500 dark:border-slate-700'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-8">
        <MatrixGrid values={t.m} tone={t.tone} dimZeros showIndices digits={2} />
        <div className="min-w-52 space-y-2 text-sm">
          <ul className="space-y-0.5">
            {properties(t.m).map(([name, ok]) => (
              <li key={name} className={ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}>
                {ok ? '✓' : '✗'} {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-sm">{t.note}</p>
      <pre className="rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs dark:bg-slate-900">{t.code}</pre>
    </div>
  )
}
