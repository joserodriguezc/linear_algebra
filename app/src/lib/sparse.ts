/** Convierte una matriz densa al formato CSR (data, indices, indptr) y recuerda de qué celda viene cada valor. */
export function toCSR(M: number[][]) {
  const data: number[] = []
  const indices: number[] = []
  const indptr: number[] = [0]
  const owner: [number, number][] = []
  M.forEach((row, i) => {
    row.forEach((v, j) => {
      if (v !== 0) {
        data.push(v)
        indices.push(j)
        owner.push([i, j])
      }
    })
    indptr.push(data.length)
  })
  return { data, indices, indptr, owner }
}
