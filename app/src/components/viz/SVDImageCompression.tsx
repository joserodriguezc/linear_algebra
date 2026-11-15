import { useEffect, useMemo, useRef, useState } from 'react'
import { Slider } from './controls'

interface SvdData {
  size: number
  pixels: number[][]
  U: number[][]
  s: number[]
  Vt: number[][]
}

function useSvdData() {
  const [data, setData] = useState<SvdData | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/svd_image.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(setData)
      .catch(() => setError('No se encontraron los datos. Genera los recursos con `uv run build-assets`.'))
  }, [])
  return { data, error }
}

function GrayCanvas({ img, label }: { img: number[][]; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const n = img.length
    c.width = n
    c.height = n
    const ctx = c.getContext('2d')!
    const im = ctx.createImageData(n, n)
    img.forEach((row, i) =>
      row.forEach((v, j) => {
        const g = Math.max(0, Math.min(255, Math.round(v * 255)))
        const o = (i * n + j) * 4
        im.data[o] = im.data[o + 1] = im.data[o + 2] = g
        im.data[o + 3] = 255
      }),
    )
    ctx.putImageData(im, 0, 0)
  }, [img])
  return (
    <figure className="flex flex-col items-center gap-1">
      <canvas ref={ref} className="w-52 max-w-full rounded border border-slate-200 dark:border-slate-700" style={{ imageRendering: 'pixelated' }} aria-label={label} />
      <figcaption className="text-xs text-slate-500">{label}</figcaption>
    </figure>
  )
}

/** Comprime una imagen quedándose con los k valores singulares más grandes: A ≈ Σᵢ σᵢ uᵢ vᵢᵀ. */
export function SVDImageCompression() {
  const { data, error } = useSvdData()
  const [k, setK] = useState(8)

  const approx = useMemo(() => {
    if (!data) return null
    const n = data.size
    const out = Array.from({ length: n }, () => new Array<number>(n).fill(0))
    for (let r = 0; r < k; r++) {
      const sr = data.s[r]
      for (let i = 0; i < n; i++) {
        const ui = data.U[i][r] * sr
        const row = out[i]
        const vr = data.Vt[r]
        for (let j = 0; j < n; j++) row[j] += ui * vr[j]
      }
    }
    return out
  }, [data, k])

  if (error) return <p className="text-sm text-red-600">{error}</p>
  if (!data || !approx) return <p className="text-sm text-slate-500">Cargando imagen…</p>

  const n = data.size
  const total = data.s.reduce((a, x) => a + x * x, 0)
  const kept = data.s.slice(0, k).reduce((a, x) => a + x * x, 0)
  const stored = k * (2 * n + 1)
  // Escala logarítmica: σ₁ suele ser mucho mayor que el resto
  const pos = data.s.filter((x) => x > 1e-9)
  const lmax = Math.log10(data.s[0])
  const lmin = Math.log10(pos[pos.length - 1]) - 0.1
  const W = 320
  const H = 90
  const bw = W / n

  return (
    <div className="space-y-4">
      <Slider label={<span>k = valores singulares</span>} value={k} min={1} max={n} step={1} onChange={setK} />
      <div className="flex flex-wrap items-start justify-center gap-6">
        <GrayCanvas img={data.pixels} label={`Original (${n}×${n} = ${n * n} números)`} />
        <GrayCanvas img={approx} label={`Rango ${k}: ${stored} números`} />
      </div>
      <div className="grid gap-1 text-sm sm:grid-cols-3">
        <p>
          Almacenamiento: <strong>{((stored / (n * n)) * 100).toFixed(0)} %</strong> del original
        </p>
        <p>
          Energía conservada: <strong>{((kept / total) * 100).toFixed(1)} %</strong>
        </p>
        <p>
          Error relativo: <strong>{(Math.sqrt(Math.max(0, 1 - kept / total)) * 100).toFixed(1)} %</strong>
        </p>
      </div>
      <figure>
        <svg viewBox={`0 0 ${W} ${H + 14}`} className="w-full max-w-xl" role="img" aria-label="Valores singulares de la imagen en orden decreciente">
          {data.s.map((v, i) => {
            const h = v > 1e-9 ? ((Math.log10(v) - lmin) / (lmax - lmin)) * H : 0
            return <rect key={i} x={i * bw + 0.5} y={H - h} width={Math.max(1, bw - 1)} height={h} fill={i < k ? 'var(--viz-a)' : 'var(--viz-grid)'} />
          })}
          <line x1={0} x2={W} y1={H} y2={H} stroke="var(--viz-axis)" />
          <text x={0} y={H + 12} fontSize={9} fill="var(--viz-muted)">
            σ₁
          </text>
          <text x={W} y={H + 12} fontSize={9} textAnchor="end" fill="var(--viz-muted)">
            σ{n}
          </text>
        </svg>
        <figcaption className="text-xs text-slate-500 dark:text-slate-400">
          Valores singulares en orden decreciente, en escala logarítmica (en azul, los que se conservan). Unos pocos concentran casi toda la información.
        </figcaption>
      </figure>
    </div>
  )
}
