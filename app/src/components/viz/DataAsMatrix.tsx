import { useState } from 'react'
import { MatrixGrid } from './MatrixGrid'

/** Un "3" dibujado en 8x8 píxeles (0 = blanco, 16 = negro), como en el dataset de dígitos de scikit-learn. */
const DIGIT = [
  [0, 0, 4, 13, 15, 8, 0, 0],
  [0, 0, 12, 9, 6, 16, 2, 0],
  [0, 0, 0, 0, 5, 15, 2, 0],
  [0, 0, 0, 7, 16, 9, 0, 0],
  [0, 0, 0, 2, 9, 16, 5, 0],
  [0, 0, 0, 0, 0, 10, 12, 0],
  [0, 0, 7, 4, 5, 14, 9, 0],
  [0, 0, 5, 14, 15, 8, 0, 0],
]

/** Haz clic en los píxeles para cambiar su intensidad: la imagen y la matriz son lo mismo. */
export function ImageAsMatrix() {
  const [img, setImg] = useState(DIGIT)
  const cycle = (i: number, j: number) => setImg(img.map((r, a) => r.map((v, b) => (a === i && b === j ? (v >= 16 ? 0 : Math.min(16, v + 8)) : v))))
  return (
    <div className="flex flex-wrap items-start gap-8">
      <div>
        <div className="grid grid-cols-8 overflow-hidden rounded border border-slate-300 dark:border-slate-600" style={{ width: 192 }}>
          {img.flatMap((row, i) =>
            row.map((v, j) => (
              <button
                key={`${i}-${j}`}
                type="button"
                aria-label={`Píxel fila ${i}, columna ${j}: ${v}`}
                onClick={() => cycle(i, j)}
                className="size-6"
                style={{ background: `rgb(${255 - v * 15.9}, ${255 - v * 15.9}, ${255 - v * 15.9})` }}
              />
            )),
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500">Imagen 8×8 (haz clic en un píxel)</p>
      </div>
      <MatrixGrid
        values={img}
        size="sm"
        digits={0}
        dimZeros
        label={<span className="font-mono text-xs text-slate-500">la misma imagen como matriz (8, 8)</span>}
      />
      <p className="max-w-xs text-xs text-slate-500 dark:text-slate-400">
        Cada píxel es un número (aquí, de 0 a 16). Para muchos modelos, la matriz se "aplana" en un vector de 64 valores con
        <span className="font-mono"> img.reshape(-1)</span>; una foto en color añade un tercer eje con los canales RGB.
      </p>
    </div>
  )
}

const DEFAULT_ROWS = ['rojo', 'verde', 'azul', 'verde', 'rojo']

/** Codificación one-hot: cada categoría se convierte en una columna con un único 1 por fila. */
export function OneHotDemo() {
  const [rows, setRows] = useState(DEFAULT_ROWS)
  const [draft, setDraft] = useState('')
  const cats = [...new Set(rows)].sort()
  const M = rows.map((r) => cats.map((c) => (c === r ? 1 : 0)))
  const add = () => {
    const v = draft.trim().toLowerCase()
    if (v) setRows([...rows, v])
    setDraft('')
  }
  return (
    <div className="space-y-3">
      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          add()
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="añade una categoría (p. ej. amarillo)"
          aria-label="Nueva categoría"
          className="w-64 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <button type="submit" className="rounded-md bg-brand-600 px-2 py-1 text-xs font-semibold text-white hover:bg-brand-700">
          Añadir fila
        </button>
        <button type="button" onClick={() => setRows(DEFAULT_ROWS)} className="text-xs text-slate-500 underline">
          Restablecer
        </button>
      </form>
      <div className="flex flex-wrap items-start gap-6">
        <table className="text-sm">
          <thead>
            <tr>
              <th className="px-2 text-left text-xs font-normal text-slate-500">color</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="h-9 px-2">
                  {r}{' '}
                  <button type="button" aria-label={`Quitar fila ${i + 1}`} onClick={() => setRows(rows.filter((_, j) => j !== i))} className="text-xs text-slate-400 hover:text-red-500">
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className="mt-8 text-xl text-slate-400">→</span>
        <div>
          <div className="mb-1 flex gap-1 pl-0.5 font-mono text-[10px] text-slate-500">
            {cats.map((c) => (
              <span key={c} className="w-10 truncate text-center" title={c}>
                {c}
              </span>
            ))}
          </div>
          {M.length > 0 && <MatrixGrid values={M} digits={0} dimZeros tone={(i, j) => (M[i][j] === 1 ? 'c' : undefined)} />}
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {rows.length} filas × {cats.length} categorías = {rows.length * cats.length} números, de los que solo {rows.length} son 1: una
        matriz dispersa (etapa 12). Así un modelo, que solo entiende números, puede usar una variable categórica sin inventar un
        orden falso (rojo = 1, verde = 2…).
      </p>
    </div>
  )
}
