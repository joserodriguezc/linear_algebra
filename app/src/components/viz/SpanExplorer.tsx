import { useState } from 'react'
import { add, det2, fmt, scale, type Vec2 } from '../../lib/linalg'
import { texMat } from '../../lib/tex'
import { Readout, Slider, VizLayout } from './controls'
import { Arrow, Dot, Handle, Plane, Polygon, Segment } from './plane'

const PRESETS: Record<string, { label: string; b1: Vec2; b2: Vec2 }> = {
  indep: { label: 'Independientes', b1: [2, 1], b2: [-1, 2] },
  dep: { label: 'Dependientes (b₂ = 2·b₁)', b1: [1, 0.5], b2: [2, 1] },
  casi: { label: 'Casi paralelos', b1: [2, 1], b2: [2, 1.3] },
}

/**
 * Combinaciones lineales c₁b₁ + c₂b₂. Si b₁ y b₂ son independientes, sus combinaciones llenan
 * todo el plano (span = ℝ²); si son dependientes, solo una recta.
 */
export function SpanExplorer() {
  const [b1, setB1] = useState<Vec2>(PRESETS.indep.b1)
  const [b2, setB2] = useState<Vec2>(PRESETS.indep.b2)
  const [c1, setC1] = useState(1)
  const [c2, setC2] = useState(1)
  const d = det2([
    [b1[0], b2[0]],
    [b1[1], b2[1]],
  ])
  const independent = Math.abs(d) > 1e-9
  const first = scale(b1, c1) as Vec2
  const r = add(first, scale(b2, c2)) as Vec2
  // Retícula de combinaciones con coeficientes enteros: muestra qué parte del plano se alcanza
  const lattice: Vec2[] = []
  for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) lattice.push(add(scale(b1, i), scale(b2, j)) as Vec2)
  const dir = Math.hypot(...b1) > 1e-9 ? b1 : b2

  return (
    <VizLayout
      plot={
        <Plane xRange={[-6, 6]} yRange={[-5, 5]} ariaLabel="Combinaciones lineales de dos vectores y su span">
          {independent ? (
            <Polygon points={[[-6, -5], [6, -5], [6, 5], [-6, 5]]} color="c" opacity={0.06} stroke={false} />
          ) : (
            <Segment from={[-dir[0] * 20, -dir[1] * 20]} to={[dir[0] * 20, dir[1] * 20]} color="c" dashed={false} width={6} />
          )}
          {lattice.map((p, i) => (
            <Dot key={i} at={p} color="muted" r={2} opacity={0.6} />
          ))}
          <Arrow to={first} color="a" dashed width={1.5} />
          <Arrow from={first} to={r} color="b" dashed width={1.5} />
          <Arrow to={r} color="c" label="c₁b₁ + c₂b₂" width={3} />
          <Arrow to={b1} color="a" label="b₁" />
          <Arrow to={b2} color="b" label="b₂" />
          <Handle at={b1} onChange={setB1} color="a" label="Vector b1" />
          <Handle at={b2} onChange={setB2} color="b" label="Vector b2" />
        </Plane>
      }
      side={
        <>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(PRESETS).map(([k, p]) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setB1(p.b1)
                  setB2(p.b2)
                }}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:border-brand-500 dark:border-slate-700"
              >
                {p.label}
              </button>
            ))}
          </div>
          <Slider label="c₁" value={c1} min={-3} max={3} step={0.1} onChange={setC1} />
          <Slider label="c₂" value={c2} min={-3} max={3} step={0.1} onChange={setC2} />
          <Readout
            items={[
              `${fmt(c1)}\\,${texMat(b1)} + ${fmt(c2)}\\,${texMat(b2)} = ${texMat(r)}`,
              `\\det\\begin{bmatrix} b_1 & b_2 \\end{bmatrix} = ${fmt(d)}`,
            ]}
          />
          <p
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              independent ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
            }`}
          >
            {independent
              ? 'Independientes: sus combinaciones llenan todo el plano (span = ℝ²). Forman una base.'
              : 'Dependientes: uno es múltiplo del otro y solo generan una recta. No forman una base.'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Los puntos grises son las combinaciones con coeficientes enteros. Mueve c₁ y c₂ para llegar a cualquier punto. Prueba
            «Casi paralelos»: siguen siendo independientes, pero hacen falta coeficientes enormes para llegar a puntos alejados de su
            dirección común (un sistema mal condicionado).
          </p>
        </>
      }
    />
  )
}
