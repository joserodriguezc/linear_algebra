import { useState } from 'react'
import { eigSym, fmt, type Mat } from '../../lib/linalg'
import { MatrixGrid } from './MatrixGrid'
import { Segmented } from './controls'

const NODES: [number, number][] = [
  [60, 60],
  [40, 160],
  [140, 110],
  [190, 200],
  [330, 200],
  [380, 110],
  [480, 160],
  [460, 60],
]

type Edge = [number, number]
const CANDIDATES: { e: Edge; on: boolean }[] = [
  { e: [0, 1], on: true },
  { e: [0, 2], on: true },
  { e: [1, 2], on: true },
  { e: [1, 3], on: true },
  { e: [2, 3], on: true },
  { e: [4, 5], on: true },
  { e: [4, 6], on: true },
  { e: [5, 6], on: true },
  { e: [5, 7], on: true },
  { e: [6, 7], on: true },
  { e: [3, 4], on: true }, // puente entre comunidades
  { e: [2, 5], on: false }, // segundo puente (apagado)
]

type View = 'L' | 'A' | 'D'

/**
 * El laplaciano L = D − A de un grafo. Sus valores propios nulos cuentan las componentes conexas y el
 * vector de Fiedler (segundo valor propio) separa el grafo en dos grupos: clustering espectral.
 */
export function GraphLaplacianExplorer() {
  const [on, setOn] = useState<boolean[]>(CANDIDATES.map((c) => c.on))
  const [view, setView] = useState<View>('L')
  const n = NODES.length
  const A: Mat = Array.from({ length: n }, () => Array(n).fill(0) as number[])
  CANDIDATES.forEach(({ e: [i, j] }, k) => {
    if (on[k]) A[i][j] = A[j][i] = 1
  })
  const deg = A.map((r) => r.reduce((s, v) => s + v, 0))
  const D: Mat = deg.map((d, i) => deg.map((_, j) => (i === j ? d : 0)))
  const L: Mat = A.map((r, i) => r.map((v, j) => D[i][j] - v))
  const { values, vectors } = eigSym(L)
  const zeros = values.filter((v) => Math.abs(v) < 1e-9).length
  const fiedler = vectors.map((r) => r[1])
  const maxVal = Math.max(...values, 1)
  const shown = view === 'L' ? L : view === 'A' ? A : D

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <svg viewBox="0 0 540 260" className="w-full rounded-lg border border-slate-200 dark:border-slate-800" role="img" aria-label="Grafo con dos comunidades">
          {CANDIDATES.map(({ e: [i, j] }, k) => (
            <line
              key={k}
              x1={NODES[i][0]}
              y1={NODES[i][1]}
              x2={NODES[j][0]}
              y2={NODES[j][1]}
              stroke={on[k] ? 'var(--viz-text)' : 'var(--viz-muted)'}
              strokeWidth={on[k] ? 2.5 : 1.5}
              strokeDasharray={on[k] ? undefined : '5 5'}
              strokeOpacity={on[k] ? 0.8 : 0.5}
              className="cursor-pointer"
              onClick={() => setOn(on.map((v, m) => (m === k ? !v : v)))}
            >
              <title>{on[k] ? 'Quitar arista' : 'Añadir arista'}</title>
            </line>
          ))}
          {/* Zonas de clic más anchas para las aristas */}
          {CANDIDATES.map(({ e: [i, j] }, k) => (
            <line
              key={`hit-${k}`}
              x1={NODES[i][0]}
              y1={NODES[i][1]}
              x2={NODES[j][0]}
              y2={NODES[j][1]}
              stroke="transparent"
              strokeWidth={14}
              className="cursor-pointer"
              onClick={() => setOn(on.map((v, m) => (m === k ? !v : v)))}
            />
          ))}
          {NODES.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={17} fill={fiedler[i] >= 0 ? 'var(--viz-a)' : 'var(--viz-b)'} fillOpacity={0.85} />
              <text x={x} y={y + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill="white">
                {i + 1}
              </text>
            </g>
          ))}
        </svg>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Valores propios de L</p>
          <svg viewBox="0 0 240 110" className="w-full max-w-xs" role="img" aria-label="Valores propios del laplaciano">
            {values.map((v, i) => {
              const h = (Math.max(0, v) / maxVal) * 80
              return (
                <g key={i}>
                  <rect x={8 + i * 29} y={88 - h} width={22} height={Math.max(h, 1)} rx={2} fill={Math.abs(v) < 1e-9 ? 'var(--viz-c)' : i === 1 ? 'var(--viz-d)' : 'var(--viz-a)'} />
                  <text x={19 + i * 29} y={104} textAnchor="middle" fontSize={9} fill="var(--viz-muted)">
                    {fmt(v, 2)}
                  </text>
                </g>
              )
            })}
          </svg>
          <ul className="space-y-1 text-sm">
            <li>
              Valores propios nulos (verde): <strong>{zeros}</strong> ⇒ {zeros === 1 ? 'el grafo es conexo' : `${zeros} componentes conexas`}
            </li>
            <li>
              λ₂ (naranja, «conectividad algebraica») = <strong>{fmt(values[1], 3)}</strong>
            </li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Color de cada nodo = signo de su componente en el vector de Fiedler (el vector propio de λ₂).
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'A', label: 'Adyacencia A' },
            { value: 'D', label: 'Grados D' },
            { value: 'L', label: 'Laplaciano L = D − A' },
          ]}
        />
        <div className="overflow-x-auto">
          <MatrixGrid values={shown} size="sm" digits={0} dimZeros showIndices indexBase={1} />
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Haz clic en las aristas para quitarlas o añadirlas (las discontinuas están desactivadas). Quita el puente 4–5 y aparecerá un segundo
        valor propio nulo: dos componentes. Con el puente puesto, λ₂ es pequeño (el grafo «casi» se separa) y el vector de Fiedler encuentra
        las dos comunidades. Activa también el puente 3–6 y verás cómo λ₂ crece.
      </p>
    </div>
  )
}
