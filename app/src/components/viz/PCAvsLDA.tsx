import { useMemo, useState } from 'react'
import { cov, eig2, fmt, invSmall, mean, type Vec2 } from '../../lib/linalg'
import { rng } from '../../lib/random'
import { Readout, Slider, VizLayout } from './controls'
import { Arrow, Dot, Plane } from './plane'

const N = 45
const LONG: Vec2 = [Math.SQRT1_2, Math.SQRT1_2] // eje largo de cada clase
const SHORT: Vec2 = [-Math.SQRT1_2, Math.SQRT1_2]
const SEP: Vec2 = [-0.8, 0.6] // dirección en la que se separan las medias

/** Ruido estándar fijo: al mover el control solo se desplazan las clases. */
function useNoise(seed: number): Vec2[] {
  return useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: N }, () => [r.normal(), r.normal()] as Vec2)
  }, [seed])
}

const unit = (v: Vec2): Vec2 => {
  const n = Math.hypot(v[0], v[1])
  return [v[0] / n, v[1] / n]
}
const dot = (a: Vec2, b: Vec2) => a[0] * b[0] + a[1] * b[1]

/** Proporción de Fisher: separación de las medias proyectadas² / dispersión dentro de las clases. */
function fisher(w: Vec2, m1: Vec2, m2: Vec2, Sw: number[][]) {
  const d = dot(w, [m1[0] - m2[0], m1[1] - m2[1]])
  const within = w[0] * (Sw[0][0] * w[0] + Sw[0][1] * w[1]) + w[1] * (Sw[1][0] * w[0] + Sw[1][1] * w[1])
  return (d * d) / within
}

function Histogram({ a, b, title }: { a: number[]; b: number[]; title: string }) {
  const all = [...a, ...b]
  const lo = Math.min(...all)
  const hi = Math.max(...all)
  const bins = 24
  const count = (xs: number[]) => {
    const h = new Array(bins).fill(0)
    for (const x of xs) h[Math.min(bins - 1, Math.floor(((x - lo) / (hi - lo || 1)) * bins))]++
    return h
  }
  const ha = count(a)
  const hb = count(b)
  const top = Math.max(...ha, ...hb, 1)
  const W = 280
  const H = 56
  const bw = W / bins
  return (
    <div>
      <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">{title}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xs" role="img" aria-label={title}>
        {ha.map((v, i) => (
          <rect key={`a${i}`} x={i * bw} y={H - (v / top) * H} width={bw - 1} height={(v / top) * H} fill="var(--viz-a)" opacity={0.55} />
        ))}
        {hb.map((v, i) => (
          <rect key={`b${i}`} x={i * bw} y={H - (v / top) * H} width={bw - 1} height={(v / top) * H} fill="var(--viz-b)" opacity={0.55} />
        ))}
        <line x1={0} x2={W} y1={H - 0.5} y2={H - 0.5} stroke="var(--viz-axis)" />
      </svg>
    </div>
  )
}

/**
 * PCA frente a LDA con dos clases alargadas. PCA (sin etiquetas) elige la dirección de máxima
 * varianza total; LDA (con etiquetas) elige la que mejor separa las clases: w ∝ S_W⁻¹(μ₁ − μ₂).
 */
export function PCAvsLDA() {
  const [sep, setSep] = useState(2.5)
  const za = useNoise(11)
  const zb = useNoise(23)
  const make = (z: Vec2[], sign: number): Vec2[] =>
    z.map(([u, v]) => [
      sign * (sep / 2) * SEP[0] + 2.2 * u * LONG[0] + 0.45 * v * SHORT[0],
      sign * (sep / 2) * SEP[1] + 2.2 * u * LONG[1] + 0.45 * v * SHORT[1],
    ])
  const A = make(za, 1)
  const B = make(zb, -1)
  const m1 = mean(A) as Vec2
  const m2 = mean(B) as Vec2
  const Ca = cov(A)
  const Cb = cov(B)
  const Sw = [
    [Ca[0][0] + Cb[0][0], Ca[0][1] + Cb[0][1]],
    [Ca[1][0] + Cb[1][0], Ca[1][1] + Cb[1][1]],
  ]
  const Swi = invSmall(Sw)!
  const diff: Vec2 = [m1[0] - m2[0], m1[1] - m2[1]]
  const lda = unit([Swi[0][0] * diff[0] + Swi[0][1] * diff[1], Swi[1][0] * diff[0] + Swi[1][1] * diff[1]])
  const pca = eig2(cov([...A, ...B]))!.vectors[0] as Vec2
  const mu = mean([...A, ...B]) as Vec2
  const proj = (pts: Vec2[], w: Vec2) => pts.map((p) => dot(p, w))
  const jPca = fisher(pca, m1, m2, Sw)
  const jLda = fisher(lda, m1, m2, Sw)
  const L = 4.5

  return (
    <VizLayout
      plot={
        <Plane xRange={[-6, 6]} yRange={[-6, 6]} ariaLabel="Dos clases con las direcciones de PCA y LDA">
          {A.map((p, i) => (
            <Dot key={`a${i}`} at={p} color="a" r={3.2} opacity={0.75} />
          ))}
          {B.map((p, i) => (
            <Dot key={`b${i}`} at={p} color="b" r={3.2} opacity={0.75} />
          ))}
          <Arrow from={mu} to={[mu[0] + L * pca[0], mu[1] + L * pca[1]]} color="d" label="PCA" width={3} />
          <Arrow from={mu} to={[mu[0] + L * lda[0], mu[1] + L * lda[1]]} color="c" label="LDA" width={3} />
        </Plane>
      }
      side={
        <>
          <Slider label="separación de las medias" value={sep} min={0.5} max={8} step={0.1} onChange={setSep} />
          <Histogram a={proj(A, pca)} b={proj(B, pca)} title="Proyecciones sobre la dirección de PCA (naranja)" />
          <Histogram a={proj(A, lda)} b={proj(B, lda)} title="Proyecciones sobre la dirección de LDA (verde)" />
          <Readout
            items={[
              `J(w) = \\frac{(w^T(\\mu_1 - \\mu_2))^2}{w^TS_Ww}`,
              `J_{\\text{PCA}} = ${fmt(jPca)},\\qquad J_{\\text{LDA}} = \\mathbf{${fmt(jLda)}}`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            PCA no conoce las etiquetas: elige el eje largo de la nube, donde las dos clases se solapan. LDA usa las etiquetas y
            busca la dirección en la que las medias quedan lejos y cada clase poco dispersa: la proporción de Fisher J(w) es la
            máxima posible. Aumenta mucho la separación: llega un punto en que la varianza entre clases domina y PCA también la
            encuentra.
          </p>
        </>
      }
    />
  )
}
