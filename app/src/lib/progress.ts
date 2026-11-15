import { useSyncExternalStore } from 'react'

export interface StageProgress {
  /** Mejor puntaje obtenido en el quiz (0–1). */
  bestScore: number
  completed: boolean
  updatedAt: string
}

export type Progress = Record<number, StageProgress>

export const PASS_SCORE = 0.7
const KEY = 'alml-progress-v1'
const listeners = new Set<() => void>()
let cache: Progress | null = null

function read(): Progress {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(KEY)
    cache = raw ? (JSON.parse(raw) as Progress) : {}
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

export function recordQuiz(stageId: number, score: number) {
  const prev = read()[stageId]
  const bestScore = Math.max(prev?.bestScore ?? 0, score)
  write({
    ...read(),
    [stageId]: {
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
