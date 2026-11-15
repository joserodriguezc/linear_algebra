import { useMemo, useState } from 'react'
import { evalIndex, formatNested, gather, isSelected, shapeStr, type IndexResult } from '../../lib/ndindex'
import { MatrixGrid } from './MatrixGrid'

const BOOK_T = [
  [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  [[11, 12, 13], [14, 15, 16], [17, 18, 19]],
  [[21, 22, 23], [24, 25, 26], [27, 28, 29]],
]

/**
 * Tensor de 3 dimensiones dibujado como capas apiladas (eje 0 = profundidad).
 * Escribe un índice como T[0], T[:, 0, :] o T[1, 2, 0] y mira qué elementos selecciona.
 */
export function TensorExplorer({ T = BOOK_T }: { T?: number[][][] }) {
  const shape = [T.length, T[0].length, T[0][0].length]
  const [expr, setExpr] = useState('T[0]')
  const presets = ['T[0]', 'T[:, 0, :]', 'T[:, :, 0]', 'T[1, 2, 0]', 'T[:, 1, 1]', 'T[1:, :, 2]']
  const res = useMemo((): { r: IndexResult; out: ReturnType<typeof gather> } | { error: string } => {
    try {
      const r = evalIndex(expr, shape)
      return { r, out: gather(r, ([a, b, c]) => T[a][b][c]) }
    } catch (e) {
      return { error: (e as Error).message }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expr, T])
  const sel = (idx: number[]) => 'r' in res && isSelected(res.r, idx)

  // Isométrico simple: cada capa k se desplaza hacia arriba-derecha
  const s = 34
  const dx = 26
  const dy = 22
  const [D, R, C] = shape
  const W = C * s + (D - 1) * dx + 8
  const H = R * s + (D - 1) * dy + 8

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-1.5">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setExpr(p)}
            className={`rounded-md border px-2 py-0.5 font-mono text-xs ${
              p === expr ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100' : 'border-slate-200 hover:border-brand-500 dark:border-slate-700'
            }`}
          >
            {p}
          </button>
        ))}
        <input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          spellCheck={false}
          aria-label="Expresión de índice del tensor"
          className="w-40 rounded-md border border-slate-300 bg-white px-2 py-0.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
        />
      </div>
      <div className="flex flex-wrap items-start gap-8">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-64 max-w-full" role="img" aria-label={`Tensor de forma ${shapeStr(shape)}`}>
          {Array.from({ length: D }, (_, k) => D - 1 - k).map((k) => (
            <g key={k} transform={`translate(${4 + k * dx}, ${4 + (D - 1 - k) * dy})`}>
              {T[k].map((row, i) =>
                row.map((v, j) => {
                  const on = sel([k, i, j])
                  return (
                    <g key={`${i}${j}`}>
                      <rect
                        x={j * s}
                        y={i * s}
                        width={s - 2}
                        height={s - 2}
                        rx={4}
                        fill={on ? 'var(--viz-a)' : 'var(--viz-grid)'}
                        fillOpacity={on ? 0.85 : 0.12}
                        strokeOpacity={on ? 1 : k === 0 ? 0.9 : 0.45}
                        stroke="var(--viz-axis)"
                        strokeWidth={1}
                      />
                      {(k === 0 || on) && (
                        <text x={j * s + (s - 2) / 2} y={i * s + s / 2 + 3} fontSize={11} textAnchor="middle" fill={on ? 'white' : 'var(--viz-text)'}>
                          {v}
                        </text>
                      )}
                    </g>
                  )
                }),
              )}
            </g>
          ))}
        </svg>
        <div className="min-w-48">
          {'error' in res ? (
            <pre className="whitespace-pre-wrap font-mono text-sm text-red-600 dark:text-red-400">{res.error}</pre>
          ) : (
            <>
              <p className="text-xs text-slate-500">Resultado · shape {shapeStr(res.r.resultShape)}</p>
              <pre className="font-mono text-sm">{formatNested(res.out)}</pre>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {T.map((layer, k) => (
          <MatrixGrid
            key={k}
            values={layer}
            size="sm"
            digits={0}
            tone={(i, j) => (sel([k, i, j]) ? 'a' : undefined)}
            label={<span className="font-mono text-[11px] text-slate-500">T[{k}, :, :]</span>}
          />
        ))}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Forma {shapeStr(shape)}: el primer eje elige la capa (profundidad), el segundo la fila y el tercero la columna. La capa
        delantera es T[0].
      </p>
    </div>
  )
}
