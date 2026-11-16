export type Shape = number[]

export interface DimCheck {
  a?: number
  b?: number
  ok: boolean
}

/** Regla de broadcasting: compara las dimensiones desde la derecha; deben ser iguales o una de ellas 1. */
export function broadcastShapes(a: Shape, b: Shape): { shape: Shape | null; checks: DimCheck[] } {
  const n = Math.max(a.length, b.length)
  const checks: DimCheck[] = []
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
