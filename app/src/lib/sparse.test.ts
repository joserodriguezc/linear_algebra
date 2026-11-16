import { describe, expect, it } from 'vitest'
import { toCSR } from './sparse'

describe('toCSR', () => {
  it('coincide con scipy.sparse.csr_matrix en el ejemplo de la etapa 12', () => {
    const { data, indices, indptr } = toCSR([
      [1, 0, 0, 1, 0, 0],
      [0, 0, 2, 0, 0, 1],
      [0, 0, 0, 2, 0, 0],
    ])
    expect(data).toEqual([1, 1, 2, 1, 2])
    expect(indices).toEqual([0, 3, 2, 5, 3])
    expect(indptr).toEqual([0, 2, 4, 5])
  })

  it('maneja filas vacías y recuerda el origen de cada valor', () => {
    const { data, indices, indptr, owner } = toCSR([
      [0, 5],
      [0, 0],
      [3, 0],
    ])
    expect(data).toEqual([5, 3])
    expect(indices).toEqual([1, 0])
    expect(indptr).toEqual([0, 1, 1, 2])
    expect(owner).toEqual([
      [0, 1],
      [2, 0],
    ])
  })
})
