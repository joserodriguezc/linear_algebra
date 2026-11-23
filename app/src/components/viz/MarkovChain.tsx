import { useState } from 'react'
import { fmt, type Mat } from '../../lib/linalg'
import { Readout, Segmented, Slider, VizLayout } from './controls'

const STATES = ['soleado', 'nublado', 'lluvia']

/** Matrices de transición: la columna j son las probabilidades de pasar desde el estado j (suma 1). */
const PRESETS: Record<string, { label: string; P: Mat }> = {
  clima: {
    label: 'Clima',
    P: [
      [0.7, 0.3, 0.2],
      [0.2, 0.4, 0.4],
      [0.1, 0.3, 0.4],
    ],
  },
  pegajosa: {
    label: 'Estados pegajosos',
    P: [
      [0.94, 0.05, 0.02],
      [0.04, 0.9, 0.06],
      [0.02, 0.05, 0.92],
    ],
  },
}

const step = (P: Mat, x: number[]) => P.map((row) => row.reduce((s, p, j) => s + p * x[j], 0))

/** |λ₂| de una matriz estocástica 3×3: λ₁ = 1 y los otros dos cumplen λ₂ + λ₃ = tr − 1, λ₂λ₃ = det. */
function secondModulus(P: Mat): number {
  const tr = P[0][0] + P[1][1] + P[2][2]
  const det =
    P[0][0] * (P[1][1] * P[2][2] - P[1][2] * P[2][1]) -
    P[0][1] * (P[1][0] * P[2][2] - P[1][2] * P[2][0]) +
    P[0][2] * (P[1][0] * P[2][1] - P[1][1] * P[2][0])
  const s = tr - 1
  const disc = (s * s) / 4 - det
  if (disc < 0) return Math.sqrt(det) // complejos conjugados: |λ|² = λ₂λ₃
  const r = Math.sqrt(disc)
  return Math.max(Math.abs(s / 2 + r), Math.abs(s / 2 - r))
}

/**
 * Cadena de Markov de 3 estados: x_{k+1} = P x_k. La distribución converge al vector propio de λ = 1
 * (el estado estacionario π), y lo hace más despacio cuanto más cerca de 1 está |λ₂|.
 */
export function MarkovChain() {
  const [preset, setPreset] = useState<keyof typeof PRESETS>('clima')
  const [start, setStart] = useState('2')
  const [k, setK] = useState(0)
  const P = PRESETS[preset].P

  let x: number[] = STATES.map((_, i) => (String(i) === start ? 1 : 0))
  for (let i = 0; i < k; i++) x = step(P, x)
  let pi = [1 / 3, 1 / 3, 1 / 3]
  for (let i = 0; i < 2000; i++) pi = step(P, pi)
  const l2 = secondModulus(P)
  const dist = x.reduce((s, v, i) => s + Math.abs(v - pi[i]), 0)

  const W = 360
  const H = 220
  const barW = 70
  const top = 20
  const yOf = (v: number) => top + (H - top - 30) * (1 - v)

  return (
    <VizLayout
      plot={
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Distribución de la cadena de Markov tras k pasos">
          {STATES.map((s, i) => {
            const cx = 60 + i * 120
            return (
              <g key={s}>
                <rect x={cx - barW / 2} y={yOf(x[i])} width={barW} height={yOf(0) - yOf(x[i])} fill="var(--viz-d)" opacity={0.85} />
                <line x1={cx - barW / 2 - 6} x2={cx + barW / 2 + 6} y1={yOf(pi[i])} y2={yOf(pi[i])} stroke="var(--viz-a)" strokeWidth={2.5} strokeDasharray="6 3" />
                <text x={cx} y={yOf(x[i]) - 5} fontSize={12} textAnchor="middle" fill="var(--viz-muted)">
                  {fmt(x[i], 3)}
                </text>
                <text x={cx} y={H - 10} fontSize={13} textAnchor="middle" fill="currentColor">
                  {s}
                </text>
              </g>
            )
          })}
          <line x1={0} x2={W} y1={yOf(0)} y2={yOf(0)} stroke="var(--viz-axis)" />
        </svg>
      }
      side={
        <>
          <Segmented
            options={Object.entries(PRESETS).map(([value, p]) => ({ value, label: p.label }))}
            value={preset}
            onChange={(v) => setPreset(v)}
          />
          <div className="space-y-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">Estado inicial (seguro)</p>
            <Segmented options={STATES.map((s, i) => ({ value: String(i), label: s }))} value={start} onChange={setStart} />
          </div>
          <Slider label="paso k" value={k} min={0} max={40} step={1} onChange={setK} />
          <Readout
            items={[
              `P = \\begin{bmatrix} ${P.map((r) => r.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`,
              `x_{${k}} = P^{${k}}x_0 = (${x.map((v) => fmt(v, 3)).join(',\\ ')})`,
              `\\pi = (${pi.map((v) => fmt(v, 3)).join(',\\ ')})`,
              `|\\lambda_2| = ${fmt(l2, 3)},\\quad \\|x_{${k}} - \\pi\\|_1 = ${fmt(dist, 4)}`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Barras: probabilidad de cada estado tras k pasos. Línea discontinua: el estado estacionario π, el vector propio de
            valor propio 1. Empieces donde empieces, las barras acaban en π. Con «Clima», |λ₂| ≈ 0.46 y bastan unos pocos
            pasos. Con «Estados pegajosos», |λ₂| está cerca de 1 y la convergencia es mucho más lenta.
          </p>
        </>
      }
    />
  )
}
