import { useState } from 'react'
import { det2, eig2, fmt, inv2, matVec, type Mat, type Vec2 } from '../../lib/linalg'
import { MatrixInput2, Readout, Slider, VizLayout, texMat } from './controls'
import { Arrow, Handle, Plane, Polygon, Polyline } from './plane'

export const TRANSFORM_PRESETS: Record<string, { label: string; m: Mat }> = {
  identidad: { label: 'Identidad', m: [[1, 0], [0, 1]] },
  escala: { label: 'Escala', m: [[2, 0], [0, 0.5]] },
  rotacion: { label: 'Rotación 45°', m: [[0.71, -0.71], [0.71, 0.71]] },
  cizalla: { label: 'Cizalla', m: [[1, 1], [0, 1]] },
  reflexion: { label: 'Reflexión', m: [[1, 0], [0, -1]] },
  simetrica: { label: 'Simétrica', m: [[2, 1], [1, 2]] },
  singular: { label: 'Singular (rango 1)', m: [[1, 2], [0.5, 1]] },
  ejemplo: { label: '[[1,2],[3,4]]', m: [[1, 2], [3, 4]] },
}

const lerp = (a: Mat, b: Mat, t: number): Mat => a.map((r, i) => r.map((v, j) => v + (b[i][j] - v) * t))

/**
 * Una matriz 2x2 como transformación del plano: las columnas son a dónde van î y ĵ.
 * Muestra la cuadrícula transformada, el área (determinante), un vector v → Av y opcionalmente
 * los vectores propios o la inversa.
 */
export function MatrixTransform2D({
  initial = 'cizalla',
  presets = ['identidad', 'escala', 'rotacion', 'cizalla', 'reflexion', 'singular'],
  showDet = true,
  showVector = true,
  showEigen = false,
  showInverse = false,
}: {
  initial?: string
  presets?: string[]
  showDet?: boolean
  showVector?: boolean
  showEigen?: boolean
  showInverse?: boolean
}) {
  const [M, setM] = useState<Mat>(TRANSFORM_PRESETS[initial]?.m ?? TRANSFORM_PRESETS.cizalla.m)
  const [t, setT] = useState(1)
  const [v, setV] = useState<Vec2>([1, 1])
  const [inverse, setInverse] = useState(false)
  const I: Mat = [[1, 0], [0, 1]]
  const Minv = inv2(M)
  // Con la inversa, la animación parte de A y vuelve a la identidad: A⁻¹ deshace lo que hizo A
  const A = inverse && Minv ? lerp(M, I, t) : lerp(I, M, t)
  const T = (p: Vec2) => matVec(A, p) as Vec2
  const d = det2(M)
  const eig = showEigen ? eig2(M) : null

  const gridLines: Vec2[][] = []
  for (let k = -6; k <= 6; k++) {
    gridLines.push([T([k, -6]), T([k, 6])])
    gridLines.push([T([-6, k]), T([6, k])])
  }
  const Av = matVec(M, v) as Vec2

  return (
    <VizLayout
      plot={
        <Plane xRange={[-5, 5]} yRange={[-5, 5]} ariaLabel="Transformación lineal del plano">
          {gridLines.map((l, i) => (
            <Polyline key={i} points={l} color="muted" width={0.8} />
          ))}
          <Polygon points={[T([0, 0]), T([1, 0]), T([1, 1]), T([0, 1])]} color="d" opacity={0.25} />
          {eig &&
            eig.vectors.map((e, i) => (
              <Polyline key={i} points={[[-e[0] * 10, -e[1] * 10], [e[0] * 10, e[1] * 10]]} color="c" width={1.5} dashed />
            ))}
          <Arrow to={T([1, 0])} color="a" label="î" />
          <Arrow to={T([0, 1])} color="b" label="ĵ" />
          {showVector && (
            <>
              <Arrow to={v} color="muted" label="v" width={2} />
              {t === 1 && !inverse && <Arrow to={Av} color="c" label="Av" />}
              {inverse && <Arrow to={Av} color="c" label="Av" dashed width={1.5} />}
              <Handle at={v} onChange={setV} color="muted" label="Vector v" />
            </>
          )}
        </Plane>
      }
      side={
        <>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setM(TRANSFORM_PRESETS[k].m)
                  setInverse(false)
                }}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:border-brand-500 dark:border-slate-700"
              >
                {TRANSFORM_PRESETS[k].label}
              </button>
            ))}
          </div>
          <MatrixInput2 value={M} onChange={setM} />
          <Slider label="animación t" value={t} min={0} max={1} step={0.05} onChange={setT} />
          {showInverse && (
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={inverse} disabled={!Minv} onChange={(e) => setInverse(e.target.checked)} />
              Aplicar después la inversa <span className="font-mono">A⁻¹</span>
            </label>
          )}
          <Readout
            items={[
              `A = ${texMat(M)}`,
              showVector && `A v = ${texMat(M)}${texMat(v)} = ${texMat(Av)}`,
              showDet && `\\det(A) = ${fmt(M[0][0])}\\cdot${fmt(M[1][1])} - ${fmt(M[0][1])}\\cdot${fmt(M[1][0])} = \\mathbf{${fmt(d)}}`,
              showInverse && (Minv ? `A^{-1} = ${texMat(Minv)}` : 'A^{-1}\\ \\text{no existe } (\\det A = 0)'),
              eig &&
                `\\lambda_1 = ${fmt(eig.values[0])},\\ v_1 = ${texMat(eig.vectors[0])};\\quad \\lambda_2 = ${fmt(eig.values[1])},\\ v_2 = ${texMat(eig.vectors[1])}`,
              showEigen && !eig && '\\text{Valores propios complejos: ninguna dirección real se conserva}',
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            La 1.ª columna de A es a dónde va î (azul); la 2.ª, a dónde va ĵ (rojo). El cuadrado unidad (naranja) se convierte en un
            paralelogramo de área |det A|{d < 0 ? '; el signo negativo indica que el plano se dio la vuelta (orientación invertida)' : ''}
            {Math.abs(d) < 1e-9 ? '. Con det = 0 el plano colapsa a una recta: la matriz no es invertible y su rango es 1' : ''}.
            {showEigen && ' Las rectas verdes discontinuas son las direcciones propias: los vectores sobre ellas solo se estiran.'}
          </p>
        </>
      }
    />
  )
}

