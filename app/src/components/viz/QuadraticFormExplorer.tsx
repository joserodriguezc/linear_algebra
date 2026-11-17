import { useState } from 'react'
import { dot, eig2, fmt, matVec, type Mat, type Vec2 } from '../../lib/linalg'
import { texMat } from '../../lib/tex'
import { MatrixInput2, Readout, VizLayout } from './controls'
import { Arrow, Handle, Plane, Polyline, Segment } from './plane'

const PRESETS: Record<string, { label: string; m: Mat }> = {
  pd: { label: 'Definida positiva', m: [[2, 1], [1, 2]] },
  psd: { label: 'Semidefinida', m: [[1, 1], [1, 1]] },
  ind: { label: 'Indefinida', m: [[1, 2], [2, 1]] },
  nd: { label: 'Definida negativa', m: [[-2, 0], [0, -1]] },
}

const LEVELS = [0.5, 2, 4.5, 8]
const T = Array.from({ length: 121 }, (_, i) => -3 + (i * 6) / 120)

/**
 * Curvas de nivel de la «energía» f(x) = xᵀSx de una matriz simétrica 2×2. En la base de vectores
 * propios, f = λ₁u² + λ₂v²: elipses si ambos λ son positivos, rectas si uno es 0, hipérbolas si tienen signos distintos.
 */
export function QuadraticFormExplorer() {
  const [raw, setRaw] = useState<Mat>(PRESETS.pd.m)
  const [x, setX] = useState<Vec2>([1.5, 0.5])
  // Se mantiene simétrica: el elemento (2,1) copia al (1,2)
  const S: Mat = [
    [raw[0][0], raw[0][1]],
    [raw[0][1], raw[1][1]],
  ]
  const e = eig2(S)!
  const [l1, l2] = e.values
  const [e1, e2] = e.vectors
  const toX = (u: number, v: number): Vec2 => [u * e1[0] + v * e2[0], u * e1[1] + v * e2[1]]

  const curves: { pts: Vec2[]; positive: boolean }[] = []
  const eps = 1e-9
  for (const c of LEVELS)
    for (const sign of [1, -1]) {
      const level = sign * c
      const a = l1 !== 0 ? level / l1 : NaN
      const b = l2 !== 0 ? level / l2 : NaN
      if (a > eps && b > eps) {
        curves.push({ pts: Array.from({ length: 73 }, (_, i) => toX(Math.sqrt(a) * Math.cos((i * Math.PI) / 36), Math.sqrt(b) * Math.sin((i * Math.PI) / 36))), positive: level > 0 })
      } else if (a > eps && Math.abs(l2) < eps) {
        for (const s of [1, -1]) curves.push({ pts: [toX(s * Math.sqrt(a), -10), toX(s * Math.sqrt(a), 10)], positive: level > 0 })
      } else if (b > eps && Math.abs(l1) < eps) {
        for (const s of [1, -1]) curves.push({ pts: [toX(-10, s * Math.sqrt(b)), toX(10, s * Math.sqrt(b))], positive: level > 0 })
      } else if (a > eps && b < -eps) {
        for (const s of [1, -1]) curves.push({ pts: T.map((t) => toX(s * Math.sqrt(a) * Math.cosh(t), Math.sqrt(-b) * Math.sinh(t))), positive: level > 0 })
      } else if (b > eps && a < -eps) {
        for (const s of [1, -1]) curves.push({ pts: T.map((t) => toX(Math.sqrt(-a) * Math.sinh(t), s * Math.sqrt(b) * Math.cosh(t))), positive: level > 0 })
      }
    }

  const q = dot(x, matVec(S, x))
  const nx = dot(x, x)
  const R = nx > 1e-9 ? q / nx : 0
  const kind =
    l2 > eps
      ? 'definida positiva: xᵀSx > 0 para todo x ≠ 0 (un cuenco; las curvas de nivel son elipses)'
      : l2 > -eps && l1 > eps
        ? 'semidefinida positiva: xᵀSx ≥ 0, pero vale 0 a lo largo de una dirección (un canal)'
        : l1 < -eps
          ? 'definida negativa: xᵀSx < 0 para todo x ≠ 0 (un cuenco invertido)'
          : 'indefinida: xᵀSx es positiva en unas direcciones y negativa en otras (una silla de montar)'

  return (
    <VizLayout
      plot={
        <Plane xRange={[-4, 4]} yRange={[-4, 4]} ariaLabel="Curvas de nivel de la forma cuadrática">
          {curves.map((c, i) => (
            <Polyline key={i} points={c.pts} color={c.positive ? 'a' : 'b'} width={1.5} />
          ))}
          <Segment from={toX(-10, 0)} to={toX(10, 0)} color="c" />
          <Segment from={toX(0, -10)} to={toX(0, 10)} color="c" />
          <Arrow to={x} color="d" label="x" />
          <Handle at={x} onChange={setX} color="d" snap={0.1} label="Vector x" />
        </Plane>
      }
      side={
        <>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(PRESETS).map(([k, p]) => (
              <button
                key={k}
                type="button"
                onClick={() => setRaw(p.m)}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:border-brand-500 dark:border-slate-700"
              >
                {p.label}
              </button>
            ))}
          </div>
          <MatrixInput2
            value={S}
            onChange={(m) => {
              // Mantener la simetría copiando el elemento fuera de la diagonal que se haya editado
              const off = m[0][1] !== S[0][1] ? m[0][1] : m[1][0]
              setRaw([[m[0][0], off], [off, m[1][1]]])
            }}
            name="S"
          />
          <Readout
            items={[
              `\\lambda_1 = ${fmt(l1)},\\quad \\lambda_2 = ${fmt(l2)}`,
              `x^TSx = ${texMat(x)}^T ${texMat(S)} ${texMat(x)} = \\mathbf{${fmt(q)}}`,
              nx > 1e-9 && `R(x) = \\frac{x^TSx}{x^Tx} = ${fmt(R)},\\quad ${fmt(l2)} \\le R(x) \\le ${fmt(l1)}`,
            ]}
          />
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-900">
            <strong>S es {kind.split(':')[0]}</strong>:{kind.slice(kind.indexOf(':') + 1)}.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Curvas azules: niveles positivos de xᵀSx; rojas: negativos. Las rectas verdes son las direcciones propias: los ejes de las
            curvas. El cociente de Rayleigh R(x) nunca sale del intervalo [λ₂, λ₁]: arrastra x sobre una recta verde para alcanzar los
            extremos. Esta es la forma de una función de pérdida cerca de un mínimo (definida positiva) o de un punto de silla (indefinida).
          </p>
        </>
      }
    />
  )
}
