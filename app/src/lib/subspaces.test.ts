import { describe, expect, it } from 'vitest'
import { columnDirection2, coordsInBasis2, invSmall, matMul, nullDirection2, projectionMatrix, rank2 } from './linalg'

const close = (A: number[][], B: number[][]) => A.forEach((r, i) => r.forEach((v, j) => expect(v).toBeCloseTo(B[i][j])))

describe('subespacios de una 2x2', () => {
  it('rango', () => {
    expect(rank2([[0, 0], [0, 0]])).toBe(0)
    expect(rank2([[1, 2], [2, 4]])).toBe(1)
    expect(rank2([[1, 2], [3, 4]])).toBe(2)
  })
  it('espacio columna y núcleo de una matriz de rango 1', () => {
    const A = [[1, 2], [2, 4]]
    const c = columnDirection2(A)!
    expect(c[1] / c[0]).toBeCloseTo(2) // columnas proporcionales a (1, 2)
    const k = nullDirection2(A)!
    expect(1 * k[0] + 2 * k[1]).toBeCloseTo(0) // A k = 0
    expect(nullDirection2([[1, 2], [3, 4]])).toBeNull()
  })
  it('coordenadas en una base', () => {
    expect(coordsInBasis2([1, 0], [1, 1], [3, 2])).toEqual([1, 2]) // (3,2) = 1·(1,0) + 2·(1,1)
    expect(coordsInBasis2([1, 2], [2, 4], [1, 1])).toBeNull()
  })
})

describe('proyecciones', () => {
  it('inversa por Gauss-Jordan', () => {
    const A3 = [[2, 1, 1], [4, -6, 0], [-2, 7, 2]]
    close(matMul(A3, invSmall(A3)!), [[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    close(matMul([[4, 7], [2, 6]], invSmall([[4, 7], [2, 6]])!), [[1, 0], [0, 1]])
    expect(invSmall([[1, 2], [2, 4]])).toBeNull()
  })
  it('P = B(BᵀB)⁻¹Bᵀ es idempotente y simétrica, y deja el residuo perpendicular', () => {
    const B = [[1, 0], [1, 1], [1, 2]] // columnas: unos y x = (0, 1, 2)
    const P = projectionMatrix(B)!
    close(matMul(P, P), P)
    close(P, P[0].map((_, j) => P.map((r) => r[j])))
    const y = [1, 4, 3]
    const yhat = P.map((r) => r.reduce((s, v, j) => s + v * y[j], 0))
    close([yhat], [[5 / 3, 8 / 3, 11 / 3]])
    const r = y.map((v, i) => v - yhat[i])
    expect(r[0] + r[1] + r[2]).toBeCloseTo(0) // ⟂ columna de unos
    const xs = [0, 1, 2]
    expect(xs.reduce((s, v, i) => s + v * r[i], 0)).toBeCloseTo(0) // ⟂ columna x
  })
  it('proyección sobre una recta', () => {
    close(projectionMatrix([[3], [4]])!, [[9 / 25, 12 / 25], [12 / 25, 16 / 25]])
  })
})
