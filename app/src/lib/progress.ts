import { useSyncExternalStore } from 'react'

export interface StageProgress {
  /** Mejor puntaje obtenido en el quiz (0–1). */
  bestScore: number
  completed: boolean
  updatedAt: string
}

/** Progreso por etapa, indexado por slug (identidad estable de la etapa). */
export type Progress = Record<string, StageProgress>

export const PASS_SCORE = 0.7
const KEY = 'alml-progress-v2'
/** Versión anterior: indexada por el número de etapa del temario original de 19 etapas. */
const LEGACY_KEY = 'alml-progress-v1'
const LEGACY_SLUGS = [
  'introduccion',
  'algebra-lineal-y-ml',
  'ejemplos-en-ml',
  'arrays-numpy',
  'indexado-slicing-reshape',
  'broadcasting',
  'vectores',
  'normas',
  'matrices',
  'tipos-de-matrices',
  'operaciones-matriciales',
  'matrices-dispersas',
  'tensores',
  'descomposiciones',
  'eigendescomposicion',
  'svd',
  'estadistica-multivariada',
  'pca',
  'regresion-lineal',
]

/** Convierte el progreso antiguo ({ "7": … }) al nuevo ({ "vectores": … }). */
export function migrateLegacy(legacy: Record<string, StageProgress>): Progress {
  const out: Progress = {}
  for (const [num, p] of Object.entries(legacy)) {
    const slug = LEGACY_SLUGS[Number(num) - 1]
    if (slug) out[slug] = p
  }
  return out
}

const listeners = new Set<() => void>()
let cache: Progress | null = null

function read(): Progress {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      cache = JSON.parse(raw) as Progress
    } else {
      const legacy = localStorage.getItem(LEGACY_KEY)
      cache = legacy ? migrateLegacy(JSON.parse(legacy)) : {}
      if (legacy) {
        localStorage.setItem(KEY, JSON.stringify(cache))
        localStorage.removeItem(LEGACY_KEY)
      }
    }
  } catch {
    cache = {}
  }
  return cache
}

function write(next: Progress) {
  cache = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* almacenamiento no disponible: el progreso vive solo en memoria */
  }
  listeners.forEach((l) => l())
}

export function recordQuiz(slug: string, score: number) {
  const prev = read()[slug]
  const bestScore = Math.max(prev?.bestScore ?? 0, score)
  write({
    ...read(),
    [slug]: {
      bestScore,
      completed: bestScore >= PASS_SCORE,
      updatedAt: new Date().toISOString(),
    },
  })
}

export function resetProgress() {
  write({})
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, read, () => ({}))
}
