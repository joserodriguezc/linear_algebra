import { useState } from 'react'
import { det2, fmt, type Vec2 } from '../../lib/linalg'
import { Readout, Slider, VizLayout } from './controls'
import { texMat } from '../../lib/tex'
import { Dot, Label, Plane, Segment } from './plane'

type Eq = { a: number; b: number; c: number }

const PRESETS: Record<string, { label: string; e1: Eq; e2: Eq }> = {
  unica: { label: 'Una solución', e1: { a: 1, b: 1, c: 3 }, e2: { a: 1, b: -1, c: 1 } },
  paralelas: { label: 'Sin solución', e1: { a: 1, b: 1, c: 3 }, e2: { a: 1, b: 1, c: -1 } },
  infinitas: { label: 'Infinitas', e1: { a: 1, b: 1, c: 3 }, e2: { a: 2, b: 2, c: 6 } },
}

/** Dos puntos de la recta a·x + b·y = c dentro de la ventana, para dibujarla. */
function linePoints({ a, b, c }: Eq): [Vec2, Vec2] | null {
  if (Math.abs(b) > 1e-9) return [[-10, (c + 10 * a) / b], [10, (c - 10 * a) / b]]
  if (Math.abs(a) > 1e-9) return [[c / a, -10], [c / a, 10]]
  return null
}

/** Un sistema de 2 ecuaciones lineales es la intersección de dos rectas. */
export function LinearSystem2D() {
  const [e1, setE1] = useState<Eq>(PRESETS.unica.e1)
  const [e2, setE2] = useState<Eq>(PRESETS.unica.e2)
  const A = [
    [e1.a, e1.b],
    [e2.a, e2.b],
  ]
  const d = det2(A)
  const sol: Vec2 | null = Math.abs(d) > 1e-9 ? [(e1.c * e2.b - e1.b * e2.c) / d, (e1.a * e2.c - e1.c * e2.a) / d] : null
  // Con det = 0: misma recta si las ecuaciones son proporcionales
  const same = !sol && Math.abs(e1.a * e2.c - e2.a * e1.c) < 1e-9 && Math.abs(e1.b * e2.c - e2.b * e1.c) < 1e-9
  const l1 = linePoints(e1)
  const l2 = linePoints(e2)
  // Coeficientes legibles: 1x -> x, -1x -> -x, 0x desaparece
  const term = (k: number, v: string, first: boolean) => {
    if (k === 0) return ''
    const sign = k < 0 ? '-' : first ? '' : '+'
    const abs = Math.abs(k) === 1 ? '' : fmt(Math.abs(k))
    return `${first ? sign : ` ${sign} `}${abs}${v}`
  }
  const eqTex = (e: Eq) => `${term(e.a, 'x', true)}${term(e.b, 'y', e.a === 0) || ''}${e.a === 0 && e.b === 0 ? '0' : ''} = ${fmt(e.c)}`
  const set = (which: 1 | 2, k: keyof Eq, v: number) => (which === 1 ? setE1({ ...e1, [k]: v }) : setE2({ ...e2, [k]: v }))

  return (
    <VizLayout
      plot={
        <Plane xRange={[-5, 5]} yRange={[-5, 5]} ariaLabel="Dos rectas y su intersección">
          {l1 && <Segment from={l1[0]} to={l1[1]} color="a" dashed={false} width={2.5} />}
          {l2 && <Segment from={l2[0]} to={l2[1]} color="b" dashed={!!same} width={2.5} />}
          {sol && Math.abs(sol[0]) < 5 && Math.abs(sol[1]) < 5 && (
            <>
              <Dot at={sol} color="c" r={6} />
              <Label at={[sol[0] + 0.2, sol[1] + 0.3]} color="c" size={13}>
                ({fmt(sol[0])}, {fmt(sol[1])})
              </Label>
            </>
          )}
        </Plane>
      }
      side={
        <>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(PRESETS).map(([k, p]) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setE1(p.e1)
                  setE2(p.e2)
                }}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:border-brand-500 dark:border-slate-700"
              >
                {p.label}
              </button>
            ))}
          </div>
          {([1, 2] as const).map((w) => {
            const e = w === 1 ? e1 : e2
            return (
              <div key={w} className={`space-y-1 rounded-lg border-l-4 pl-3 ${w === 1 ? 'border-blue-500' : 'border-red-500'}`}>
                <Slider label="a" value={e.a} min={-3} max={3} step={0.5} onChange={(v) => set(w, 'a', v)} />
                <Slider label="b" value={e.b} min={-3} max={3} step={0.5} onChange={(v) => set(w, 'b', v)} />
                <Slider label="c" value={e.c} min={-6} max={6} step={0.5} onChange={(v) => set(w, 'c', v)} />
              </div>
            )
          })}
          <Readout
            items={[
              `\\begin{cases} ${eqTex(e1)} \\\\ ${eqTex(e2)} \\end{cases} \\iff ${texMat(A)}\\begin{bmatrix}x\\\\y\\end{bmatrix} = ${texMat([e1.c, e2.c])}`,
              `\\det A = ${fmt(d)}`,
              sol
                ? `\\text{solución única: } x = ${fmt(sol[0])},\\ y = ${fmt(sol[1])}`
                : same
                  ? '\\text{infinitas soluciones: es la misma recta}'
                  : '\\text{sin solución: rectas paralelas}',
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cada ecuación es una recta; resolver el sistema es encontrar el punto común. Si el determinante es 0, las rectas son
            paralelas (no hay solución) o coinciden (hay infinitas).
          </p>
        </>
      }
    />
  )
}
