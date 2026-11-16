import { useState } from 'react'
import { dot, fmt, matMul, matVec, projectionMatrix, sub, type Vec2 } from '../../lib/linalg'
import { texMat } from '../../lib/tex'
import { Readout, VizLayout } from './controls'
import { Arrow, Dot, Handle, Plane, Polyline, Segment } from './plane'

/** La proyección sobre una recta como matriz: P = bbᵀ/(bᵀb), con P² = P y el residuo perpendicular. */
export function ProjectionMatrix2D() {
  const [b, setB] = useState<Vec2>([3, 1])
  const [x, setX] = useState<Vec2>([1, 3])
  const [twice, setTwice] = useState(false)
  const P = projectionMatrix([[b[0]], [b[1]]])
  if (!P) {
    return (
      <Plane xRange={[-5, 5]} yRange={[-4, 4]}>
        <Handle at={b} onChange={setB} color="b" label="Vector b" />
      </Plane>
    )
  }
  const p = matVec(P, x) as Vec2
  const pp = matVec(P, p) as Vec2
  const r = sub(x, p) as Vec2
  const P2 = matMul(P, P)
  // Marca de ángulo recto en el pie de la proyección
  const nb = Math.hypot(...b)
  const nr = Math.hypot(...r)
  const u: Vec2 = [(b[0] / nb) * 0.35, (b[1] / nb) * 0.35]
  const w: Vec2 = nr > 1e-6 ? [(r[0] / nr) * 0.35, (r[1] / nr) * 0.35] : [0, 0]
  const corner: Vec2[] = [
    [p[0] + w[0], p[1] + w[1]],
    [p[0] + w[0] - u[0], p[1] + w[1] - u[1]],
    [p[0] - u[0], p[1] - u[1]],
  ]

  return (
    <VizLayout
      plot={
        <Plane xRange={[-5, 5]} yRange={[-4, 4]} ariaLabel="Proyección ortogonal sobre una recta">
          <Segment from={[-b[0] * 10, -b[1] * 10]} to={[b[0] * 10, b[1] * 10]} color="muted" />
          <Segment from={x} to={p} color="d" />
          {nr > 1e-6 && <Polyline points={corner} color="d" width={1.2} />}
          <Arrow to={x} color="a" label="x" />
          <Arrow to={b} color="b" label="b" width={2} />
          <Arrow to={p} color="c" label="Px" width={4} />
          {twice && <Dot at={pp} color="d" r={7} opacity={0.6} />}
          <Handle at={x} onChange={setX} color="a" label="Vector x" />
          <Handle at={b} onChange={setB} color="b" label="Vector b que genera la recta" />
        </Plane>
      }
      side={
        <>
          <Readout
            items={[
              `P = \\frac{b\\,b^T}{b^Tb} = ${texMat(P)}`,
              `Px = ${texMat(p)},\\quad x - Px = ${texMat(r)}`,
              `b \\cdot (x - Px) = ${fmt(dot(b, r), 3)}`,
              twice && `P(Px) = ${texMat(pp)} = Px,\\quad P^2 = ${texMat(P2)} = P`,
            ]}
          />
          <button
            type="button"
            onClick={() => setTwice((t) => !t)}
            className="rounded-md bg-brand-600 px-2 py-1 text-xs font-semibold text-white hover:bg-brand-700"
          >
            {twice ? 'Ocultar' : 'Proyectar otra vez'}
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Px (verde) es el punto de la recta más cercano a x; el residuo x − Px (naranja) es perpendicular a la recta: su producto
            punto con b es 0. Proyectar un punto que ya está en la recta no lo mueve, por eso P² = P.
          </p>
        </>
      }
    />
  )
}
