import { useState } from 'react'
import { MatrixGrid } from './MatrixGrid'
import { Segmented, Slider } from './controls'

/** vstack apila filas (mismo número de columnas); hstack concatena (mismo número de filas). */
export function StackVisualizer() {
  const [mode, setMode] = useState<'vstack' | 'hstack'>('vstack')
  const [n1, setN1] = useState(3)
  const [n2, setN2] = useState(3)
  const a1 = Array.from({ length: n1 }, (_, i) => i + 1)
  const a2 = Array.from({ length: n2 }, (_, i) => n1 + i + 1)
  const ok = mode === 'hstack' || n1 === n2

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { value: 'vstack', label: 'vstack((a1, a2))' },
            { value: 'hstack', label: 'hstack((a1, a2))' },
          ]}
        />
      </div>
      <div className="grid max-w-md gap-2">
        <Slider label="len(a1)" value={n1} min={1} max={5} step={1} onChange={setN1} />
        <Slider label="len(a2)" value={n2} min={1} max={5} step={1} onChange={setN2} />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div className="space-y-2">
          <MatrixGrid values={[a1]} digits={0} tone={() => 'a'} label={<span className="font-mono text-xs">a1</span>} />
          <MatrixGrid values={[a2]} digits={0} tone={() => 'b'} label={<span className="font-mono text-xs">a2</span>} />
        </div>
        <span className="text-2xl text-slate-400">→</span>
        {!ok ? (
          <pre className="max-w-xs whitespace-pre-wrap font-mono text-sm text-red-600 dark:text-red-400">
            ValueError: all the input array dimensions except for the concatenation axis must match exactly
          </pre>
        ) : mode === 'vstack' ? (
          <MatrixGrid
            values={[a1, a2]}
            digits={0}
            tone={(i) => (i === 0 ? 'a' : 'b')}
            label={<span className="font-mono text-xs">shape = (2, {n1})</span>}
          />
        ) : (
          <MatrixGrid
            values={[[...a1, ...a2]]}
            digits={0}
            tone={(_, j) => (j < n1 ? 'a' : 'b')}
            label={<span className="font-mono text-xs">shape = ({n1 + n2},)</span>}
          />
        )}
      </div>
    </div>
  )
}
