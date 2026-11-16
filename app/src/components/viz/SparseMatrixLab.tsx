import { useMemo, useState } from 'react'
import { rng } from '../../lib/random'
import { toCSR } from '../../lib/sparse'
import { MatrixGrid } from './MatrixGrid'
import { Slider } from './controls'


const EJEMPLO = [
  [1, 0, 0, 1, 0, 0],
  [0, 0, 2, 0, 0, 1],
  [0, 0, 0, 2, 0, 0],
]

/** Edita una matriz pequeña (clic en las celdas) y observa su representación CSR. */
export function SparseCSR() {
  const [M, setM] = useState(EJEMPLO)
  const [hover, setHover] = useState<number | null>(null)
  const csr = toCSR(M)
  const nnz = csr.data.length
  const size = M.length * M[0].length
  const owner = hover !== null ? csr.owner[hover] : null

  const arr = (name: string, xs: number[], tone: string, hl?: (k: number) => boolean) => (
    <div className="flex flex-wrap items-center gap-1 font-mono text-xs">
      <span className="w-16 text-slate-500">{name}</span>
      {xs.map((x, k) => (
        <span
          key={k}
          onMouseEnter={() => name !== 'indptr' && setHover(k)}
          onMouseLeave={() => setHover(null)}
          className={`inline-flex h-7 min-w-7 items-center justify-center rounded border px-1 ${hl?.(k) ? tone : 'border-slate-200 dark:border-slate-700'}`}
        >
          {x}
        </span>
      ))}
    </div>
  )

  return (
    <div className="space-y-4">
      <MatrixGrid
        values={M}
        digits={0}
        dimZeros
        showIndices
        tone={(i, j) => (owner && owner[0] === i && owner[1] === j ? 'c' : M[i][j] !== 0 ? 'a' : undefined)}
        onCellClick={(i, j) => setM(M.map((r, a) => r.map((v, b) => (a === i && b === j ? (v + 1) % 4 : v))))}
      />
      <p className="text-sm">
        Elementos no nulos: <strong>{nnz}</strong> de {size} · dispersión = 1 − {nnz}/{size} ={' '}
        <strong>{(1 - nnz / size).toFixed(3)}</strong>
      </p>
      <div className="space-y-1.5">
        {arr('data', csr.data, 'border-emerald-500 bg-emerald-100 dark:bg-emerald-500/25', (k) => k === hover)}
        {arr('indices', csr.indices, 'border-emerald-500 bg-emerald-100 dark:bg-emerald-500/25', (k) => k === hover)}
        {arr('indptr', csr.indptr, 'border-amber-500 bg-amber-100 dark:bg-amber-500/25', (k) => owner !== null && (k === owner[0] || k === owner[0] + 1))}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Haz clic en una celda para cambiar su valor (0→1→2→3→0). Pasa el ratón sobre <span className="font-mono">data</span> para ver
        de qué celda viene. <span className="font-mono">data</span> guarda los valores no nulos fila a fila,{' '}
        <span className="font-mono">indices</span> su columna, e <span className="font-mono">indptr[i]:indptr[i+1]</span> delimita qué
        tramo de <span className="font-mono">data</span> pertenece a la fila i.
      </p>
    </div>
  )
}

/** Matriz grande aleatoria: compara la memoria del formato denso con CSR según la densidad. */
export function SparsityHeatmap({ rows = 40, cols = 80 }: { rows?: number; cols?: number }) {
  const [density, setDensity] = useState(0.05)
  const seedVals = useMemo(() => {
    const r = rng(42)
    return Array.from({ length: rows * cols }, () => r.next())
  }, [rows, cols])
  const mask = seedVals.map((r) => r < density)
  const nnz = mask.filter(Boolean).length
  const dense = rows * cols * 8
  const csr = nnz * (8 + 4) + (rows + 1) * 4
  const cell = 6
  const kb = (b: number) => `${(b / 1024).toFixed(1)} KB`
  return (
    <div className="space-y-3">
      <Slider label="densidad" value={density} min={0.01} max={0.8} step={0.01} onChange={setDensity} />
      <svg viewBox={`0 0 ${cols * cell} ${rows * cell}`} className="w-full rounded border border-slate-200 dark:border-slate-800" role="img" aria-label="Mapa de calor de una matriz dispersa">
        {mask.map((on, k) =>
          on ? <rect key={k} x={(k % cols) * cell} y={Math.floor(k / cols) * cell} width={cell} height={cell} fill="var(--viz-a)" /> : null,
        )}
      </svg>
      <div className="grid gap-1 text-sm sm:grid-cols-3">
        <p>
          Dispersión: <strong>{(1 - nnz / (rows * cols)).toFixed(2)}</strong>
        </p>
        <p>
          Densa (float64): <strong>{kb(dense)}</strong>
        </p>
        <p>
          CSR: <strong className={csr < dense ? 'text-emerald-600' : 'text-red-600'}>{kb(csr)}</strong>
        </p>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        CSR guarda 12 bytes por valor no nulo (valor + índice de columna) más un puntero por fila. Con más de ~2/3 (67 %) de valores no nulos,
        deja de compensar frente a la matriz densa.
      </p>
    </div>
  )
}
