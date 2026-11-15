import { useState } from 'react'
import { angle, dot, fmt, normL2, project, type Vec2 } from '../../lib/linalg'
import { Readout, VizLayout } from './controls'
import { Arrow, Dot, Handle, Plane, Segment } from './plane'

/** Producto punto como "cuánto de a apunta en la dirección de b". */
export function DotProductProjection() {
  const [a, setA] = useState<Vec2>([2, 3])
  const [b, setB] = useState<Vec2>([4, 1])
  const p = project(a, b) as Vec2
  const d = dot(a, b)
  const th = (angle(a, b) * 180) / Math.PI
  const sign = Math.abs(d) < 1e-9 ? 'cero: son perpendiculares' : d > 0 ? 'positivo: apuntan en direcciones parecidas' : 'negativo: apuntan en direcciones opuestas'

  return (
    <VizLayout
      plot={
        <Plane xRange={[-6, 6]} yRange={[-5, 5]} ariaLabel="Proyección de a sobre b">
          <Segment from={[-b[0] * 10, -b[1] * 10]} to={[b[0] * 10, b[1] * 10]} />
          <Segment from={a} to={p} color="d" />
          <Arrow to={p} color="c" width={5} label="proy" />
          <Arrow to={a} color="a" label="a" />
          <Arrow to={b} color="b" label="b" />
          <Dot at={p} color="d" />
          <Handle at={a} onChange={setA} color="a" label="Vector a" />
          <Handle at={b} onChange={setB} color="b" label="Vector b" />
        </Plane>
      }
      side={
        <>
          <Readout
            items={[
              `a \\cdot b = ${fmt(a[0])}\\cdot${fmt(b[0])} + ${fmt(a[1])}\\cdot${fmt(b[1])} = \\mathbf{${fmt(d)}}`,
              `\\|a\\|\\,\\|b\\|\\cos\\theta = ${fmt(normL2(a))}\\cdot${fmt(normL2(b))}\\cdot\\cos(${fmt(th, 1)}^\\circ) = ${fmt(normL2(a) * normL2(b) * Math.cos((th * Math.PI) / 180))}`,
              `\\text{proy}_b(a) = \\frac{a\\cdot b}{b \\cdot b}\\,b = (${fmt(p[0])},\\ ${fmt(p[1])})`,
            ]}
          />
          <p className="text-sm">
            El producto punto es <strong>{sign}</strong>.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            La flecha verde es la sombra de a sobre la recta de b. El producto punto es la longitud de esa sombra multiplicada por ‖b‖
            (con signo). Prueba a poner a perpendicular a b.
          </p>
        </>
      }
    />
  )
}
