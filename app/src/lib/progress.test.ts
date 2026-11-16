import { describe, expect, it } from 'vitest'
import { stages } from '../course/curriculum'
import { migrateLegacy, type StageProgress } from './progress'

const p = (bestScore: number): StageProgress => ({ bestScore, completed: bestScore >= 0.7, updatedAt: '2026-11-15T00:00:00Z' })

describe('migración del progreso antiguo (por número) al nuevo (por slug)', () => {
  it('conserva cada etapa completada bajo su slug', () => {
    const out = migrateLegacy({ '7': p(1), '18': p(0.5), '19': p(0.8) })
    expect(out).toEqual({ vectores: p(1), pca: p(0.5), 'regresion-lineal': p(0.8) })
  })

  it('ignora números que no existían', () => {
    expect(migrateLegacy({ '0': p(1), '42': p(1) })).toEqual({})
  })

  it('todos los slugs antiguos siguen existiendo en el curso', () => {
    const slugs = new Set(stages.map((s) => s.slug))
    const migrated = migrateLegacy(Object.fromEntries(Array.from({ length: 19 }, (_, i) => [String(i + 1), p(1)])))
    expect(Object.keys(migrated)).toHaveLength(19)
    for (const slug of Object.keys(migrated)) expect(slugs.has(slug), slug).toBe(true)
  })
})
