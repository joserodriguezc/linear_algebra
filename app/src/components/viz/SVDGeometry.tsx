import { useState } from 'react'
import { fmt, matVec, svd2, type Mat, type Vec2 } from '../../lib/linalg'
import { MatrixInput2, Readout, Segmented, Slider, VizLayout } from './controls'
import { texMat } from '../../lib/tex'
import { Arrow, Plane, Polygon, Polyline } from './plane'

type Stage = '0' | '1' | '2' | '3'

const PRESETS: Record<string, { label: string; m: Mat }> = {
  a: { label: '[[3,0],[4,5]]', m: [[3, 0], [4, 5]] },
  b: { label: '[[1,2],[3,4]]', m: [[1, 2], [3, 4]] },
  c: { label: 'Cizalla', m: [[1, 1], [0, 1]] },
  d: { label: 'Rango 1', m: [[1, 2], [0.5, 1]] },
}

const lerp = (a: Vec2, b: Vec2, t: number): Vec2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]

/** Toda matriz 2x2 es: girar (Vᵀ), estirar los ejes (Σ) y volver a girar (U). */
export function SVDGeometry() {
  const [M, setM] = useState<Mat>(PRESETS.a.m)
  const [stage, setStage] = useState<Stage>('3')
  const [t, setT] = useState(1)
  const { U, s, Vt } = svd2(M)
  const S: Mat = [[s[0], 0], [0, s[1]]]

  const maps: ((p: Vec2) => Vec2)[] = [
    (p) => p,
    (p) => matVec(Vt, p) as Vec2,
    (p) => matVec(S, matVec(Vt, p)) as Vec2,
    (p) => matVec(U, matVec(S, matVec(Vt, p))) as Vec2,
  ]
  const k = Number(stage)
  const f = (p: Vec2) => (k === 0 ? p : lerp(maps[k - 1](p), maps[k](p), t))

  const circle = Array.from({ length: 73 }, (_, i) => [Math.cos((i * Math.PI) / 36), Math.sin((i * Math.PI) / 36)] as Vec2)
  const v1: Vec2 = [Vt[0][0], Vt[0][1]]
  const v2: Vec2 = [Vt[1][0], Vt[1][1]]

  return (
    <VizLayout
      plot={
        <Plane xRange={[-7, 7]} yRange={[-7, 7]} ariaLabel="Geometría de la SVD">
          <Polyline points={circle} color="muted" width={1} dashed />
          <Polygon points={circle.map(f)} color="d" opacity={0.12} />
          <Arrow to={f(v1)} color="a" label={k >= 2 ? 'σ₁' : 'v₁'} />
          <Arrow to={f(v2)} color="b" label={k >= 2 ? 'σ₂' : 'v₂'} />
        </Plane>
      }
      side={
        <>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(PRESETS).map(([key, p]) => (
              <button
                key={key}
                type="button"
                onClick={() => setM(p.m)}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:border-brand-500 dark:border-slate-700"
              >
                {p.label}
              </button>
            ))}
          </div>
          <MatrixInput2 value={M} onChange={setM} />
          <Segmented
            value={stage}
            onChange={(v) => {
              setStage(v)
              setT(1)
            }}
            options={[
              { value: '0', label: 'Círculo' },
              { value: '1', label: '1. Vᵀ (gira)' },
              { value: '2', label: '2. Σ (estira)' },
              { value: '3', label: '3. U (gira)' },
            ]}
          />
          {k > 0 && <Slider label="animación" value={t} min={0} max={1} step={0.05} onChange={setT} />}
          <Readout
            items={[
              `A = U\\,\\Sigma\\,V^T = ${texMat(U)}${texMat(S)}${texMat(Vt)}`,
              `\\sigma_1 = ${fmt(s[0])},\\quad \\sigma_2 = ${fmt(s[1])}`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Vᵀ gira el plano para alinear las direcciones v₁ y v₂ con los ejes; Σ estira cada eje por σ₁ y σ₂, y el círculo se vuelve
            una elipse; U la gira a su posición final. Los semiejes de la elipse miden exactamente σ₁ y σ₂.
            {s[1] < 1e-9 && ' Con σ₂ = 0 la elipse se aplasta en un segmento: la matriz tiene rango 1.'}
          </p>
        </>
      }
    />
  )
}
