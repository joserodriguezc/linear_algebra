import { useState } from 'react'
import { shapeStr } from '../../lib/ndindex'

const HUES = Array.from({ length: 24 }, (_, i) => `hsl(${(i * 360) / 12} 70% 55% / 0.35)`)

/**
 * Los mismos N elementos dispuestos con distintas formas. El color identifica cada elemento:
 * reshape no mueve los datos, solo cambia cómo se leen (orden por filas, "C order").
 */
export function ReshapeAnimator({
  n = 12,
  shapes = [[12], [3, 4], [4, 3], [2, 6], [6, 2], [12, 1], [2, 3, 2], [3, 2, 2]],
}: {
  n?: number
  shapes?: number[][]
}) {
  const [shape, setShape] = useState<number[]>(shapes[1])
  const [custom, setCustom] = useState('')
  const [error, setError] = useState<string | null>(null)
  const values = Array.from({ length: n }, (_, i) => i + 1)

  function applyCustom(text: string) {
    setCustom(text)
    const nums = text.split(/[,\s()]+/).filter(Boolean).map(Number)
    if (nums.length === 0 || nums.some((x) => !Number.isInteger(x) || x === 0)) return setError('escribe enteros, p. ej. 2, 6')
    const neg = nums.filter((x) => x === -1).length
    if (neg > 1 || nums.some((x) => x < -1)) return setError('solo se permite un -1')
    const known = nums.filter((x) => x > 0).reduce((a, b) => a * b, 1)
    const resolved = neg ? nums.map((x) => (x === -1 ? n / known : x)) : nums
    const size = resolved.reduce((a, b) => a * b, 1)
    if (resolved.some((x) => !Number.isInteger(x)) || size !== n)
      return setError(`ValueError: cannot reshape array of size ${n} into shape (${nums.join(', ')})`)
    setError(null)
    setShape(resolved)
  }

  const cell = (v: number) => (
    <span
      key={v}
      className="inline-flex size-8 items-center justify-center rounded-md border border-slate-300 font-mono text-xs dark:border-slate-600"
      style={{ background: HUES[(v - 1) % HUES.length] }}
    >
      {v}
    </span>
  )

  const render = () => {
    if (shape.length === 1)
      return <div className="flex flex-wrap gap-1">{values.map(cell)}</div>
    if (shape.length === 2) {
      const [r, c] = shape
      return (
        <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${c}, auto)` }}>
          {values.slice(0, r * c).map(cell)}
        </div>
      )
    }
    const [d, r, c] = shape
    return (
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: d }, (_, k) => (
          <div key={k} className="rounded-lg border border-dashed border-slate-300 p-2 dark:border-slate-700">
            <p className="mb-1 font-mono text-[10px] text-slate-500">[{k}, :, :]</p>
            <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${c}, auto)` }}>
              {values.slice(k * r * c, (k + 1) * r * c).map(cell)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-1.5">
        {shapes.map((s) => (
          <button
            key={s.join('x')}
            type="button"
            onClick={() => {
              setShape(s)
              setError(null)
            }}
            className={`rounded-md border px-2 py-0.5 font-mono text-xs ${
              s.join() === shape.join() && !error ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100' : 'border-slate-200 hover:border-brand-500 dark:border-slate-700'
            }`}
          >
            {shapeStr(s)}
          </button>
        ))}
        <input
          value={custom}
          onChange={(e) => applyCustom(e.target.value)}
          placeholder="otra forma, p. ej. -1, 3"
          className="w-56 rounded-md border border-slate-300 bg-white px-2 py-0.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
        />
      </div>
      <p className="font-mono text-sm">
        a.reshape({shape.join(', ')}){'  '}
        <span className="text-slate-500">→ ndim = {shape.length}, shape = {shapeStr(shape)}</span>
      </p>
      {error ? <p className="font-mono text-sm text-red-600 dark:text-red-400">{error}</p> : render()}
    </div>
  )
}
