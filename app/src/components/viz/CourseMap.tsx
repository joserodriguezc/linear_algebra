import { useState } from 'react'
import { Link } from 'react-router-dom'
import { stages } from '../../course/curriculum'

const AREAS: { key: string; title: string; why: string; stages: number[] }[] = [
  {
    key: 'notacion',
    title: 'Notación',
    why: 'Leer las fórmulas de los artículos, libros y documentación de ML.',
    stages: [4, 7, 9, 13],
  },
  {
    key: 'aritmetica',
    title: 'Aritmética',
    why: 'Sumar, multiplicar y transformar vectores, matrices y tensores: lo que hace un modelo al predecir.',
    stages: [5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    key: 'estadistica',
    title: 'Estadística',
    why: 'Media, varianza y covarianza escritas como operaciones con matrices; base de PCA.',
    stages: [17, 18],
  },
  {
    key: 'factorizacion',
    title: 'Factorización',
    why: 'Descomponer matrices (LU, QR, eigen, SVD) para resolver, comprimir y reducir dimensiones.',
    stages: [14, 15, 16],
  },
  {
    key: 'minimos',
    title: 'Mínimos cuadrados',
    why: 'Ajustar modelos a datos: la regresión lineal y todo lo que se construye sobre ella.',
    stages: [19],
  },
]

/** Mapa del curso: las cinco áreas del álgebra lineal que importan en ML y las etapas que las cubren. */
export function CourseMap() {
  const [active, setActive] = useState('aritmetica')
  const area = AREAS.find((a) => a.key === active)!
  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-5">
        {AREAS.map((a) => (
          <button
            key={a.key}
            type="button"
            onClick={() => setActive(a.key)}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
              a.key === active ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100' : 'border-slate-200 hover:border-brand-500 dark:border-slate-700'
            }`}
          >
            {a.title}
          </button>
        ))}
      </div>
      <p className="text-sm">{area.why}</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {area.stages.map((id) => {
          const s = stages.find((x) => x.id === id)!
          return (
            <li key={id}>
              <Link to={`/etapa/${s.slug}`} className="block rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-brand-500 dark:border-slate-700">
                <span className="font-mono text-xs text-slate-400">Etapa {s.id}</span>
                <span className="block font-medium">{s.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
