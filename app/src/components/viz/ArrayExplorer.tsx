import { useMemo, useState } from 'react'
import { evalIndex, formatNested, gather, isSelected, shapeStr } from '../../lib/ndindex'
import { MatrixGrid } from './MatrixGrid'

const DEFAULT = [
  [11, 22, 33],
  [44, 55, 66],
  [77, 88, 99],
]

/** Escribe una expresión de indexado/slicing y ve qué celdas selecciona y la forma resultante. */
export function ArrayExplorer({
  data = DEFAULT,
  name = 'data',
  presets = ['data[0, 0]', 'data[-1]', 'data[0]', 'data[:, :-1]', 'data[:, -1]', 'data[:2, :]', 'data[::2, 1:]'],
}: {
  data?: number[][]
  name?: string
  presets?: string[]
}) {
  const [expr, setExpr] = useState(presets[3] ?? `${name}[0]`)
  const shape = [data.length, data[0].length]
  const res = useMemo(() => {
    try {
      const r = evalIndex(expr, shape)
      return { r, out: gather(r, ([i, j]) => data[i][j]) }
    } catch (e) {
      return { error: (e as Error).message }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expr, data])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
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
      </div>
      <label className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Expresión:</span>
        <input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          spellCheck={false}
          className="w-56 rounded-md border border-slate-300 bg-white px-2 py-1 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <div className="flex flex-wrap items-start gap-8">
        <MatrixGrid
          values={data}
          showIndices
          digits={0}
          label={<span className="font-mono text-xs text-slate-500">{name}.shape = {shapeStr(shape)}</span>}
          tone={(i, j) => ('r' in res && res.r && isSelected(res.r, [i, j]) ? 'a' : undefined)}
        />
        <div className="min-w-48">
          {'error' in res ? (
            <pre className="whitespace-pre-wrap font-mono text-sm text-red-600 dark:text-red-400">{res.error}</pre>
          ) : (
            <>
              <p className="text-xs text-slate-500">Resultado</p>
              <pre className="font-mono text-sm">{formatNested(res.out!)}</pre>
              <p className="mt-2 font-mono text-xs text-slate-500">shape: {shapeStr(res.r!.resultShape)}</p>
              <p className="mt-1 text-xs text-slate-500">
                {res.r!.kept.some((k) => !k)
                  ? 'Un índice entero elimina ese eje: el resultado tiene menos dimensiones.'
                  : 'Solo slices: se conservan todas las dimensiones.'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
