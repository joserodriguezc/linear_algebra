/**
 * Intérprete mínimo de indexado básico de NumPy (enteros y slices) para las visualizaciones.
 * Soporta expresiones como `data[0, 1]`, `data[-1]`, `data[:, :-1]`, `X[::2, 1:]`, `T[0, :, 2]`.
 */

export type Axis = { kind: 'int'; index: number } | { kind: 'slice'; indices: number[] }

export interface IndexResult {
  /** Índices seleccionados por eje (un entero se representa como lista de 1 elemento). */
  perAxis: number[][]
  /** Ejes que se conservan en el resultado (los enteros eliminan el eje). */
  kept: boolean[]
  resultShape: number[]
}

/** Equivalente a `range(*slice(start, stop, step).indices(len))` de Python. */
export function sliceIndices(start: number | null, stop: number | null, step: number | null, len: number): number[] {
  const st = step ?? 1
  if (st === 0) throw new Error('slice step cannot be zero')
  const lower = st > 0 ? 0 : -1
  const upper = st > 0 ? len : len - 1
  const norm = (v: number | null, def: number) => {
    if (v === null) return def
    if (v < 0) return Math.max(v + len, lower)
    return Math.min(v, upper)
  }
  const a = norm(start, st > 0 ? lower : upper)
  const b = norm(stop, st > 0 ? upper : lower)
  const out: number[] = []
  if (st > 0) for (let i = a; i < b; i += st) out.push(i)
  else for (let i = a; i > b; i += st) out.push(i)
  return out
}

function parseIntStrict(s: string): number {
  if (!/^-?\d+$/.test(s)) throw new Error(`índice no válido: '${s}'`)
  return Number(s)
}

/** Evalúa la expresión de índice sobre un array de forma `shape`. Lanza Error con mensaje estilo NumPy. */
export function evalIndex(expr: string, shape: number[]): IndexResult {
  const m = expr.trim().match(/^[A-Za-z_]\w*\s*\[(.*)\]$/)
  if (!m) throw new Error('escribe una expresión como data[0, 1] o data[:, :-1]')
  const inner = m[1].trim()
  if (inner === '') throw new Error('falta el índice entre corchetes')
  const parts = inner.split(',').map((p) => p.trim())
  if (parts.length > shape.length) {
    throw new Error(`IndexError: too many indices for array: array is ${shape.length}-dimensional, but ${parts.length} were indexed`)
  }
  const perAxis: number[][] = []
  const kept: boolean[] = []
  shape.forEach((len, ax) => {
    const p = parts[ax]
    if (p === undefined || p === ':') {
      perAxis.push(sliceIndices(null, null, null, len))
      kept.push(true)
      return
    }
    if (p.includes(':')) {
      const bits = p.split(':')
      if (bits.length > 3) throw new Error(`slice no válido: '${p}'`)
      const num = (s: string | undefined) => (s === undefined || s.trim() === '' ? null : parseIntStrict(s.trim()))
      perAxis.push(sliceIndices(num(bits[0]), num(bits[1]), num(bits[2]), len))
      kept.push(true)
      return
    }
    const i = parseIntStrict(p)
    if (i >= len || i < -len) throw new Error(`IndexError: index ${i} is out of bounds for axis ${ax} with size ${len}`)
    perAxis.push([i < 0 ? i + len : i])
    kept.push(false)
  })
  return { perAxis, kept, resultShape: perAxis.filter((_, i) => kept[i]).map((l) => l.length) }
}

/** ¿Está la celda `idx` dentro de la selección? */
export function isSelected(r: IndexResult, idx: number[]): boolean {
  return idx.every((v, ax) => r.perAxis[ax].includes(v))
}

export type Nested = number | Nested[]

/** Construye el array resultante (anidado) a partir de un getter de valores. */
export function gather(r: IndexResult, get: (idx: number[]) => number): Nested {
  const rec = (ax: number, idx: number[]): Nested => {
    if (ax === r.perAxis.length) return get(idx)
    if (!r.kept[ax]) return rec(ax + 1, [...idx, r.perAxis[ax][0]])
    return r.perAxis[ax].map((i) => rec(ax + 1, [...idx, i]))
  }
  return rec(0, [])
}

/** Imprime como NumPy (aproximadamente): [[1 2] [3 4]] con saltos de línea. */
export function formatNested(v: Nested, depth = 0): string {
  if (typeof v === 'number') return String(v)
  if (v.length === 0) return '[]'
  if (typeof v[0] === 'number') return `[${v.join(' ')}]`
  const pad = ' '.repeat(depth + 1)
  const sep = depth === 0 && Array.isArray((v[0] as Nested[])[0]) ? '\n\n' : '\n'
  return `[${v.map((x, i) => (i === 0 ? '' : pad) + formatNested(x, depth + 1)).join(sep)}]`
}

export const shapeStr = (s: number[]) => (s.length === 0 ? '() → un escalar' : s.length === 1 ? `(${s[0]},)` : `(${s.join(', ')})`)
