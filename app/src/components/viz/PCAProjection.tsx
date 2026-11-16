import { useMemo, useState } from 'react'
import { cov, eig2, fmt, mean, type Vec2 } from '../../lib/linalg'
import { correlatedCloud } from '../../lib/random'
import { Readout, Slider, VizLayout } from './controls'
import { Arrow, Dot, Plane, Segment } from './plane'

/**
 * PCA busca la dirección sobre la que los datos proyectados tienen máxima varianza.
 * Gira la recta y observa la varianza de las proyecciones; luego compárala con λ₁.
 */
export function PCAProjection() {
  const pts = useMemo(() => correlatedCloud(40, { mx: 0.5, my: 0.2, sx: 2.2, sy: 1.3, rho: 0.75, seed: 5 }), [])
  const [deg, setDeg] = useState(100)
  const [showPC, setShowPC] = useState(false)
  const mu = mean(pts) as Vec2
  const C = cov(pts)
  const e = eig2(C)!
  const pc1 = e.vectors[0]
  const pc1deg = ((Math.atan2(pc1[1], pc1[0]) * 180) / Math.PI + 180) % 180

  const th = (deg * Math.PI) / 180
  const d: Vec2 = [Math.cos(th), Math.sin(th)]
  const scores = pts.map((p) => (p[0] - mu[0]) * d[0] + (p[1] - mu[1]) * d[1])
  const varProj = scores.reduce((a, s) => a + s * s, 0) / (pts.length - 1)
  const total = e.values[0] + e.values[1]
  // Error de reconstrucción: distancia² de cada punto a su proyección (misma normalización n − 1)
  const recError =
    pts.reduce((a, p, i) => {
      const q: Vec2 = [mu[0] + scores[i] * d[0], mu[1] + scores[i] * d[1]]
      return a + (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2
    }, 0) /
    (pts.length - 1)

  return (
    <VizLayout
      plot={
        <Plane xRange={[-6, 6]} yRange={[-5, 5]} ariaLabel="Proyección de los datos sobre una dirección">
          <Segment from={[mu[0] - 10 * d[0], mu[1] - 10 * d[1]]} to={[mu[0] + 10 * d[0], mu[1] + 10 * d[1]]} color="a" dashed={false} width={2} />
          {pts.map((p, i) => {
            const q: Vec2 = [mu[0] + scores[i] * d[0], mu[1] + scores[i] * d[1]]
            return (
              <g key={i}>
                <Segment from={p} to={q} color="muted" width={0.8} />
                <Dot at={p} color="muted" r={3.5} />
                <Dot at={q} color="a" r={3} />
              </g>
            )
          })}
          {showPC &&
            e.vectors.map((v, i) => (
              <Arrow
                key={i}
                from={mu}
                to={[mu[0] + 2 * Math.sqrt(e.values[i]) * v[0], mu[1] + 2 * Math.sqrt(e.values[i]) * v[1]]}
                color={i === 0 ? 'c' : 'b'}
                label={`PC${i + 1}`}
                width={3}
              />
            ))}
          <Dot at={mu} color="d" r={5} />
        </Plane>
      }
      side={
        <>
          <Slider label="ángulo (°)" value={deg} min={0} max={179} step={1} onChange={setDeg} />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDeg(Math.round(pc1deg))}
              className="rounded-md bg-brand-600 px-2 py-1 text-xs font-semibold text-white hover:bg-brand-700"
            >
              Ir a la máxima varianza
            </button>
            <label className="flex items-center gap-1.5 text-sm">
              <input type="checkbox" checked={showPC} onChange={(ev) => setShowPC(ev.target.checked)} />
              Mostrar PC1 y PC2
            </label>
          </div>
          <div>
            <p className="mb-1 text-xs text-slate-500">Varianza de las proyecciones (azul) frente al máximo posible λ₁</p>
            <div className="h-4 w-full overflow-hidden rounded bg-slate-100 dark:bg-slate-800">
              <div className="h-full bg-blue-500" style={{ width: `${(varProj / e.values[0]) * 100}%` }} />
            </div>
          </div>
          <Readout
            items={[
              `\\operatorname{Var}(\\text{proyecciones}) = ${fmt(varProj)}`,
              `\\text{error de reconstrucción} = ${fmt(recError)}`,
              `${fmt(varProj)} + ${fmt(recError)} = ${fmt(total)} = \\lambda_1 + \\lambda_2 \\ \\text{(varianza total)}`,
              `\\lambda_1 = ${fmt(e.values[0])},\\quad \\lambda_2 = ${fmt(e.values[1])}`,
              `\\text{varianza explicada por PC1} = \\frac{\\lambda_1}{\\lambda_1 + \\lambda_2} = ${fmt((e.values[0] / total) * 100, 1)}\\%`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cada punto gris se proyecta en perpendicular sobre la recta (puntos azules). Gira la recta: la varianza de las proyecciones
            es máxima justo en la dirección de PC1 (vale λ₁) y mínima en la perpendicular (vale λ₂). Como varianza proyectada + error de
            reconstrucción siempre suman la varianza total, maximizar la primera es lo mismo que minimizar el error: proyectar sobre PC1
            reduce los datos de 2 dimensiones a 1 perdiendo la menor información posible.
          </p>
        </>
      }
    />
  )
}
