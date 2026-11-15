import { describe, expect, it } from 'vitest'
import { detectNotation, glossary, NOTATION_RULE_COUNT } from './notation'

const meanings = (tex: string) => detectNotation(tex).map((n) => n.meaning)
const symbols = (tex: string) => detectNotation(tex).map((n) => n.tex)

describe('detectNotation', () => {
  it('ℝⁿ se explica como vectores de números reales', () => {
    const m = meanings('v \\in \\mathbb{R}^n')
    expect(m.some((x) => x.includes('vectores con n componentes') && x.includes('números reales'))).toBe(true)
    expect(m.some((x) => x.includes('pertenece a'))).toBe(true)
  })

  it('ℝ^{m×n} se explica como matrices de números reales', () => {
    const m = meanings('A \\in \\mathbb{R}^{m\\times n}')
    expect(m.some((x) => x.includes('matrices de tamaño m × n') && x.includes('números reales'))).toBe(true)
  })

  it('ℝ con tres dimensiones se explica como tensores', () => {
    const m = meanings('T \\in \\mathbb{R}^{n_1\\times n_2\\times n_3}')
    expect(m.some((x) => x.includes('tensores de tamaño n1 × n2 × n3'))).toBe(true)
    // no repite la entrada de ℝ a secas
    expect(m.filter((x) => x.includes('números reales')).length).toBe(1)
  })

  it('distingue Hadamard (\\circ) de grados (^\\circ)', () => {
    expect(symbols('a \\circ b')).toContain('\\circ')
    expect(symbols('\\theta = 90^\\circ')).not.toContain('\\circ')
  })

  it('normas, valor absoluto, sumatoria, transpuesta e inversa', () => {
    const s = symbols('\\|v\\|_1 = \\sum_{i=1}^{n} |v_i|,\\ A^T,\\ A^{-1}')
    expect(s).toEqual(expect.arrayContaining(['\\|v\\|', '\\sum', '|x|', 'A^T', 'A^{-1}']))
  })

  it('no detecta \\le dentro de \\left ni \\in dentro de \\infty', () => {
    expect(symbols('\\left(x\\right)')).not.toContain('\\le')
    expect(symbols('\\infty')).not.toContain('\\in')
  })

  it('símbolos de factorizaciones', () => {
    const s = symbols('A = Q\\Lambda Q^{-1},\\ Av = \\lambda v,\\ A = U\\Sigma V^T,\\ \\sigma_1,\\ A^+ = V\\Sigma^+U^T,\\ A \\approx A_k')
    expect(s).toEqual(expect.arrayContaining(['\\Lambda', '\\lambda', '\\Sigma', '\\sigma', 'A^+', '\\approx']))
    // \neq no debe confundirse con \nearrow ni \ne dentro de otra palabra
    expect(symbols('a \\neq b')).toContain('\\neq')
    expect(symbols('a \\ne b')).toContain('\\neq')
  })

  it('símbolos de estadística y regresión', () => {
    const s = symbols('\\mathbb{E}[X] = \\mu,\\ \\operatorname{Var}(x),\\ \\operatorname{cov}(x, y),\\ \\bar{x},\\ \\rho,\\ \\hat{y},\\ \\arg\\min_b')
    expect(s).toEqual(expect.arrayContaining(['\\mathbb{E}', '\\mu', '\\operatorname{Var}', '\\operatorname{cov}', '\\bar{x}', '\\rho', '\\hat{y}', '\\arg\\min']))
    // 𝔼 no se confunde con ℝ
    expect(meanings('\\mathbb{E}[X]').some((m) => m.includes('números reales'))).toBe(false)
    // \min dentro de \arg\min no se explica dos veces
    expect(symbols('\\arg\\min_b f')).toContain('\\arg\\min')
    expect(symbols('\\arg\\min_b f')).not.toContain('\\min')
    expect(symbols('\\arg\\max_q f')).toContain('\\arg\\max')
    expect(symbols('\\arg\\max_q f')).not.toContain('\\max')
    expect(symbols('\\min(m, n)')).toContain('\\min')
  })

  it('devuelve en orden de aparición y sin duplicados', () => {
    const s = symbols('\\sum_i a_i \\le \\sum_j b_j')
    expect(s[0]).toBe('\\sum')
    expect(s.filter((x) => x === '\\sum').length).toBe(1)
  })
})


describe('glosario de la página de referencia', () => {
  it('incluye una entrada por cada regla de notación', () => {
    expect(glossary().length).toBe(NOTATION_RULE_COUNT)
  })
})
