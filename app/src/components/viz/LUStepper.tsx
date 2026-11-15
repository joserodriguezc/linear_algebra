import { useMemo, useState } from 'react'
import { fmt, luSteps, matMul, type Mat } from '../../lib/linalg'
import { Tex } from '../lesson/Tex'
import { MatrixGrid } from './MatrixGrid'

const PRESETS: Record<string, { label: string; A: Mat }> = {
  clasica: { label: 'Ejemplo clásico', A: [[2, 1, 1], [4, -6, 0], [-2, 7, 2]] },
  singular: { label: 'Matriz 1…9 (singular)', A: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
  pivote: { label: 'Pivote nulo', A: [[0, 1, 1], [1, 2, 3], [2, 1, 0]] },
}

/**
 * La descomposición LU es la eliminación gaussiana "con memoria": cada paso anula un
 * elemento bajo la diagonal de U y guarda el multiplicador usado en L.
 */
export function LUStepper() {
  const [preset, setPreset] = useState('clasica')
  const [k, setK] = useState(0)
  const A = PRESETS[preset].A
  const steps = useMemo(() => luSteps(A), [A])
  const s = steps[Math.min(k, steps.length - 1)]
  const last = k >= steps.length - 1
  const product = last && !s.error ? matMul(s.L, s.U) : null

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(PRESETS).map(([key, p]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setPreset(key)
              setK(0)
            }}
            className={`rounded-md border px-2 py-0.5 text-xs ${
              key === preset ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100' : 'border-slate-200 hover:border-brand-500 dark:border-slate-700'
            }`}
          >
            {p.label}
          </button>
        ))}
        <span className="mx-2 h-5 w-px bg-slate-200 dark:bg-slate-700" />
        <button
          type="button"
          disabled={k === 0}
          onClick={() => setK(k - 1)}
          className="rounded-md border border-slate-200 px-2 py-0.5 text-xs disabled:opacity-40 dark:border-slate-700"
        >
          ← Anterior
        </button>
        <button
          type="button"
          disabled={last}
          onClick={() => setK(k + 1)}
          className="rounded-md bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white disabled:opacity-40"
        >
          Siguiente paso →
        </button>
        <span className="text-xs text-slate-500">
          Paso {Math.min(k, steps.length - 1)} de {steps.length - 1}
        </span>
      </div>

      <div className="min-h-12 rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-900">
        {s.error ? (
          <p className="text-red-700 dark:text-red-400">{s.error}</p>
        ) : s.row === null ? (
          <p>Partimos de U = A y de L = I. Iremos anulando, columna a columna, los elementos bajo la diagonal de U.</p>
        ) : (
          <p>
            <Tex>{`m = \\frac{u_{${s.row + 1}${s.col! + 1}}}{u_{${s.pivotRow! + 1}${s.col! + 1}}} = ${fmt(s.multiplier!)}`}</Tex>
            {'  ⟹  '}
            <Tex>{`F_${s.row + 1} \\leftarrow F_${s.row + 1} - (${fmt(s.multiplier!)})\\,F_${s.pivotRow! + 1}`}</Tex>
            {'  y se guarda '}
            <Tex>{`\\ell_{${s.row + 1}${s.col! + 1}} = ${fmt(s.multiplier!)}`}</Tex>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <MatrixGrid
          values={s.L}
          label={<Tex>{'L'}</Tex>}
          dimZeros
          tone={(i, j) => (i === s.row && j === s.col ? 'c' : undefined)}
        />
        <span className="text-xl text-slate-400">·</span>
        <MatrixGrid
          values={s.U}
          label={<Tex>{'U'}</Tex>}
          dimZeros
          tone={(i, j) => (i === s.row ? (j === s.col ? 'c' : 'a') : i === s.pivotRow ? 'd' : undefined)}
        />
        <span className="text-xl text-slate-400">=</span>
        <MatrixGrid values={product ?? A} label={<Tex>{product ? 'LU = A\\ \\checkmark' : 'A'}</Tex>} />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Naranja: fila pivote. Azul: fila que se modifica. Verde: el elemento que se anula en U y el multiplicador que se guarda en
        la misma posición de L. En la práctica (SciPy) se intercambian filas para usar siempre el pivote mayor: A = P·L·U.
      </p>
    </div>
  )
}
