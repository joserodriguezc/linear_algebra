import { useState } from 'react'
import { columnDirection2, fmt, matVec, normL2, nullDirection2, rank2, type Mat, type Vec2 } from '../../lib/linalg'
import { texMat } from '../../lib/tex'
import { MatrixInput2, Readout, VizLayout } from './controls'
import { Arrow, Dot, Handle, Plane, Polygon, Segment } from './plane'

const PRESETS: Record<string, { label: string; m: Mat }> = {
  r2: { label: 'Rango 2', m: [[2, 1], [1, 3]] },
  r1: { label: 'Rango 1', m: [[1, 2], [0.5, 1]] },
  r0: { label: 'Matriz cero', m: [[0, 0], [0, 0]] },
}

/** Espacio columna (lo que A puede producir) y núcleo (lo que A aplasta a 0). */
export function ColumnNullSpace2D() {
  const [A, setA] = useState<Mat>(PRESETS.r1.m)
  const [x, setX] = useState<Vec2>([2, -1])
  const r = rank2(A)
  const col = columnDirection2(A)
  const ker = nullDirection2(A)
  const Ax = matVec(A, x) as Vec2
  const toZero = normL2(Ax) < 1e-6 && normL2(x) > 1e-6
  const long = (d: Vec2): [Vec2, Vec2] => [[-d[0] * 20, -d[1] * 20], [d[0] * 20, d[1] * 20]]

  return (
    <VizLayout
      plot={
        <Plane xRange={[-5, 5]} yRange={[-5, 5]} ariaLabel="Espacio columna y núcleo de una matriz 2x2">
          {r === 2 && <Polygon points={[[-5, -5], [5, -5], [5, 5], [-5, 5]]} color="c" opacity={0.06} stroke={false} />}
          {r === 0 && <Polygon points={[[-5, -5], [5, -5], [5, 5], [-5, 5]]} color="b" opacity={0.06} stroke={false} />}
          {col && <Segment from={long(col)[0]} to={long(col)[1]} color="c" dashed={false} width={5} />}
          {ker && <Segment from={long(ker)[0]} to={long(ker)[1]} color="b" dashed={false} width={5} />}
          <Dot at={[0, 0]} color={r === 2 ? 'b' : 'muted'} r={5} />
          <Arrow to={x} color="a" label="x" />
          <Arrow to={Ax} color="d" label="Ax" width={3} />
          <Handle at={x} onChange={setX} color="a" snap={0.25} label="Vector x" />
        </Plane>
      }
      side={
        <>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(PRESETS).map(([k, p]) => (
              <button
                key={k}
                type="button"
                onClick={() => setA(p.m)}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:border-brand-500 dark:border-slate-700"
              >
                {p.label}
              </button>
            ))}
          </div>
          <MatrixInput2 value={A} onChange={setA} />
          <Readout
            items={[
              `A x = ${texMat(A)}${texMat(x)} = ${texMat(Ax)}`,
              `\\operatorname{rank}(A) = ${r},\\quad \\dim\\ker(A) = ${2 - r},\\quad ${r} + ${2 - r} = 2`,
            ]}
          />
          <ul className="space-y-1 text-sm">
            <li>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Espacio columna (verde):</span>{' '}
              {r === 2 ? 'todo el plano' : r === 1 ? 'una recta' : 'solo el origen'}
            </li>
            <li>
              <span className="font-semibold text-red-600 dark:text-red-400">Núcleo (rojo):</span>{' '}
              {r === 2 ? 'solo el vector cero' : r === 1 ? 'una recta' : 'todo el plano'}
            </li>
          </ul>
          {toZero && (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              x está en el núcleo: A lo envía al vector cero ({fmt(Ax[0])}, {fmt(Ax[1])}).
            </p>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Arrastra x: Ax (naranja) siempre cae en el espacio columna. Con rango 1, coloca x sobre la recta roja y verás que Ax se
            anula. Lo que se pierde en el núcleo es la dimensión que le falta al espacio columna: rango + nulidad = 2.
          </p>
        </>
      }
    />
  )
}
