import { useState } from 'react'
import { add, coordsInBasis2, fmt, scale, type Vec2 } from '../../lib/linalg'
import { texMat } from '../../lib/tex'
import { Readout, VizLayout } from './controls'
import { Arrow, Handle, Plane, Polyline } from './plane'

/** Las mismas flechas, otras coordenadas: x expresado en la base estándar y en la base {b₁, b₂}. */
export function BasisChange2D() {
  const [b1, setB1] = useState<Vec2>([2, 1])
  const [b2, setB2] = useState<Vec2>([-1, 1])
  const [x, setX] = useState<Vec2>([1, 3])
  const c = coordsInBasis2(b1, b2, x)
  const P = (s: number, t: number) => add(scale(b1, s), scale(b2, t)) as Vec2
  const lines: Vec2[][] = []
  if (c) for (let k = -6; k <= 6; k++) lines.push([P(k, -8), P(k, 8)], [P(-8, k), P(8, k)])

  return (
    <VizLayout
      plot={
        <Plane xRange={[-5, 5]} yRange={[-4, 5]} ariaLabel="Cambio de base en el plano">
          {lines.map((l, i) => (
            <Polyline key={i} points={l} color="d" width={0.7} />
          ))}
          {c && (
            <>
              <Arrow to={scale(b1, c[0]) as Vec2} color="a" dashed width={1.5} />
              <Arrow from={scale(b1, c[0]) as Vec2} to={x} color="b" dashed width={1.5} />
            </>
          )}
          <Arrow to={x} color="c" label="x" width={3} />
          <Arrow to={b1} color="a" label="b₁" />
          <Arrow to={b2} color="b" label="b₂" />
          <Handle at={b1} onChange={setB1} color="a" label="Vector b1 de la base" />
          <Handle at={b2} onChange={setB2} color="b" label="Vector b2 de la base" />
          <Handle at={x} onChange={setX} color="c" label="Punto x" />
        </Plane>
      }
      side={
        <>
          {c ? (
            <Readout
              items={[
                `\\text{base estándar: } x = ${texMat(x)}`,
                `\\text{base } \\{b_1, b_2\\}\\text{: } [x]_B = ${texMat(c)}`,
                `x = ${fmt(c[0])}\\,b_1 + ${fmt(c[1])}\\,b_2`,
                `B = \\begin{bmatrix} b_1 & b_2 \\end{bmatrix} = ${texMat([[b1[0], b2[0]], [b1[1], b2[1]]])},\\quad [x]_B = B^{-1}x`,
              ]}
            />
          ) : (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
              b₁ y b₂ están en la misma recta: no forman una base y no todos los puntos tienen coordenadas en ellos.
            </p>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            La cuadrícula naranja es la de la nueva base. El punto x no se mueve al cambiar de base: lo que cambia son los números que lo
            describen. Para llegar a x se avanza c₁ veces b₁ (azul discontinuo) y luego c₂ veces b₂ (rojo discontinuo).
          </p>
        </>
      }
    />
  )
}
