import { useState } from 'react'
import { fmt, qr2, type Vec2 } from '../../lib/linalg'
import { Readout, Segmented, VizLayout, texMat } from './controls'
import { Arrow, Handle, Plane, Polyline, Segment } from './plane'

type Stage = 'a' | 'q1' | 'proj' | 'q2'

/** QR por Gram-Schmidt: de dos columnas cualesquiera a dos direcciones perpendiculares de longitud 1. */
export function GramSchmidt2D() {
  const [a1, setA1] = useState<Vec2>([3, 1])
  const [a2, setA2] = useState<Vec2>([2, 3])
  const [stage, setStage] = useState<Stage>('q2')
  const r = qr2(a1, a2)
  const order: Stage[] = ['a', 'q1', 'proj', 'q2']
  const at = (s: Stage) => order.indexOf(stage) >= order.indexOf(s)

  // Ángulo recto entre q1 y q2 (pequeño cuadrado)
  const corner = r
    ? ([
        [r.q1[0] * 0.35, r.q1[1] * 0.35],
        [r.q1[0] * 0.35 + r.q2[0] * 0.35, r.q1[1] * 0.35 + r.q2[1] * 0.35],
        [r.q2[0] * 0.35, r.q2[1] * 0.35],
      ] as Vec2[])
    : []

  return (
    <VizLayout
      plot={
        <Plane xRange={[-4, 5]} yRange={[-3, 5]} ariaLabel="Ortogonalización de Gram-Schmidt">
          <Arrow to={a1} color="a" label="a₁" width={2} />
          <Arrow to={a2} color="b" label="a₂" width={2} />
          {r && at('proj') && (
            <>
              <Segment from={[-r.q1[0] * 10, -r.q1[1] * 10]} to={[r.q1[0] * 10, r.q1[1] * 10]} />
              <Arrow to={r.proj} color="d" width={2} dashed />
              <Arrow from={r.proj} to={a2} color="muted" width={2} dashed />
            </>
          )}
          {r && at('q2') && (
            <>
              <Arrow to={r.perp} color="muted" width={1.5} label="a₂ − proy" />
              <Polyline points={corner} color="c" width={1.5} />
              <Arrow to={r.q2} color="c" label="q₂" width={4} />
            </>
          )}
          {r && at('q1') && <Arrow to={r.q1} color="c" label="q₁" width={4} />}
          <Handle at={a1} onChange={setA1} color="a" label="Columna a1" />
          <Handle at={a2} onChange={setA2} color="b" label="Columna a2" />
        </Plane>
      }
      side={
        <>
          <Segmented
            value={stage}
            onChange={setStage}
            options={[
              { value: 'a', label: '0. Columnas' },
              { value: 'q1', label: '1. Normalizar a₁' },
              { value: 'proj', label: '2. Proyectar a₂' },
              { value: 'q2', label: '3. Restar y normalizar' },
            ]}
          />
          {r ? (
            <Readout
              items={[
                `r_{11} = \\|a_1\\| = ${fmt(r.R[0][0])},\\quad q_1 = \\frac{a_1}{r_{11}} = (${fmt(r.q1[0])},\\ ${fmt(r.q1[1])})`,
                at('proj') && `r_{12} = q_1 \\cdot a_2 = ${fmt(r.R[0][1])}`,
                at('q2') && `r_{22} = \\|a_2 - r_{12}\\,q_1\\| = ${fmt(r.R[1][1])},\\quad q_2 = (${fmt(r.q2[0])},\\ ${fmt(r.q2[1])})`,
                at('q2') && `Q = ${texMat([[r.q1[0], r.q2[0]], [r.q1[1], r.q2[1]]])},\\quad R = ${texMat(r.R)}`,
              ]}
            />
          ) : (
            <p className="text-sm text-red-600">Las columnas son paralelas (o una es nula): no hay una segunda dirección independiente.</p>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            q₁ apunta como a₁. A a₂ se le quita su "sombra" sobre q₁ y lo que queda es perpendicular a q₁; al normalizarlo se obtiene
            q₂. R guarda las longitudes y proyecciones usadas, así que A = QR.
          </p>
        </>
      }
    />
  )
}
