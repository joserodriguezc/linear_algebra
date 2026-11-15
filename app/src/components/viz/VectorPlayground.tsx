import { useState } from 'react'
import { add, fmt, scale, sub, type Vec2 } from '../../lib/linalg'
import { Readout, Segmented, Slider, VizLayout } from './controls'
import { Arrow, Handle, Plane, Polygon, Segment } from './plane'

type Mode = 'suma' | 'resta' | 'escalar'

/** Arrastra a y b para ver la suma (regla del paralelogramo), la resta y el escalado. */
export function VectorPlayground({ initialMode = 'suma' }: { initialMode?: Mode }) {
  const [a, setA] = useState<Vec2>([3, 1])
  const [b, setB] = useState<Vec2>([1, 2])
  const [k, setK] = useState(2)
  const [mode, setMode] = useState<Mode>(initialMode)

  const v = (p: number[]) => `\\begin{bmatrix}${fmt(p[0])} \\\\ ${fmt(p[1])}\\end{bmatrix}`
  const res = mode === 'suma' ? add(a, b) : mode === 'resta' ? sub(a, b) : scale(a, k)

  return (
    <VizLayout
      plot={
        <Plane xRange={[-6, 6]} yRange={[-5, 5]} ariaLabel="Plano con vectores a y b arrastrables">
          {mode === 'suma' && (
            <>
              <Polygon points={[[0, 0], a, res as Vec2, b]} color="c" opacity={0.08} stroke={false} />
              <Arrow from={a} to={res as Vec2} color="b" dashed width={1.5} />
              <Arrow from={b} to={res as Vec2} color="a" dashed width={1.5} />
            </>
          )}
          {mode === 'resta' && <Arrow from={b} to={a} color="c" dashed width={1.5} />}
          {mode === 'escalar' && <Segment from={[-a[0] * 10, -a[1] * 10]} to={[a[0] * 10, a[1] * 10]} />}
          <Arrow to={res as Vec2} color="c" label={mode === 'suma' ? 'a + b' : mode === 'resta' ? 'a − b' : `${k}·a`} width={3} />
          <Arrow to={a} color="a" label="a" />
          {mode !== 'escalar' && <Arrow to={b} color="b" label="b" />}
          <Handle at={a} onChange={setA} color="a" label="Vector a" />
          {mode !== 'escalar' && <Handle at={b} onChange={setB} color="b" label="Vector b" />}
        </Plane>
      }
      side={
        <>
          <Segmented
            value={mode}
            onChange={setMode}
            options={[
              { value: 'suma', label: 'Suma' },
              { value: 'resta', label: 'Resta' },
              { value: 'escalar', label: 'Escalar' },
            ]}
          />
          {mode === 'escalar' && <Slider label="k" value={k} min={-2} max={3} step={0.25} onChange={setK} />}
          <Readout
            items={[
              `a = ${v(a)},\\; b = ${v(b)}`,
              mode === 'suma' && `a + b = ${v(add(a, b))}`,
              mode === 'resta' && `a - b = ${v(sub(a, b))}`,
              mode === 'escalar' && `${k}\\,a = ${v(scale(a, k))}`,
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'suma' && 'Suma = poner b a continuación de a (o al revés): ambos caminos llegan al mismo punto.'}
            {mode === 'resta' && 'a − b es la flecha que va desde la punta de b hasta la punta de a.'}
            {mode === 'escalar' && 'Multiplicar por k estira (|k|>1), encoge (|k|<1) o invierte (k<0) el vector, sin salir de su recta.'}
          </p>
        </>
      }
    />
  )
}
