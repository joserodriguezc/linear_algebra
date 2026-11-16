import { describe, expect, it } from 'vitest'
import { broadcastShapes } from './broadcast'

describe('broadcastShapes (regla de NumPy)', () => {
  it('formas compatibles', () => {
    expect(broadcastShapes([2, 3], []).shape).toEqual([2, 3]) // escalar
    expect(broadcastShapes([2, 3], [3]).shape).toEqual([2, 3])
    expect(broadcastShapes([2, 3], [2, 1]).shape).toEqual([2, 3])
    expect(broadcastShapes([4, 1], [1, 5]).shape).toEqual([4, 5])
    expect(broadcastShapes([1, 3], [1]).shape).toEqual([1, 3])
  })

  it('formas incompatibles', () => {
    expect(broadcastShapes([2, 3], [2]).shape).toBeNull()
    expect(broadcastShapes([2, 3], [4]).shape).toBeNull()
  })

  it('informa de cada dimensión comparada desde la derecha', () => {
    const { checks } = broadcastShapes([2, 3], [2])
    expect(checks).toEqual([
      { a: 2, b: undefined, ok: true },
      { a: 3, b: 2, ok: false },
    ])
  })
})
