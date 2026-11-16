import { describe, expect, it } from 'vitest'
import { project3 } from './view3d'

describe('project3', () => {
  it('sin giro: x a la derecha, z hacia arriba, y en profundidad', () => {
    expect(project3([1, 0, 0], 0, 0)).toMatchObject({ x: 1, y: 0 })
    expect(project3([0, 0, 1], 0, 0)).toMatchObject({ x: 0, y: 1 })
    expect(project3([0, 1, 0], 0, 0).depth).toBeCloseTo(1)
  })
  it('un giro de 90° lleva el eje x al eje y', () => {
    const p = project3([1, 0, 0], 90, 0)
    expect(p.x).toBeCloseTo(0)
    expect(p.depth).toBeCloseTo(1)
  })
  it('conserva las longitudes en el plano de la pantalla cuando el punto no tiene profundidad', () => {
    const p = project3([3, 0, 4], 0, 30)
    expect(Math.hypot(p.x, p.y, p.depth)).toBeCloseTo(5)
  })
})
