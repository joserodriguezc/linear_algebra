import { describe, expect, it } from 'vitest'
import { circulantMatrix, conv2dValid, convolve1d, eigSym, matMul, matVec, toeplitzMatrix, transpose } from './linalg'

const close = (a: number[], b: number[]) => a.forEach((v, i) => expect(v).toBeCloseTo(b[i]))

describe('convolución 1D', () => {
  const x = [2, 4, 6, 5, 1]
  const k = [0.25, 0.5, 0.25]
  it('coincide con np.convolve(x, k, "same")', () => {
    close(convolve1d(x, k), [2, 4, 5.25, 4.25, 1.75])
  })
  it('es el producto por una matriz de Toeplitz', () => {
    const T = toeplitzMatrix(k, 5)
    close(matVec(T, x), convolve1d(x, k))
    // diagonales constantes
    for (let i = 1; i < 5; i++) for (let j = 1; j < 5; j++) expect(T[i][j]).toBe(T[i - 1][j - 1])
  })
  it('la circular es el producto por una matriz circulante', () => {
    const C = circulantMatrix(k, 5)
    close(matVec(C, x), convolve1d(x, k, true))
    close(convolve1d(x, k, true), [2.25, 4, 5.25, 4.25, 2.25]) // = np.convolve sobre la señal envuelta
  })
  it('un filtro no simétrico (diferencias) respeta el orden de np.convolve', () => {
    close(convolve1d([1, 2, 4, 7], [1, -1, 0]), [1, 2, 3, -7]) // = np.convolve(x, k, 'same'): y_i = x_{i+1} − x_i
  })
  it('la convolución circular conmuta con el desplazamiento (equivariancia)', () => {
    const C = circulantMatrix(k, 5)
    const S = circulantMatrix([0, 0, 1], 5) // desplazamiento circular: (Sx)_i = x_{i−1}
    const CS = matMul(C, S)
    const SC = matMul(S, C)
    CS.forEach((r, i) => close(r, SC[i]))
  })
})

describe('convolución 2D', () => {
  it('modo válido como en las CNN', () => {
    const img = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    expect(conv2dValid(img, [[1, 0], [0, -1]])).toEqual([
      [-4, -4],
      [-4, -4],
    ])
  })
})

describe('eigSym (Jacobi)', () => {
  it('laplaciano del camino de 4 nodos: 0, 2−√2, 2, 2+√2', () => {
    const L = [
      [1, -1, 0, 0],
      [-1, 2, -1, 0],
      [0, -1, 2, -1],
      [0, 0, -1, 1],
    ]
    const { values, vectors } = eigSym(L)
    close(values, [0, 2 - Math.SQRT2, 2, 2 + Math.SQRT2])
    // Q es ortogonal y L Q = Q Λ
    const QtQ = matMul(transpose(vectors), vectors)
    QtQ.forEach((r, i) => close(r, r.map((_, j) => (i === j ? 1 : 0))))
    const LQ = matMul(L, vectors)
    LQ.forEach((r, i) => close(r, r.map((_, j) => vectors[i][j] * values[j])))
  })
  it('matriz 2x2 conocida', () => {
    close(eigSym([[2, 1], [1, 2]]).values, [1, 3])
  })
})
