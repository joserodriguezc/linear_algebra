import { useState } from 'react'
import { fitLine, fmt, type Vec2 } from '../../lib/linalg'
import { Readout, Slider, VizLayout } from './controls'
import { Handle, Plane, Polygon, Segment } from './plane'

const INITIAL: Vec2[] = [
  [0.5, 1.4],
  [1.5, 2.9],
  [2.5, 2.6],
  [3.5, 4.4],
  [4.5, 4.1],
  [5.5, 6.0],
  [6.5, 5.6],
  [7.5, 7.4],
]

/**
 * Ajusta a mano la recta ŷ = b₀ + b₁x y compárala con la de mínimos cuadrados. Los cuadrados
 * dibujados son los residuos al cuadrado: la regresión minimiza la suma de sus áreas.
 */
export function RegressionFit() {
  const [pts, setPts] = useState<Vec2[]>(INITIAL)
  const [b0, setB0] = useState(0.5)
  const [b1, setB1] = useState(0.5)
  const [squares, setSquares] = useState(true)
  const ols = fitLine(pts)
  const sse = (a: number, b: number) => pts.reduce((s, [x, y]) => s + (y - (a + b * x)) ** 2, 0)
  const mine = sse(b0, b1)
  const best = ols ? sse(ols.b0, ols.b1) : NaN

  return (
    <VizLayout
      plot={
        <Plane xRange={[-1, 9]} yRange={[-1, 9]} ariaLabel="Recta de regresión y residuos">
          {ols && <Segment from={[-1, ols.b0 - ols.b1]} to={[9, ols.b0 + 9 * ols.b1]} color="c" width={1.5} />}
          {pts.map(([x, y], i) => {
            const yh = b0 + b1 * x
            const r = y - yh
            return (
              <g key={i}>
                {squares && (
                  <Polygon
                    points={[
                      [x, yh],
                      [x, y],
                      [x + Math.abs(r), y],
                      [x + Math.abs(r), yh],
                    ]}
                    color="b"
                    opacity={0.12}
                  />
                )}
                <Segment from={[x, y]} to={[x, yh]} color="b" dashed={false} width={1.5} />
              </g>
            )
          })}
          <Segment from={[-1, b0 - b1]} to={[9, b0 + 9 * b1]} color="a" dashed={false} width={2.5} />
          {pts.map((p, i) => (
            <Handle key={i} at={p} r={6} snap={0.1} color="d" label={`Punto ${i + 1}`} onChange={(q) => setPts(pts.map((x, j) => (j === i ? q : x)))} />
          ))}
        </Plane>
      }
      side={
        <>
          <Slider label={<span>b₀ (corte)</span>} value={b0} min={-2} max={5} step={0.05} onChange={setB0} />
          <Slider label={<span>b₁ (pendiente)</span>} value={b1} min={-1} max={2} step={0.01} onChange={setB1} />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={!ols}
              onClick={() => {
                if (!ols) return
                setB0(Number(ols.b0.toFixed(2)))
                setB1(Number(ols.b1.toFixed(2)))
              }}
              className="rounded-md bg-brand-600 px-2 py-1 text-xs font-semibold text-white hover:bg-brand-700"
            >
              Usar mínimos cuadrados
            </button>
            <label className="flex items-center gap-1.5 text-sm">
              <input type="checkbox" checked={squares} onChange={(e) => setSquares(e.target.checked)} />
              Ver residuos²
            </label>
          </div>
          <Readout
            items={[
              `\\hat{y} = ${fmt(b0)} + ${fmt(b1)}\\,x`,
              `\\text{SSE} = \\sum_i (y_i - \\hat{y}_i)^2 = \\mathbf{${fmt(mine)}}`,
              ols && `\\text{mínimo posible: } ${fmt(best)}\\ \\ (b_0 = ${fmt(ols.b0)},\\ b_1 = ${fmt(ols.b1)})`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Recta azul: la tuya. Recta verde: la de mínimos cuadrados. Los segmentos rojos son los residuos (error de cada punto) y
            los cuadrados, sus valores al cuadrado. Intenta igualar el mínimo moviendo b₀ y b₁, o arrastra los puntos para ver cómo
            cambia la recta óptima (prueba a crear un punto atípico).
          </p>
        </>
      }
    />
  )
}
