import { expect, test, type Page } from '@playwright/test'
import { readdirSync } from 'node:fs'

/** Número de etapas del curso = número de MDX en src/course/stages. */
const STAGE_COUNT = readdirSync(new URL('../src/course/stages', import.meta.url)).filter((f) => f.endsWith('.mdx')).length

function trackErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  return errors
}

test('todas las etapas cargan sin errores', async ({ page }) => {
  test.setTimeout(5 * 60_000)
  const errors = trackErrors(page)
  await page.goto('/')
  const hrefs = await page.locator('a[href^="#/etapa/"]').evaluateAll((as) =>
    [...new Set(as.map((a) => a.getAttribute('href')!))],
  )
  expect(hrefs.length).toBe(STAGE_COUNT)
  for (const href of hrefs) {
    await page.goto(`/${href}`)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.getByText('Cargando etapa…')).toHaveCount(0, { timeout: 20_000 })
    // Revela todos los pasos de los ejemplos resueltos y comprueba que no hay LaTeX mal formado
    // Cada botón desaparece al pulsarlo: se pulsa siempre el primero que quede (puede haber varios ejemplos)
    const reveal = page.getByRole('button', { name: 'Mostrar todo' })
    while ((await reveal.count()) > 0) await reveal.first().click()
    const bad = await page.locator('.katex-error').allTextContents()
    expect(bad, `LaTeX con errores en ${href}`).toEqual([])
  }
  await page.goto('/#/referencia')
  await expect(page.getByRole('heading', { name: 'Notación y NumPy' })).toBeVisible()
  await page.getByLabel('Buscar en el glosario').fill('reales')
  await expect(page.locator('dd', { hasText: 'números reales' }).first()).toBeVisible()
  expect(errors).toEqual([])
})

test('se navega entre etapas sin recargar (menú lateral, siguiente y anterior)', async ({ page }) => {
  const errors = trackErrors(page)
  await page.goto('/#/etapa/vectores')
  await expect(page.locator('main h1')).toHaveText('Vectores y aritmética vectorial')

  // Menú lateral
  await page.locator('aside a', { hasText: 'Normas vectoriales' }).click()
  await expect(page).toHaveURL(/#\/etapa\/normas$/)
  await expect(page.locator('main h1')).toHaveText('Normas vectoriales')
  await expect(page.locator('article')).toContainText('Bolas unidad')

  // Botón «siguiente» al pie
  await page.getByRole('link', { name: /Etapa 9 →/ }).click()
  await expect(page.locator('main h1')).toHaveText('Matrices y aritmética matricial')
  await expect(page.locator('article')).toContainText('El producto matricial celda a celda')

  // Botón «anterior» y el índice «En esta etapa» se reconstruye
  await page.getByRole('link', { name: /← Etapa 8/ }).click()
  await expect(page.locator('main h1')).toHaveText('Normas vectoriales')
  await expect(page.locator('aside').getByText('Formalización')).toBeVisible()

  // Desde la página de inicio
  await page.getByRole('link', { name: 'Curso', exact: true }).click()
  await page.locator('main a', { hasText: 'Tensores y aritmética tensorial' }).click()
  await expect(page.locator('main h1')).toHaveText('Tensores y aritmética tensorial')
  expect(errors).toEqual([])
})

test('migra el progreso guardado con la versión anterior (por número de etapa)', async ({ page }) => {
  await page.addInitScript(() => {
    if (localStorage.getItem('alml-progress-v2')) return
    const done = { bestScore: 1, completed: true, updatedAt: '2026-11-15T00:00:00Z' }
    localStorage.setItem('alml-progress-v1', JSON.stringify({ '7': done, '18': done }))
  })
  await page.goto('/')
  // «Vectores» y «PCA» aparecen completadas con su nuevo identificador (slug)
  await expect(page.locator('main a', { hasText: 'Vectores y aritmética vectorial' })).toContainText('✓')
  await expect(page.locator('main a', { hasText: 'Análisis de componentes principales' })).toContainText('✓')
  await expect(page.getByText(/2\/\d+ etapas/)).toBeVisible()
  const stored = await page.evaluate(() => [localStorage.getItem('alml-progress-v1'), Object.keys(JSON.parse(localStorage.getItem('alml-progress-v2')!))])
  expect(stored).toEqual([null, ['vectores', 'pca']])
})

test('una celda de Python se ejecuta con NumPy', async ({ page }) => {
  await page.goto('/#/etapa/vectores')
  const cell = page.locator('figure', { hasText: 'Producto punto: tres formas' })
  await cell.getByRole('button', { name: /Ejecutar/ }).click()
  await expect(cell.locator('pre', { hasText: /^14$/m })).toHaveCount(3, { timeout: 90_000 })
  await expect(cell).not.toContainText('Error')
})

test('el progreso del quiz se guarda', async ({ page }) => {
  await page.goto('/#/etapa/vectores')
  const quiz = page.locator('ol', { has: page.getByText('Calcula el producto punto') })
  await quiz.locator('li').first().getByRole('textbox').fill('2')
  await page.getByRole('button', { name: /Comprobar respuestas/ }).click()
  await expect(page.getByText(/Resultado: 14%/)).toBeVisible()
  await page.reload()
  await expect(page.getByText(/Mejor puntaje: 14%/)).toBeVisible()
})
