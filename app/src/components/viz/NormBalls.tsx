import { useState } from 'react'
import { fmt, normL1, normL2, normMax, type Vec2 } from '../../lib/linalg'
import { Readout, VizLayout } from './controls'
import { Arrow, Handle, Plane, Polyline, Segment, type VizColor } from './plane'

type NormKey = 'l1' | 'l2' | 'max'

const shapes: Record<NormKey, { color: VizColor; label: string; contour: (r: number) => Vec2[] }> = {
  l1: { color: 'a', label: 'L¹', contour: (r) => [[r, 0], [0, r], [-r, 0], [0, -r], [r, 0]] },
  l2: {
    color: 'c',
    label: 'L²',
    contour: (r) => Array.from({ length: 73 }, (_, i) => [r * Math.cos((i * Math.PI) / 36), r * Math.sin((i * Math.PI) / 36)] as Vec2),
  },
  max: { color: 'b', label: 'L∞', contour: (r) => [[r, r], [-r, r], [-r, -r], [r, -r], [r, r]] },
}

/**
 * Cada norma mide la longitud de forma distinta. Se dibuja el contorno de todos los puntos
 * que tienen la MISMA norma que v: rombo (L1), círculo (L2) y cuadrado (L∞).
 */
export function NormBalls({ unit = false }: { unit?: boolean }) {
  const [v, setV] = useState<Vec2>([3, 2])
  const [show, setShow] = useState<Record<NormKey, boolean>>({ l1: true, l2: true, max: true })
  const norms: Record<NormKey, number> = { l1: normL1(v), l2: normL2(v), max: normMax(v) }

  return (
    <VizLayout
      plot={
        <Plane xRange={[-6, 6]} yRange={[-6, 6]} ariaLabel="Contornos de las normas L1, L2 y máxima">
          {(Object.keys(shapes) as NormKey[]).map((k) =>
            show[k] ? <Polyline key={k} points={shapes[k].contour(unit ? 1 : norms[k])} color={shapes[k].color} width={2} /> : null,
          )}
          {show.l1 && (
            <>
              <Segment from={[0, 0]} to={[v[0], 0]} color="a" />
              <Segment from={[v[0], 0]} to={v} color="a" />
            </>
          )}
          <Arrow to={v} color="d" label="v" />
          <Handle at={v} onChange={setV} color="d" label="Vector v" />
        </Plane>
      }
      side={
        <>
          <div className="flex flex-wrap gap-3 text-sm">
            {(Object.keys(shapes) as NormKey[]).map((k) => (
              <label key={k} className="flex items-center gap-1.5">
                <input type="checkbox" checked={show[k]} onChange={(e) => setShow({ ...show, [k]: e.target.checked })} />
                <span style={{ color: `var(--viz-${shapes[k].color})` }} className="font-semibold">
                  {shapes[k].label}
                </span>
              </label>
            ))}
          </div>
          <Readout
            items={[
              `v = (${fmt(v[0])},\\ ${fmt(v[1])})`,
              `\\|v\\|_1 = |${fmt(v[0])}| + |${fmt(v[1])}| = \\mathbf{${fmt(norms.l1)}}`,
              `\\|v\\|_2 = \\sqrt{${fmt(v[0])}^2 + ${fmt(v[1])}^2} = \\mathbf{${fmt(norms.l2)}}`,
              `\\|v\\|_\\infty = \\max(|${fmt(v[0])}|, |${fmt(v[1])}|) = \\mathbf{${fmt(norms.max)}}`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {unit
              ? 'Bolas unidad: todos los puntos con norma 1. La L¹ tiene esquinas sobre los ejes; por eso la regularización L¹ (lasso) tiende a dejar pesos exactamente en 0.'
              : 'Cada contorno pasa por v: son todos los puntos tan "largos" como v según esa norma. Las líneas discontinuas azules son el camino "de taxi" que mide L¹. Siempre se cumple ‖v‖∞ ≤ ‖v‖₂ ≤ ‖v‖₁.'}
          </p>
        </>
      }
    />
  )
}
