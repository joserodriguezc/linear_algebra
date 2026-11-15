import { useState } from 'react'
import { cov, eig2, fmt, mean, type Vec2 } from '../../lib/linalg'
import { correlatedCloud } from '../../lib/random'
import { Readout, Segmented, VizLayout, texMat } from './controls'
import { Dot, Handle, Plane, Polygon, Polyline, Segment } from './plane'

const PRESETS: Record<string, { label: string; pts: () => Vec2[] }> = {
  positiva: { label: 'Correlación positiva', pts: () => correlatedCloud(14, { mx: 0.5, my: 0.3, sx: 2, sy: 1.6, rho: 0.92, seed: 4 }) },
  negativa: { label: 'Negativa', pts: () => correlatedCloud(14, { mx: 0, my: 0.5, sx: 2, sy: 1.5, rho: -0.8, seed: 7 }) },
  nula: { label: 'Sin correlación', pts: () => correlatedCloud(14, { mx: 0, my: 0, sx: 1.8, sy: 1.6, rho: 0, seed: 11 }) },
}

type Mode = 'productos' | 'elipse'

/**
 * Arrastra los puntos. La covarianza es la media de los productos (x − x̄)(y − ȳ): cada punto aporta
 * un rectángulo verde (producto positivo) o rojo (negativo) respecto al centro de los datos.
 */
export function CovarianceExplorer() {
  const [pts, setPts] = useState<Vec2[]>(PRESETS.positiva.pts)
  const [mode, setMode] = useState<Mode>('productos')
  const mu = mean(pts) as Vec2
  const C = cov(pts)
  const sx = Math.sqrt(C[0][0])
  const sy = Math.sqrt(C[1][1])
  const r = sx > 0 && sy > 0 ? C[0][1] / (sx * sy) : 0
  const e = eig2(C)
  const ellipse: Vec2[] = e
    ? Array.from({ length: 73 }, (_, i) => {
        const t = (i * Math.PI) / 36
        const a = 2 * Math.sqrt(Math.max(0, e.values[0])) * Math.cos(t)
        const b = 2 * Math.sqrt(Math.max(0, e.values[1])) * Math.sin(t)
        return [mu[0] + a * e.vectors[0][0] + b * e.vectors[1][0], mu[1] + a * e.vectors[0][1] + b * e.vectors[1][1]] as Vec2
      })
    : []

  return (
    <VizLayout
      plot={
        <Plane xRange={[-6, 6]} yRange={[-5, 5]} ariaLabel="Nube de puntos y su covarianza">
          {mode === 'productos' &&
            pts.map((p, i) => {
              const pos = (p[0] - mu[0]) * (p[1] - mu[1]) >= 0
              return (
                <Polygon
                  key={i}
                  points={[mu, [p[0], mu[1]], p, [mu[0], p[1]]]}
                  color={pos ? 'c' : 'b'}
                  opacity={0.12}
                  stroke={false}
                />
              )
            })}
          {mode === 'elipse' && ellipse.length > 0 && <Polyline points={ellipse} color="d" width={2} />}
          {mode === 'elipse' &&
            e &&
            e.vectors.map((v, i) => (
              <Segment
                key={i}
                from={mu}
                to={[mu[0] + 2 * Math.sqrt(Math.max(0, e.values[i])) * v[0], mu[1] + 2 * Math.sqrt(Math.max(0, e.values[i])) * v[1]]}
                color="d"
                dashed={false}
                width={2}
              />
            ))}
          <Segment from={[mu[0], -10]} to={[mu[0], 10]} />
          <Segment from={[-10, mu[1]]} to={[10, mu[1]]} />
          <Dot at={mu} color="d" r={6} />
          {pts.map((p, i) => (
            <Handle
              key={i}
              at={p}
              r={6}
              snap={0.1}
              color={mode === 'productos' ? ((p[0] - mu[0]) * (p[1] - mu[1]) >= 0 ? 'c' : 'b') : 'a'}
              label={`Punto ${i + 1}`}
              onChange={(q) => setPts(pts.map((x, j) => (j === i ? q : x)))}
            />
          ))}
        </Plane>
      }
      side={
        <>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(PRESETS).map(([k, p]) => (
              <button
                key={k}
                type="button"
                onClick={() => setPts(p.pts())}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:border-brand-500 dark:border-slate-700"
              >
                {p.label}
              </button>
            ))}
          </div>
          <Segmented
            value={mode}
            onChange={setMode}
            options={[
              { value: 'productos', label: 'Productos (x−x̄)(y−ȳ)' },
              { value: 'elipse', label: 'Elipse de covarianza' },
            ]}
          />
          <Readout
            items={[
              `\\bar{x} = ${fmt(mu[0])},\\quad \\bar{y} = ${fmt(mu[1])}`,
              `s_x = ${fmt(sx)},\\quad s_y = ${fmt(sy)}`,
              `\\operatorname{cov}(x, y) = ${fmt(C[0][1])},\\quad r = ${fmt(r)}`,
              `\\Sigma = ${texMat(C)}`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'productos'
              ? 'Los puntos arriba a la derecha o abajo a la izquierda del centro (naranja) aportan productos positivos (verde); los otros dos cuadrantes, negativos (rojo). La covarianza es su promedio: su signo dice qué color domina.'
              : 'La elipse abarca unas 2 desviaciones estándar. Sus ejes son los vectores propios de la matriz de covarianza Σ y sus longitudes, 2·√λ: es exactamente lo que usará PCA.'}
          </p>
        </>
      }
    />
  )
}
