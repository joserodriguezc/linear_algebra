import { useMemo, useState } from 'react'
import { eig2, fmt, invSmall, type Mat, type Vec2 } from '../../lib/linalg'
import { rng } from '../../lib/random'
import { Readout, Segmented, Slider, VizLayout } from './controls'
import { Dot, Handle, Label, Plane, Polyline } from './plane'

/** 10 puntos de y ≈ 1 + x con ruido, x entre 0.5 y 3.5. */
const DATA: Vec2[] = (() => {
  const r = rng(11)
  return Array.from({ length: 10 }, (_, i) => {
    const x = 0.5 + (i * 3) / 9
    return [x, 1 + x + 0.4 * r.normal()] as Vec2
  })
})()
const XS = DATA.map(([x]) => x)
const MEAN = XS.reduce((s, v) => s + v, 0) / XS.length
const SD = Math.sqrt(XS.reduce((s, v) => s + (v - MEAN) ** 2, 0) / XS.length)
const LEVELS = [0.03, 0.15, 0.5, 1.2, 2.5, 4.5]
const BATCH = 2

type Scaling = 'raw' | 'std'
type Mode = 'full' | 'mini'

/** Gradiente del ECM sobre las filas indicadas: (2/m)·X_Bᵀ(X_B b − y_B). */
function gradient(rows: [number, number, number][], b: Vec2): Vec2 {
  const g: Vec2 = [0, 0]
  for (const [x0, x1, y] of rows) {
    const r = x0 * b[0] + x1 * b[1] - y
    g[0] += x0 * r
    g[1] += x1 * r
  }
  return [(2 / rows.length) * g[0], (2 / rows.length) * g[1]]
}

/**
 * Descenso de gradiente para la regresión ŷ = b₀ + b₁x, dibujado en el plano de los parámetros (b₀, b₁).
 * Las curvas de nivel del ECM son elipses cuya forma da XᵀX: con x sin escalar son alargadas
 * (κ grande) y el descenso zigzaguea; con x estandarizada son casi círculos y va directo al mínimo.
 */
