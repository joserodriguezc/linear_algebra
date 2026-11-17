import { useState } from 'react'
import { circulantMatrix, convolve1d, fmt, toeplitzMatrix } from '../../lib/linalg'
import { rng } from '../../lib/random'
import { MatrixGrid } from './MatrixGrid'
import { Readout, Segmented } from './controls'

const N = 12
const noisy = (() => {
  const r = rng(3)
  return Array.from({ length: N }, (_, i) => Math.round((3 + 2 * Math.sin(i / 2) + (r.next() - 0.5) * 3) * 10) / 10)
})()

const SIGNALS: Record<string, { label: string; x: number[] }> = {
  escalon: { label: 'Escalón', x: [0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4] },
  pico: { label: 'Pico', x: [0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0] },
  ruido: { label: 'Con ruido', x: noisy },
}

const KERNELS: Record<string, { label: string; k: number[]; note: string }> = {
  media: { label: 'Media móvil', k: [0.25, 0.5, 0.25], note: 'promedia cada valor con sus vecinos: suaviza (filtro paso bajo)' },
  derivada: { label: 'Diferencias', k: [0.5, 0, -0.5], note: 'y_i = (x_{i+1} − x_{i−1})/2: detecta cambios, como una derivada (paso alto)' },
  desplazar: { label: 'Desplazar', k: [0, 0, 1], note: 'y_i = x_{i−1}: mueve la señal una posición (la matriz de desplazamiento S)' },
  identidad: { label: 'Identidad', k: [0, 1, 0], note: 'no cambia nada: la matriz es la identidad' },
}

type Mode = 'ceros' | 'circular'

const H = 120
const BAR = 26

function Bars({ values, color, label, highlight }: { values: number[]; color: string; label: string; highlight?: number[] }) {
  const max = Math.max(1, ...values.map(Math.abs))
  const zero = H / 2
  return (
    <figure>
      <svg viewBox={`0 0 ${N * BAR} ${H}`} className="w-full max-w-md" role="img" aria-label={label}>
        <line x1={0} x2={N * BAR} y1={zero} y2={zero} stroke="var(--viz-axis)" />
        {values.map((v, i) => {
          const h = (Math.abs(v) / max) * (H / 2 - 6)
          return (
            <rect
              key={i}
              x={i * BAR + 3}
              y={v >= 0 ? zero - h : zero}
              width={BAR - 6}
              height={Math.max(h, 0.5)}
              rx={2}
              fill={color}
              fillOpacity={highlight && !highlight.includes(i) ? 0.25 : 0.85}
            />
          )
        })}
      </svg>
      <figcaption className="text-xs text-slate-500">{label}</figcaption>
    </figure>
  )
}

/** Una convolución es multiplicar por una matriz de diagonales constantes (Toeplitz, o circulante si es circular). */
export function Convolution1D() {
  const [sig, setSig] = useState('escalon')
  const [ker, setKer] = useState('media')
  const [mode, setMode] = useState<Mode>('ceros')
  const [row, setRow] = useState(6)
  const x = SIGNALS[sig].x
  const k = KERNELS[ker].k
  const circular = mode === 'circular'
  const y = convolve1d(x, k, circular)
  const M = circular ? circulantMatrix(k, N) : toeplitzMatrix(k, N)
  const window = M[row].map((v, j) => (v !== 0 ? j : -1)).filter((j) => j >= 0)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Segmented value={sig} onChange={setSig} options={Object.entries(SIGNALS).map(([value, s]) => ({ value, label: s.label }))} />
        <Segmented value={ker} onChange={setKer} options={Object.entries(KERNELS).map(([value, s]) => ({ value, label: s.label }))} />
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { value: 'ceros', label: 'Bordes con ceros (Toeplitz)' },
            { value: 'circular', label: 'Circular (circulante)' },
          ]}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Bars values={x} color="var(--viz-a)" label="Señal x" highlight={window} />
          <Bars values={y} color="var(--viz-c)" label="Salida y = k ∗ x" highlight={[row]} />
          <Readout
            items={[
              `k = (${k.map((v) => fmt(v)).join(',\\ ')})`,
              `y_{${row + 1}} = ${window.map((j) => `${fmt(M[row][j])}\\cdot${fmt(x[j])}`).join(' + ') || '0'} = \\mathbf{${fmt(y[row])}}`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">Filtro: {KERNELS[ker].note}.</p>
        </div>
        <div className="min-w-0 space-y-2 overflow-x-auto">
          <MatrixGrid
            values={M}
            size="xs"
            digits={2}
            dimZeros
            tone={(i, j) => (i === row && M[i][j] !== 0 ? 'c' : M[i][j] !== 0 ? 'a' : undefined)}
            onCellClick={(i) => setRow(i)}
            label={<span className="text-xs text-slate-500">{circular ? 'Matriz circulante C' : 'Matriz de Toeplitz T'} (haz clic en una fila)</span>}
          />
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Cada fila de la matriz es el filtro desplazado una posición: por eso sus diagonales son constantes. En el modo circular, el filtro
        «da la vuelta» por los bordes y las esquinas también se llenan. Una matriz densa de {N}×{N} tendría {N * N} números libres; esta solo
        tiene {k.length}: los pesos están compartidos.
      </p>
    </div>
  )
}
