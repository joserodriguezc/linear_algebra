import { useState } from 'react'
import { Readout, Slider } from './controls'

const W = 560
const H = 340

/**
 * El «gran esquema» de los cuatro subespacios fundamentales de una matriz A de m×n y rango r.
 * En el espacio de entrada (n componentes) viven el espacio fila y el núcleo, perpendiculares entre sí;
 * en el de salida (m componentes), el espacio columna y el núcleo izquierdo.
 */
export function FourSubspaces() {
  const [m, setM] = useState(3)
  const [n, setN] = useState(3)
  const [rRaw, setR] = useState(2)
  const r = Math.min(rRaw, m, n)
  const unit = 27 // píxeles por dimensión (hasta 5 dimensiones por lado sin pisar los títulos)
  const boxW = 150
  // Cajas: espacio fila (r) arriba y núcleo (n − r) abajo, a la izquierda; columna (r) y núcleo izquierdo (m − r), a la derecha
  const left = { x: 40, rowH: Math.max(r * unit, 6), nullH: Math.max((n - r) * unit, 6) }
  const right = { x: W - 40 - boxW, colH: Math.max(r * unit, 6), lnullH: Math.max((m - r) * unit, 6) }
  const midY = 182
  const box = (x: number, y: number, h: number, fill: string, title: string, dim: string) => (
    <g>
      <rect x={x} y={y} width={boxW} height={h} rx={6} fill={fill} fillOpacity={0.18} stroke={fill} strokeWidth={1.5} />
      <text x={x + boxW / 2} y={h > 34 ? y + h / 2 - 2 : y + h / 2 + 4} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--viz-text)">
        {title}
      </text>
      {h > 34 && (
        <text x={x + boxW / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize={11} fill="var(--viz-muted)">
          {dim}
        </text>
      )}
    </g>
  )
  const rowY = midY - left.rowH
  const nullY = midY
  const colY = midY - right.colH
  const lnullY = midY
  // Marca de ángulo recto en el borde común
  const rightAngle = (x: number) => <path d={`M ${x} ${midY - 10} L ${x + 10} ${midY - 10} L ${x + 10} ${midY}`} fill="none" stroke="var(--viz-text)" strokeWidth={1.2} />

  return (
    <div className="space-y-4">
      <div className="grid max-w-md gap-2">
        <Slider label="m (filas)" value={m} min={1} max={5} step={1} onChange={setM} />
        <Slider label="n (columnas)" value={n} min={1} max={5} step={1} onChange={setN} />
        <Slider label="r (rango)" value={r} min={0} max={Math.min(m, n)} step={1} onChange={setR} />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl" role="img" aria-label="Los cuatro subespacios fundamentales">
        <defs>
          <marker id="fs-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--viz-text)" />
          </marker>
        </defs>
        <text x={left.x + boxW / 2} y={20} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--viz-text)">
          Entrada: vectores de {n} componentes
        </text>
        <text x={right.x + boxW / 2} y={20} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--viz-text)">
          Salida: vectores de {m} componentes
        </text>
        {r > 0 && box(left.x, rowY, left.rowH, 'var(--viz-a)', 'espacio fila Im(Aᵀ)', `dimensión r = ${r}`)}
        {n - r > 0 && box(left.x, nullY, left.nullH, 'var(--viz-b)', 'núcleo ker(A)', `dimensión n − r = ${n - r}`)}
        {r > 0 && box(right.x, colY, right.colH, 'var(--viz-c)', 'espacio columna Im(A)', `dimensión r = ${r}`)}
        {m - r > 0 && box(right.x, lnullY, right.lnullH, 'var(--viz-d)', 'núcleo izquierdo ker(Aᵀ)', `dimensión m − r = ${m - r}`)}
        {r > 0 && n - r > 0 && rightAngle(left.x)}
        {r > 0 && m - r > 0 && rightAngle(right.x + boxW - 10)}
        {r > 0 && (
          <>
            <line x1={left.x + boxW + 6} y1={rowY + left.rowH / 2} x2={right.x - 8} y2={colY + right.colH / 2} stroke="var(--viz-text)" strokeWidth={1.5} markerEnd="url(#fs-arrow)" />
            <text x={W / 2} y={Math.min(rowY + left.rowH / 2, colY + right.colH / 2) - 8} textAnchor="middle" fontSize={12} fill="var(--viz-text)">
              Ax: uno a uno
            </text>
          </>
        )}
        {n - r > 0 && (
          <>
            <line x1={left.x + boxW + 6} y1={nullY + left.nullH / 2} x2={W / 2 - 6} y2={midY + 4} stroke="var(--viz-b)" strokeWidth={1.5} strokeDasharray="5 4" markerEnd="url(#fs-arrow)" />
            <circle cx={W / 2} cy={midY + 4} r={4} fill="var(--viz-b)" />
            <text x={W / 2 + 8} y={midY + 20} fontSize={12} fill="var(--viz-b)">
              Ax = 0
            </text>
          </>
        )}
      </svg>
      <Readout
        items={[
          `\\dim\\operatorname{Im}(A^T) + \\dim\\ker(A) = ${r} + ${n - r} = ${n} = n`,
          `\\dim\\operatorname{Im}(A) + \\dim\\ker(A^T) = ${r} + ${m - r} = ${m} = m`,
        ]}
      />
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Cada vector de entrada se descompone en una parte del espacio fila (que A lleva, sin perder nada, al espacio columna) y una parte del
        núcleo (que A anula). El ángulo recto indica que los dos subespacios de cada lado son perpendiculares. Prueba r = 0 (matriz cero) y r
        = min(m, n) (rango completo).
      </p>
    </div>
  )
}