export function GradientDescentPath() {
  const [scaling, setScaling] = useState<Scaling>('raw')
  const [mode, setMode] = useState<Mode>('full')
  const [eta, setEta] = useState(0.15)
  const [steps, setSteps] = useState(25)
  const [start, setStart] = useState<Vec2>([-2, 3])

  const rows = useMemo(
    () => DATA.map(([x, y]) => [1, scaling === 'raw' ? x : (x - MEAN) / SD, y] as [number, number, number]),
    [scaling],
  )
  // A = XᵀX/n: el ECM es ECM_min + (b − b*)ᵀA(b − b*)
  const A: Mat = [0, 1].map((i) => [0, 1].map((j) => rows.reduce((s, r) => s + r[i] * r[j], 0) / rows.length))
  const Xty = [0, 1].map((i) => rows.reduce((s, r) => s + r[i] * r[2], 0) / rows.length)
  const Ai = invSmall(A)!
  const bStar: Vec2 = [Ai[0][0] * Xty[0] + Ai[0][1] * Xty[1], Ai[1][0] * Xty[0] + Ai[1][1] * Xty[1]]
  const e = eig2(A)!
  const [lMax, lMin] = e.values
  const mse = (b: Vec2) => rows.reduce((s, [x0, x1, y]) => s + (x0 * b[0] + x1 * b[1] - y) ** 2, 0) / rows.length

  const ellipses = LEVELS.map((c) =>
    Array.from({ length: 73 }, (_, k) => {
      const t = (k * Math.PI) / 36
      const u = Math.sqrt(c / lMax) * Math.cos(t)
      const v = Math.sqrt(c / lMin) * Math.sin(t)
      return [bStar[0] + u * e.vectors[0][0] + v * e.vectors[1][0], bStar[1] + u * e.vectors[0][1] + v * e.vectors[1][1]] as Vec2
    }),
  )

  const path: Vec2[] = [start]
  let diverged = false
  const r = rng(5)
  let order: number[] = []
  let b = start
  for (let k = 0; k < steps; k++) {
    let batch = rows
    if (mode === 'mini') {
      if (order.length === 0) {
        order = rows.map((_, i) => i)
        for (let i = order.length - 1; i > 0; i--) {
          const j = Math.floor(r.next() * (i + 1))
          ;[order[i], order[j]] = [order[j], order[i]]
        }
      }
      batch = order.splice(0, BATCH).map((i) => rows[i])
    }
    const g = gradient(batch, b)
    b = [b[0] - eta * g[0], b[1] - eta * g[1]]
    if (Math.hypot(b[0], b[1]) > 60) {
      diverged = true
      break
    }
    path.push(b)
  }
  const last = path[path.length - 1]
  // Se dibuja hasta el primer punto que sale del gráfico (al diverger, los siguientes quedan muy lejos)
  const out = path.findIndex(([u, v]) => u < -3.5 || u > 6.5 || v < -2.5 || v > 4.5)
  const visible = out === -1 ? path : path.slice(0, out + 1)

  return (
    <VizLayout
      plot={
        <Plane xRange={[-3, 6]} yRange={[-2, 4]} ariaLabel="Curvas de nivel del error y trayectoria del descenso de gradiente">
          {ellipses.map((pts, i) => (
            <Polyline key={i} points={pts} color="muted" width={1} />
          ))}
          <Polyline points={visible} color="d" width={2} />
          {visible.slice(1).map((p, i) => (
            <Dot key={i} at={p} color="d" r={2.5} />
          ))}
          <Dot at={bStar} color="a" r={5} />
          <Label at={[bStar[0] + 0.15, bStar[1] + 0.15]} color="a">
            b*
          </Label>
          <Label at={[5.6, -0.25]} anchor="end">
            b₀
          </Label>
          <Label at={[0.12, 3.7]}>b₁</Label>
          <Handle at={start} onChange={setStart} color="b" snap={0.1} label="Punto de partida" />
        </Plane>
      }
      side={
        <>
          <div className="space-y-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">Característica x</p>
            <Segmented
              options={[
                { value: 'raw', label: 'sin escalar' },
                { value: 'std', label: 'estandarizada' },
              ]}
              value={scaling}
              onChange={setScaling}
            />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">Gradiente con</p>
            <Segmented
              options={[
                { value: 'full', label: 'todas las filas' },
                { value: 'mini', label: `mini-lotes de ${BATCH}` },
              ]}
              value={mode}
              onChange={setMode}
            />
          </div>
          <Slider label="paso η" value={eta} min={0.01} max={1} step={0.01} onChange={setEta} />
          <Slider label="iteraciones" value={steps} min={0} max={80} step={1} onChange={setSteps} />
          <Readout
            items={[
              `\\kappa\\!\\left(X^TX\\right) = ${fmt(lMax / lMin, 1)}`,
              `\\text{converge si } \\eta < \\tfrac{1}{\\lambda_{\\max}(X^TX/n)} = ${fmt(1 / lMax, 3)}`,
              diverged
                ? `\\textbf{diverge: } \\eta \\text{ demasiado grande}`
                : `b_{${steps}} = (${fmt(last[0], 3)},\\ ${fmt(last[1], 3)})`,
              `b^* = (${fmt(bStar[0], 3)},\\ ${fmt(bStar[1], 3)})`,
              !diverged && `\\text{ECM}(b_{${steps}}) - \\text{ECM}(b^*) = ${fmt(mse(last) - mse(bStar), 4)}`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cada elipse gris une los b con el mismo error; b* es el mínimo que da la ecuación normal. Arrastra el punto rojo
            para cambiar el inicio. Con x sin escalar, las elipses son muy alargadas: el gradiente apunta casi en
            perpendicular al eje largo y el descenso zigzaguea. Estandariza x y el mismo paso llega casi en línea recta.
            Con mini-lotes, cada paso usa solo 2 filas de X: el camino se vuelve ruidoso, pero cada paso es mucho más barato.
          </p>
        </>
      }
    />
  )
}
