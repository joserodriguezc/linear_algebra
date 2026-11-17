import { useState } from 'react'
import { fmt, matMul, type Mat } from '../../lib/linalg'
import { Tex } from '../lesson/Tex'
import { MatrixGrid } from './MatrixGrid'
import { Segmented, Slider } from './controls'

const PRESETS: Record<string, { label: string; A: Mat; B: Mat }> = {
  basico: {
    label: 'A (3×2) · B (2×2)',
    A: [[1, 2], [3, 4], [5, 6]],
    B: [[1, 2], [3, 4]],
  },
  vector: {
    label: 'Matriz · vector',
    A: [[1, 2], [3, 4], [5, 6]],
    B: [[0.5], [0.5]],
  },
  fila: {
    label: 'Fila · columna (= producto punto)',
    A: [[1, 2, 3]],
    B: [[4], [5], [6]],
  },
  datos: {
    label: 'Datos · pesos',
    A: [[120, 3], [80, 2], [200, 5]],
    B: [[1.5], [8]],
  },
}

const rand = () => Math.floor(Math.random() * 7) - 3

type Mode = 'filas' | 'capas'

/**
 * Dos lecturas del producto matricial:
 * - «fila × columna»: cada celda de C es el producto punto de una fila de A con una columna de B;
 * - «columna × fila»: C es la suma de n matrices de rango 1, a_k b_kᵀ (columna k de A por fila k de B).
 */
export function MatMulVisualizer({ initial = 'basico', initialMode = 'filas' }: { initial?: keyof typeof PRESETS; initialMode?: Mode }) {
  const [A, setA] = useState<Mat>(PRESETS[initial].A)
  const [B, setB] = useState<Mat>(PRESETS[initial].B)
  const [cell, setCell] = useState<[number, number] | null>([0, 0])
  const [mode, setMode] = useState<Mode>(initialMode)
  const [m, n] = [A.length, A[0].length]
  const p = B[0].length
  const [layers, setLayers] = useState(n)
  const shown = Math.min(layers, n)
  const C = matMul(A, B)
  const [i, j] = cell ?? [-1, -1]
  const outer = (k: number): Mat => A.map((row) => B[k].map((b) => row[k] * b))
  const partial: Mat = A.map((_, r) => B[0].map((_, c) => A[r].slice(0, shown).reduce((s, a, k) => s + a * B[k][c], 0)))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(PRESETS).map(([k, pr]) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              setA(pr.A)
              setB(pr.B)
              setCell([0, 0])
              setLayers(pr.A[0].length)
            }}
            className="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:border-brand-500 dark:border-slate-700"
          >
            {pr.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            const mm = 2 + Math.floor(Math.random() * 2)
            const nn = 2 + Math.floor(Math.random() * 2)
            const pp = 1 + Math.floor(Math.random() * 3)
            setA(Array.from({ length: mm }, () => Array.from({ length: nn }, rand)))
            setB(Array.from({ length: nn }, () => Array.from({ length: pp }, rand)))
            setCell([0, 0])
            setLayers(nn)
          }}
          className="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:border-brand-500 dark:border-slate-700"
        >
          🎲 Aleatorio
        </button>
      </div>
      <Segmented
        value={mode}
        onChange={setMode}
        options={[
          { value: 'filas', label: 'Fila × columna (productos punto)' },
          { value: 'capas', label: 'Columna × fila (suma de rango 1)' },
        ]}
      />
      {mode === 'capas' ? (
        <div className="space-y-3">
          <Slider label="capas sumadas" value={shown} min={1} max={n} step={1} onChange={setLayers} />
          <div className="flex flex-wrap items-center gap-3">
            {Array.from({ length: n }, (_, k) => (
              <div key={k} className={`flex items-center gap-1 ${k < shown ? '' : 'opacity-30'}`}>
                {k > 0 && <span className="text-xl text-slate-400">+</span>}
                <MatrixGrid values={A.map((r) => [r[k]])} size="sm" digits={2} tone={() => 'a'} label={<Tex>{`a_{${k + 1}}`}</Tex>} />
                <MatrixGrid values={[B[k]]} size="sm" digits={2} tone={() => 'b'} label={<Tex>{`b_{${k + 1}}^T`}</Tex>} />
                <span className="text-slate-400">=</span>
                <MatrixGrid values={outer(k)} size="sm" digits={2} tone={() => 'd'} label={<span className="text-xs">rango 1</span>} />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <MatrixGrid values={partial} digits={2} tone={() => (shown === n ? 'c' : undefined)} label={<Tex>{`\\sum_{k=1}^{${shown}} a_k b_k^T`}</Tex>} />
            {shown === n && <span className="text-sm text-emerald-700 dark:text-emerald-400">= AB ✓</span>}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Columna k de A por fila k de B da una matriz de rango 1 (todas sus filas son múltiplos de la misma). Sumando las {n} capas se
            obtiene AB. Es la misma idea que la SVD: A = σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ + …, ordenando las capas de más a menos importante.
          </p>
        </div>
      ) : (
      <>
      <div className="flex flex-wrap items-center gap-4">
        <MatrixGrid values={A} digits={2} tone={(r) => (r === i ? 'a' : undefined)} label={<Tex>{`A_{${m}\\times ${n}}`}</Tex>} />
        <span className="text-xl text-slate-400">·</span>
        <MatrixGrid values={B} digits={2} tone={(_, c) => (c === j ? 'b' : undefined)} label={<Tex>{`B_{${n}\\times ${p}}`}</Tex>} />
        <span className="text-xl text-slate-400">=</span>
        <MatrixGrid
          values={C}
          digits={2}
          tone={(r, c) => (r === i && c === j ? 'c' : undefined)}
          onCellHover={(c) => c && setCell(c)}
          onCellClick={(r, c) => setCell([r, c])}
          label={<Tex>{`C_{${m}\\times ${p}}`}</Tex>}
        />
      </div>
      {cell && C[i] && (
        <div className="overflow-x-auto rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-900">
          <Tex>{`c_{${i + 1}${j + 1}} = \\sum_{k=1}^{${n}} a_{${i + 1}k}\\,b_{k${j + 1}} = ${A[i]
            .map((a, k) => `${fmt(a)}\\cdot${fmt(B[k][j])}`)
            .join(' + ')} = \\mathbf{${fmt(C[i][j])}}`}</Tex>
        </div>
      )}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Regla de formas: <span className="font-mono">({m}×{n}) · ({n}×{p}) → ({m}×{p})</span>. Las dimensiones interiores deben
        coincidir. Cada celda de C es el producto punto de una fila de A con una columna de B.
      </p>
      </>
      )}
    </div>
  )
}
