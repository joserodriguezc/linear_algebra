import { useState } from 'react'
import { fmt, invSmall, matMul, matVec, projectionMatrix, transpose, type Mat } from '../../lib/linalg'
import { texMat } from '../../lib/tex'
import { add3, project3, scale3, type Vec3 } from '../../lib/view3d'
import { Readout, Slider, VizLayout } from './controls'

const X: Mat = [
  [1, 0],
  [1, 1],
  [1, 2],
] // columnas: unos (término independiente) y x = (0, 1, 2)
/** (XᵀX)⁻¹Xᵀ: convierte las observaciones y en los coeficientes b = (b₀, b₁). */
const COEFS: Mat = matMul(invSmall(matMul(transpose(X), X))!, transpose(X))
const ONES: Vec3 = [1, 1, 1]
const XS: Vec3 = [0, 1, 2]

const W = 420
const H = 380
const S = 46 // píxeles por unidad

/**
 * Con 3 observaciones, y es un vector de ℝ³. Las predicciones posibles Xb forman un plano (el espacio
 * columna de X). Mínimos cuadrados elige el punto del plano más cercano a y: su proyección ortogonal.
 */
export function RegressionAsProjection3D() {
  const [y, setY] = useState<Vec3>([1, 4, 3])
  const [yaw, setYaw] = useState(-35)
  const [pitch, setPitch] = useState(25)
  const P = projectionMatrix(X)!
  const yhat = matVec(P, y) as Vec3
  const r: Vec3 = [y[0] - yhat[0], y[1] - yhat[1], y[2] - yhat[2]]
  const b = matVec(COEFS, y)
  const Xtr = matVec(transpose(X), r)

  const to2 = (p: Vec3) => {
    const q = project3(p, yaw, pitch)
    return [W / 2 + q.x * S - 40, H / 2 - q.y * S + 70] as const
  }
  const line = (a: Vec3, c: Vec3, color: string, width = 2, dash?: string, marker?: string) => {
    const [x1, y1] = to2(a)
    const [x2, y2] = to2(c)
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dash} markerEnd={marker} />
  }
  const label = (p: Vec3, text: string, color: string) => {
    const [px, py] = to2(p)
    return (
      <text x={px + 6} y={py - 6} fontSize={13} fontWeight={600} fill={color}>
        {text}
      </text>
    )
  }
  // Trozo del plano Im(X) = {s·1 + t·x}
  const patch = [
    [-0.5, -1],
    [4.5, -1],
    [4.5, 2.5],
    [-0.5, 2.5],
  ].map(([s, t]) => to2(add3(scale3(ONES, s), scale3(XS, t))))

  return (
    <VizLayout
      plot={
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full select-none" role="img" aria-label="La regresión como proyección de y sobre el plano generado por las columnas de X">
          <defs>
            {(['a', 'b', 'c', 'd'] as const).map((c) => (
              <marker key={c} id={`r3-${c}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill={`var(--viz-${c})`} />
              </marker>
            ))}
          </defs>
          <polygon points={patch.map((p) => p.join(',')).join(' ')} fill="var(--viz-c)" fillOpacity={0.1} stroke="var(--viz-c)" strokeOpacity={0.4} />
          {line([0, 0, 0], [5, 0, 0], 'var(--viz-axis)', 1)}
          {line([0, 0, 0], [0, 5, 0], 'var(--viz-axis)', 1)}
          {line([0, 0, 0], [0, 0, 5], 'var(--viz-axis)', 1)}
          {label([5.1, 0, 0], 'obs. 1', 'var(--viz-muted)')}
          {label([0, 5.1, 0], 'obs. 2', 'var(--viz-muted)')}
          {label([0, 0, 5.1], 'obs. 3', 'var(--viz-muted)')}
          {line([0, 0, 0], ONES, 'var(--viz-a)', 2, undefined, 'url(#r3-a)')}
          {label(ONES, '1', 'var(--viz-a)')}
          {line([0, 0, 0], XS, 'var(--viz-a)', 2, undefined, 'url(#r3-a)')}
          {label(XS, 'x', 'var(--viz-a)')}
          {line(yhat, y, 'var(--viz-b)', 2, '5 4')}
          {line([0, 0, 0], yhat, 'var(--viz-c)', 3.5, undefined, 'url(#r3-c)')}
          {label(yhat, 'ŷ = Xb', 'var(--viz-c)')}
          {line([0, 0, 0], y, 'var(--viz-d)', 3, undefined, 'url(#r3-d)')}
          {label(y, 'y', 'var(--viz-d)')}
        </svg>
      }
      side={
        <>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Observaciones y (con x = 0, 1, 2)</p>
          <Slider label="y₁" value={y[0]} min={0} max={5} step={0.1} onChange={(v) => setY([v, y[1], y[2]])} />
          <Slider label="y₂" value={y[1]} min={0} max={5} step={0.1} onChange={(v) => setY([y[0], v, y[2]])} />
          <Slider label="y₃" value={y[2]} min={0} max={5} step={0.1} onChange={(v) => setY([y[0], y[1], v])} />
          <p className="pt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Vista</p>
          <Slider label="girar" value={yaw} min={-90} max={90} step={1} onChange={setYaw} />
          <Slider label="inclinar" value={pitch} min={-10} max={60} step={1} onChange={setPitch} />
          <Readout
            items={[
              `b = ${texMat(b)} \\;\\Rightarrow\\; \\hat{y} = ${fmt(b[0])} + ${fmt(b[1])}\\,x`,
              `\\hat{y} = Py = ${texMat(yhat)},\\quad y - \\hat{y} = ${texMat(r)}`,
              `X^T(y - \\hat{y}) = ${texMat(Xtr, 3)}`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cada eje es una observación. Las columnas de X (azul: la de unos y la de x) generan el plano verde: todas las predicciones
            Xb posibles. La recta de mínimos cuadrados corresponde al punto ŷ del plano más cercano a y; el residuo (rojo) es
            perpendicular al plano, por eso Xᵀ(y − ŷ) = 0.
          </p>
        </>
      }
    />
  )
}
