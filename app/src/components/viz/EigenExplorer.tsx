import { useState } from 'react'
import { angle, eig2, fmt, matVec, normL2, type Mat, type Vec2 } from '../../lib/linalg'
import { MatrixInput2, Readout, VizLayout, texMat } from './controls'
import { Arrow, Dot, Handle, Plane, Polyline, Segment } from './plane'

const PRESETS: Record<string, { label: string; m: Mat }> = {
  simetrica: { label: 'Simétrica [[2,1],[1,2]]', m: [[2, 1], [1, 2]] },
  general: { label: '[[3,1],[0,2]]', m: [[3, 1], [0, 2]] },
  escala: { label: 'Diagonal', m: [[2, 0], [0, 0.5]] },
  reflexion: { label: 'Reflexión', m: [[0, 1], [1, 0]] },
  rotacion: { label: 'Rotación 90°', m: [[0, -1], [1, 0]] },
}

/**
 * Busca las direcciones que la matriz solo estira: arrastra v hasta que Av quede sobre la misma recta.
 * Los vectores grises muestran a dónde va cada dirección del círculo unidad.
 */
export function EigenExplorer() {
  const [M, setM] = useState<Mat>(PRESETS.simetrica.m)
  const [v, setV] = useState<Vec2>([1.5, 0.5])
  const Av = matVec(M, v) as Vec2
  const e = eig2(M)
  const ang = (angle(v, Av) * 180) / Math.PI
  const parallel = normL2(v) > 1e-9 && normL2(Av) > 1e-9 && (ang < 2 || ang > 178)
  const lambda = parallel ? (ang < 90 ? 1 : -1) * (normL2(Av) / normL2(v)) : null
  const zero = normL2(v) > 1e-9 && normL2(Av) < 1e-9

  const fan = Array.from({ length: 24 }, (_, i) => {
    const t = (i * Math.PI) / 12
    const p: Vec2 = [Math.cos(t), Math.sin(t)]
    return { p, q: matVec(M, p) as Vec2 }
  })
  const circle = Array.from({ length: 73 }, (_, i) => [Math.cos((i * Math.PI) / 36), Math.sin((i * Math.PI) / 36)] as Vec2)
  const image = circle.map((p) => matVec(M, p) as Vec2)

  return (
    <VizLayout
      plot={
        <Plane xRange={[-4, 4]} yRange={[-4, 4]} ariaLabel="Búsqueda de vectores propios">
          {e &&
            e.vectors.map((d, i) => <Segment key={i} from={[-d[0] * 10, -d[1] * 10]} to={[d[0] * 10, d[1] * 10]} color="c" />)}
          <Polyline points={circle} color="muted" width={1} dashed />
          <Polyline points={image} color="d" width={1.5} />
          {fan.map(({ p, q }, i) => (
            <g key={i}>
              <Segment from={p} to={q} color="muted" dashed={false} width={0.6} />
              <Dot at={q} color="d" r={2} />
            </g>
          ))}
          <Arrow to={Av} color={parallel ? 'c' : 'b'} label="Av" width={3} />
          <Arrow to={v} color="a" label="v" />
          <Handle at={v} onChange={setV} color="a" snap={0.05} label="Vector v" />
        </Plane>
      }
      side={
        <>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(PRESETS).map(([k, p]) => (
              <button
                key={k}
                type="button"
                onClick={() => setM(p.m)}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:border-brand-500 dark:border-slate-700"
              >
                {p.label}
              </button>
            ))}
          </div>
          <MatrixInput2 value={M} onChange={setM} />
          <div
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              parallel || zero ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-slate-50 dark:bg-slate-900'
            }`}
          >
            {zero
              ? '¡v es un vector propio con λ = 0! A lo aplasta hasta el origen.'
              : parallel
                ? `¡Encontrado! Av = ${fmt(lambda!)}·v: v es un vector propio con λ ≈ ${fmt(lambda!)}`
                : `Av forma ${fmt(ang, 0)}° con v: todavía no es un vector propio.`}
          </div>
          <Readout
            items={[
              `Av = ${texMat(M)}${texMat(v)} = ${texMat(Av)}`,
              e
                ? `\\lambda_1 = ${fmt(e.values[0])},\\ v_1 = ${texMat(e.vectors[0])};\\quad \\lambda_2 = ${fmt(e.values[1])},\\ v_2 = ${texMat(e.vectors[1])}`
                : '\\text{Valores propios complejos: ninguna dirección real se conserva}',
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            El círculo discontinuo se transforma en la curva naranja; cada segmento gris une un punto del círculo con su imagen. Sobre
            las rectas verdes (direcciones propias) los vectores no giran: solo se estiran, encogen o invierten.
          </p>
        </>
      }
    />
  )
}
