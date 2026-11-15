import { useState } from 'react'
import { shapeStr } from '../../lib/ndindex'
import { MatrixGrid } from './MatrixGrid'
import { Slider } from './controls'

type Shape = number[]

/** Regla de broadcasting: compara las dimensiones desde la derecha; deben ser iguales o una de ellas 1. */
export function broadcastShapes(a: Shape, b: Shape): { shape: Shape | null; checks: { a?: number; b?: number; ok: boolean }[] } {
  const n = Math.max(a.length, b.length)
  const checks: { a?: number; b?: number; ok: boolean }[] = []
  const out: number[] = []
  for (let k = 1; k <= n; k++) {
    const da = a[a.length - k]
    const db = b[b.length - k]
    const ok = da === undefined || db === undefined || da === db || da === 1 || db === 1
    checks.unshift({ a: da, b: db, ok })
    out.unshift(Math.max(da ?? 1, db ?? 1))
  }
  return { shape: checks.every((c) => c.ok) ? out : null, checks }
}

const pad2 = (s: Shape): [number, number] => (s.length === 0 ? [1, 1] : s.length === 1 ? [1, s[0]] : [s[0], s[1]])

function makeValues(s: Shape, base: (i: number, j: number) => number): number[][] {
  const [r, c] = pad2(s)
  return Array.from({ length: r }, (_, i) => Array.from({ length: c }, (_, j) => base(i, j)))
}

function stretch(vals: number[][], target: [number, number]) {
  const [r, c] = [vals.length, vals[0].length]
  const values = Array.from({ length: target[0] }, (_, i) => Array.from({ length: target[1] }, (_, j) => vals[r === 1 ? 0 : i][c === 1 ? 0 : j]))
  const ghost = (i: number, j: number) => (r === 1 && i > 0) || (c === 1 && j > 0)
  return { values, ghost }
}

const B_PRESETS: { label: string; shape: (r: number, c: number) => Shape }[] = [
  { label: 'escalar', shape: () => [] },
  { label: '(c,)', shape: (_, c) => [c] },
  { label: '(r, 1)', shape: (r) => [r, 1] },
  { label: '(1, c)', shape: (_, c) => [1, c] },
  { label: '(c+1,)', shape: (_, c) => [c + 1] },
  { label: '(r, c)', shape: (r, c) => [r, c] },
]

export function BroadcastingGrid() {
  const [rows, setRows] = useState(2)
  const [cols, setCols] = useState(3)
  const [preset, setPreset] = useState(1)
  const aShape: Shape = [rows, cols]
  const bShape = B_PRESETS[preset].shape(rows, cols)
  const { shape: out, checks } = broadcastShapes(aShape, bShape)

  const A = makeValues(aShape, (_, j) => j + 1)
  const B = makeValues(bShape, (i, j) => (bShape.length === 0 ? 2 : 10 * (i + j + 1)))

  return (
    <div className="space-y-4">
      <div className="grid max-w-md gap-2">
        <Slider label="filas de A" value={rows} min={1} max={4} step={1} onChange={setRows} />
        <Slider label="columnas" value={cols} min={1} max={4} step={1} onChange={setCols} />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="mr-1 text-slate-500">Forma de B:</span>
        {B_PRESETS.map((p, i) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setPreset(i)}
            className={`rounded-md border px-2 py-0.5 font-mono ${
              i === preset ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100' : 'border-slate-200 hover:border-brand-500 dark:border-slate-700'
            }`}
          >
            {p.label === 'escalar' ? 'escalar' : shapeStr(p.shape(rows, cols))}
          </button>
        ))}
      </div>

      <table className="text-xs">
        <thead>
          <tr className="text-slate-500">
            <th className="pr-4 text-left font-normal">Dimensión (desde la derecha)</th>
            {checks.map((_, k) => (
              <th key={k} className="px-3 font-mono font-normal">
                {k - checks.length}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono">
          <tr>
            <td className="pr-4 font-sans">A {shapeStr(aShape)}</td>
            {checks.map((c, k) => (
              <td key={k} className="px-3 text-center">{c.a ?? '–'}</td>
            ))}
          </tr>
          <tr>
            <td className="pr-4 font-sans">B {bShape.length ? shapeStr(bShape) : '(escalar)'}</td>
            {checks.map((c, k) => (
              <td key={k} className="px-3 text-center">{c.b ?? '–'}</td>
            ))}
          </tr>
          <tr>
            <td className="pr-4 font-sans">¿Compatible?</td>
            {checks.map((c, k) => (
              <td key={k} className={`px-3 text-center ${c.ok ? 'text-emerald-600' : 'text-red-600'}`}>{c.ok ? '✓' : '✗'}</td>
            ))}
          </tr>
        </tbody>
      </table>

      {!out ? (
        <pre className="whitespace-pre-wrap font-mono text-sm text-red-600 dark:text-red-400">
          ValueError: operands could not be broadcast together with shapes {shapeStr(aShape)} {bShape.length ? shapeStr(bShape) : '()'}
        </pre>
      ) : (
        (() => {
          const target = pad2(out)
          const sa = stretch(A, target)
          const sb = stretch(B, target)
          const C = sa.values.map((r, i) => r.map((v, j) => v + sb.values[i][j]))
          return (
            <div className="flex flex-wrap items-center gap-4">
              <MatrixGrid values={sa.values} digits={0} tone={(i, j) => (sa.ghost(i, j) ? 'ghost' : 'a')} label="A" />
              <span className="text-xl text-slate-400">+</span>
              <MatrixGrid values={sb.values} digits={0} tone={(i, j) => (sb.ghost(i, j) ? 'ghost' : 'b')} label="B (estirado)" />
              <span className="text-xl text-slate-400">=</span>
              <MatrixGrid values={C} digits={0} tone={() => 'c'} label={<span className="font-mono text-xs">shape {shapeStr(out)}</span>} />
            </div>
          )
        })()
      )}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Las celdas con borde discontinuo no existen en memoria: NumPy se comporta <em>como si</em> copiara la fila, columna o escalar,
        pero sin hacer la copia.
      </p>
    </div>
  )
}
