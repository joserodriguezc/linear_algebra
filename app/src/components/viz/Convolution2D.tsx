import { useState } from 'react'
import { conv2dValid, fmt, type Mat } from '../../lib/linalg'
import { DIGIT_3 } from '../../lib/sampleData'
import { MatrixGrid } from './MatrixGrid'
import { Segmented } from './controls'

const KERNELS: Record<string, { label: string; K: Mat; note: string }> = {
  blur: {
    label: 'Desenfoque',
    K: [
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
    ],
    note: 'promedia cada píxel con sus 8 vecinos',
  },
  horiz: {
    label: 'Bordes horizontales',
    K: [
      [1, 2, 1],
      [0, 0, 0],
      [-1, -2, -1],
    ],
    note: 'filtro de Sobel: responde a cambios de arriba abajo',
  },
  vert: {
    label: 'Bordes verticales',
    K: [
      [1, 0, -1],
      [2, 0, -2],
      [1, 0, -1],
    ],
    note: 'filtro de Sobel: responde a cambios de izquierda a derecha',
  },
  id: {
    label: 'Identidad',
    K: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    note: 'deja el píxel central (recorta el borde)',
  },
}

const PX = 22

function Heat({ M, signed, title }: { M: Mat; signed: boolean; title: string }) {
  const max = Math.max(1e-9, ...M.flat().map(Math.abs))
  return (
    <figure className="space-y-1">
      <div className="inline-grid overflow-hidden rounded border border-slate-300 dark:border-slate-600" style={{ gridTemplateColumns: `repeat(${M[0].length}, ${PX}px)` }}>
        {M.flatMap((row, i) =>
          row.map((v, j) => {
            const t = Math.abs(v) / max
            const bg = signed
              ? v >= 0
                ? `rgba(37, 99, 235, ${t})`
                : `rgba(220, 38, 38, ${t})`
              : `rgb(${255 - t * 255}, ${255 - t * 255}, ${255 - t * 255})`
            return <span key={`${i}-${j}`} title={fmt(v)} style={{ width: PX, height: PX, background: bg }} />
          }),
        )}
      </div>
      <figcaption className="text-xs text-slate-500">{title}</figcaption>
    </figure>
  )
}

/** Convolución 2D sobre una imagen: el mismo núcleo 3×3 se desliza por todas las posiciones. */
export function Convolution2D() {
  const [ker, setKer] = useState('vert')
  const { K, note } = KERNELS[ker]
  const out = conv2dValid(DIGIT_3, K)
  const signed = out.flat().some((v) => v < -1e-9)
  const nIn = DIGIT_3.length * DIGIT_3[0].length
  const nOut = out.length * out[0].length

  return (
    <div className="space-y-4">
      <Segmented value={ker} onChange={setKer} options={Object.entries(KERNELS).map(([value, k]) => ({ value, label: k.label }))} />
      <div className="flex flex-wrap items-start gap-6">
        <Heat M={DIGIT_3} signed={false} title="Imagen 8×8" />
        <div className="flex flex-col items-center gap-1 self-center">
          <span className="text-slate-400">∗</span>
          <MatrixGrid values={K} size="sm" digits={2} label={<span className="text-xs text-slate-500">núcleo 3×3</span>} />
        </div>
        <Heat M={out} signed={signed} title={`Salida 6×6${signed ? ' (azul +, rojo −)' : ''}`} />
      </div>
      <p className="text-sm">{note}.</p>
      <div className="grid gap-2 text-sm sm:grid-cols-2">
        <p className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-900">
          Capa densa {nIn} → {nOut}: <strong>{nIn * nOut}</strong> pesos
        </p>
        <p className="rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-950/40">
          Capa convolucional 3×3: <strong>9</strong> pesos compartidos
        </p>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Como en las redes convolucionales, el núcleo no se voltea (es una correlación cruzada). Esta operación también es una matriz de{' '}
        {nOut}×{nIn}, pero casi toda de ceros y con los mismos 9 números repetidos en cada fila: una matriz dispersa con pesos compartidos.
      </p>
    </div>
  )
}
