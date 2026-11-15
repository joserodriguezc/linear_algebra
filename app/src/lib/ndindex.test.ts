import { describe, expect, it } from 'vitest'
import { evalIndex, formatNested, gather, sliceIndices } from './ndindex'

const data = [
  [11, 22, 33],
  [44, 55, 66],
  [77, 88, 99],
]
const get = ([i, j]: number[]) => data[i][j]

describe('sliceIndices (semántica de Python)', () => {
  it('casos habituales', () => {
    expect(sliceIndices(null, null, null, 5)).toEqual([0, 1, 2, 3, 4])
    expect(sliceIndices(null, -1, null, 5)).toEqual([0, 1, 2, 3])
    expect(sliceIndices(-2, null, null, 5)).toEqual([3, 4])
    expect(sliceIndices(null, null, -1, 4)).toEqual([3, 2, 1, 0])
    expect(sliceIndices(1, 100, 2, 5)).toEqual([1, 3])
    expect(sliceIndices(10, null, null, 5)).toEqual([])
  })
})

describe('evalIndex', () => {
  it('separa entradas X y salida y', () => {
    const X = evalIndex('data[:, :-1]', [3, 3])
    expect(X.resultShape).toEqual([3, 2])
    expect(gather(X, get)).toEqual([
      [11, 22],
      [44, 55],
      [77, 88],
    ])
    const y = evalIndex('data[:, -1]', [3, 3])
    expect(y.resultShape).toEqual([3])
    expect(gather(y, get)).toEqual([33, 66, 99])
  })
  it('enteros y filas', () => {
    expect(gather(evalIndex('data[0, 0]', [3, 3]), get)).toBe(11)
    expect(gather(evalIndex('data[-1]', [3, 3]), get)).toEqual([77, 88, 99])
    expect(evalIndex('data[0]', [3, 3]).resultShape).toEqual([3])
  })
  it('errores al estilo NumPy', () => {
    expect(() => evalIndex('data[3, 0]', [3, 3])).toThrow(/out of bounds for axis 0 with size 3/)
    expect(() => evalIndex('data[0, 0, 0]', [3, 3])).toThrow(/too many indices/)
    expect(() => evalIndex('data[a]', [3, 3])).toThrow()
    expect(() => evalIndex('data', [3, 3])).toThrow()
  })
  it('formato de salida', () => {
    expect(formatNested([1, 2, 3])).toBe('[1 2 3]')
    expect(formatNested([[1, 2], [3, 4]])).toBe('[[1 2]\n [3 4]]')
  })
})
