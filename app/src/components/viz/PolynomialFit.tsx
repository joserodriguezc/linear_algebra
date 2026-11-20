import { useMemo, useState } from 'react'
import { fmt, invSmall, type Vec2 } from '../../lib/linalg'
import { rng } from '../../lib/random'
import { Readout, Segmented, Slider, VizLayout } from './controls'
import { Dot, Handle, Plane, Polyline } from './plane'

/** La curva «real» de la que salen los datos. */
const truth = (x: number) => 4 + 2.2 * Math.sin((x - 4) * 0.75)
/** Se escala x a [−1, 1] para que la matriz de Vandermonde no esté tan mal condicionada. */
const t = (x: number) => (x - 4) / 4

function noisy(n: number, seed: number, xs?: number[]): Vec2[] {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => {
    const x = xs ? xs[i] : 0.2 + r.next() * 7.6
    return [x, truth(x) + 0.45 * r.normal()] as Vec2
  })
}

const ALPHAS = ['0', '0.001', '0.01', '0.1', '1'] as const

/** Mínimos cuadrados (con Ridge opcional) sobre la matriz de Vandermonde de grado d. */
function polyFit(pts: Vec2[], d: number, alpha: number): number[] | null {
  const X = pts.map(([x]) => Array.from({ length: d + 1 }, (_, j) => t(x) ** j))
  const p = d + 1
  const G = Array.from({ length: p }, (_, i) =>
    Array.from({ length: p }, (_, j) => X.reduce((s, row) => s + row[i] * row[j], 0) + (i === j && i > 0 ? alpha : 0)),
  )
  const Xty = Array.from({ length: p }, (_, i) => X.reduce((s, row, k) => s + row[i] * pts[k][1], 0))
  const Gi = invSmall(G)
  if (!Gi) return null
  return Gi.map((row) => row.reduce((s, v, j) => s + v * Xty[j], 0))
}

const evalPoly = (b: number[], x: number) => b.reduce((s, c, j) => s + c * t(x) ** j, 0)
const mse = (b: number[], pts: Vec2[]) => pts.reduce((s, [x, y]) => s + (y - evalPoly(b, x)) ** 2, 0) / pts.length

/**
 * Regresión polinómica: la misma regresión lineal con columnas 1, x, x², …, x^d.
 * Sube el grado y compara el error en los datos de entrenamiento y en datos nuevos.
 */
export function PolynomialFit() {
  const initial = useMemo(() => noisy(12, 7, Array.from({ length: 12 }, (_, i) => 0.4 + i * 0.65)), [])
  const val = useMemo(() => noisy(60, 99), [])
  const [pts, setPts] = useState<Vec2[]>(initial)
  const [deg, setDeg] = useState(1)
  const [alpha, setAlpha] = useState<(typeof ALPHAS)[number]>('0')
  const b = polyFit(pts, deg, Number(alpha))
  const curve: Vec2[] = b ? Array.from({ length: 161 }, (_, i) => [i * 0.05, evalPoly(b, i * 0.05)] as Vec2) : []
  const clipped = curve.map(([x, y]) => [x, Math.max(-1, Math.min(9, y))] as Vec2)

  return (
    <VizLayout
      plot={
        <Plane xRange={[-0.5, 8.5]} yRange={[-1, 9]} ariaLabel="Ajuste polinómico por mínimos cuadrados">
          {val.map((p, i) => (
            <Dot key={i} at={p} color="muted" r={2.5} opacity={0.6} />
          ))}
          <Polyline points={clipped} color="a" width={2.5} />
          {pts.map((p, i) => (
            <Handle key={i} at={p} r={6} snap={0.1} color="d" label={`Punto ${i + 1}`} onChange={(q) => setPts(pts.map((x, j) => (j === i ? q : x)))} />
          ))}
        </Plane>
      }
      side={
        <>
          <Slider label="grado d del polinomio" value={deg} min={1} max={11} step={1} onChange={setDeg} />
          <div className="space-y-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">Penalización Ridge α</p>
            <Segmented options={ALPHAS.map((a) => ({ value: a, label: a }))} value={alpha} onChange={setAlpha} />
          </div>
          <Readout
            items={[
              `X = \\begin{bmatrix} ${(deg <= 3 ? Array.from({ length: deg + 1 }, (_, j) => j) : [0, 1, 2, -1, deg])
                .map((j) => (j === -1 ? '\\cdots' : j === 0 ? '1' : j === 1 ? 'x_i' : `x_i^{${j}}`))
                .join(' & ')} \\end{bmatrix}`,
              `X \\text{ es de } ${pts.length}\\times${deg + 1}`,
              b && `\\text{ECM entrenamiento} = ${fmt(mse(b, pts), 3)}`,
              b && `\\text{ECM datos nuevos} = \\mathbf{${fmt(mse(b, val), 3)}}`,
              b && `\\|b\\|_2 = ${fmt(Math.hypot(...b.slice(1)), 1)}`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Puntos naranjas: datos de entrenamiento (arrástralos). Puntos grises: datos nuevos del mismo fenómeno. Al subir el
            grado, el error de entrenamiento siempre baja, pero con grado alto la curva persigue el ruido y el error en datos nuevos
            se dispara (sobreajuste). Con grado 11 y 12 puntos la curva pasa exactamente por todos. Prueba entonces una
            penalización Ridge: los coeficientes se encogen y la curva vuelve a ser razonable.
          </p>
        </>
      }
    />
  )
}
