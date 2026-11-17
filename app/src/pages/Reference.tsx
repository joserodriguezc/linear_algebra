import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tex } from '../components/lesson/Tex'
import { stageBySlug } from '../course/curriculum'
import { glossary } from '../lib/notation'

/** Letras griegas frecuentes en ML y su uso habitual. */
const GREEK: [string, string, string][] = [
  ['\\alpha', 'alfa', 'tasa de aprendizaje; fuerza de la regularización'],
  ['\\beta', 'beta', 'coeficientes de un modelo de regresión'],
  ['\\gamma', 'gamma', 'parámetro de kernels (SVM); factor de descuento (aprendizaje por refuerzo)'],
  ['\\delta,\\ \\Delta', 'delta', 'cambio o diferencia pequeña; error en retropropagación'],
  ['\\varepsilon', 'épsilon', 'error o ruido aleatorio; cantidad muy pequeña'],
  ['\\eta', 'eta', 'tasa de aprendizaje'],
  ['\\theta', 'theta', 'parámetros de un modelo; ángulo'],
  ['\\lambda,\\ \\Lambda', 'lambda', 'valor propio (Λ: matriz diagonal de valores propios); regularización'],
  ['\\mu', 'mu', 'media'],
  ['\\pi', 'pi', '3.14159…; también una política (aprendizaje por refuerzo)'],
  ['\\rho', 'rho', 'correlación'],
  ['\\sigma,\\ \\Sigma', 'sigma', 'desviación estándar; valor singular (Σ: covarianza o matriz de valores singulares; ∑: sumatoria)'],
  ['\\phi', 'phi', 'función de transformación de características'],
  ['\\omega', 'omega', 'pesos; frecuencia'],
]


/** Hoja de referencia de NumPy, agrupada por tema. */
const CHEATSHEET: { title: string; stage: string[]; rows: [string, string][] }[] = [
  {
    title: 'Crear arrays',
    stage: ['arrays-numpy', 'indexado-slicing-reshape'],
    rows: [
      ['array([[1, 2], [3, 4]])', 'desde listas'],
      ['zeros((3, 5)), ones(5), empty((3, 3))', 'rellenos con ceros, unos o sin inicializar'],
      ['arange(12).reshape(3, 4)', 'rango y cambio de forma'],
      ['vstack((a, b)), hstack((a, b))', 'apilar y concatenar'],
      ['X[:, :-1], X[:, -1]', 'separar entradas y salida'],
    ],
  },
  {
    title: 'Vectores',
    stage: ['vectores', 'normas'],
    rows: [
      ['a + b, a - b, a * b, a / b', 'aritmética elemento a elemento'],
      ['a @ b  o  a.dot(b)', 'producto punto'],
      ['s * a', 'multiplicar por un escalar'],
      ['norm(a, 1), norm(a), norm(a, inf)', 'normas L¹, L² y máxima (from numpy.linalg import norm)'],
    ],
  },
  {
    title: 'Matrices',
    stage: ['matrices', 'tipos-de-matrices'],
    rows: [
      ['A + B, A * B', 'suma y producto de Hadamard'],
      ['A @ B, A @ v', 'producto matricial y matriz-vector'],
      ['tril(M), triu(M), diag(M), identity(n)', 'triangulares, diagonal e identidad'],
    ],
  },
  {
    title: 'Operaciones',
    stage: ['operaciones-matriciales'],
    rows: [
      ['A.T', 'transpuesta'],
      ['inv(A), det(A), trace(A), matrix_rank(A)', 'inversa, determinante, traza, rango'],
      ['solve(A, b)', 'resolver Ax = b (mejor que inv(A) @ b)'],
    ],
  },
  {
    title: 'Bases, subespacios y proyecciones',
    stage: ['independencia-lineal', 'proyecciones-ortogonales'],
    rows: [
      ['matrix_rank(A)', 'rango: número de columnas linealmente independientes'],
      ['Matrix(A).rref(), .nullspace(), .columnspace()', 'forma escalonada, núcleo y espacio columna exactos (SymPy)'],
      ['null_space(A), orth(A)', 'bases ortonormales del núcleo y del espacio columna (scipy.linalg)'],
      ['solve(B, x)', 'coordenadas de x en la base formada por las columnas de B'],
      ['B @ inv(B.T @ B) @ B.T  /  Q @ Q.T', 'matriz de proyección sobre el espacio columna de B (o de Q ortonormal)'],
    ],
  },
  {
    title: 'Dispersas y tensores',
    stage: ['matrices-dispersas', 'tensores'],
    rows: [
      ['csr_matrix(A), S.todense()', 'de denso a CSR y de vuelta (scipy.sparse)'],
      ['1 - count_nonzero(A) / A.size', 'dispersión'],
      ['tensordot(a, b, axes=0)', 'producto tensorial'],
    ],
  },
  {
    title: 'Factorización',
    stage: ['descomposiciones', 'eigendescomposicion', 'svd'],
    rows: [
      ['P, L, U = lu(A)', 'LU (scipy.linalg)'],
      ['Q, R = qr(A), L = cholesky(A)', 'QR y Cholesky'],
      ['values, vectors = eig(A)  /  eigh(S)', 'eigendescomposición (eigh si S es simétrica)'],
      ['U, s, VT = svd(A), pinv(A)', 'SVD y pseudoinversa'],
      ["norm(A, 'fro' | 2 | 'nuc')", 'normas de Frobenius, espectral y nuclear'],
      ['cond(A)', 'número de condición: σ máximo / σ mínimo'],
    ],
  },
  {
    title: 'Convolución y grafos',
    stage: ['convolucion', 'grafos-laplaciano'],
    rows: [
      ["convolve(x, k, mode='same')", 'convolución 1D (NumPy)'],
      ['toeplitz(c, r), circulant(c)', 'matrices de Toeplitz y circulante (scipy.linalg)'],
      ["convolve2d(X, K, mode='valid'), correlate2d(X, K)", 'convolución y correlación 2D (scipy.signal)'],
      ['nx.laplacian_matrix(G).toarray()', 'laplaciano L = D − A de un grafo (networkx)'],
      ['SpectralClustering(k, affinity=\'nearest_neighbors\')', 'clustering espectral (sklearn.cluster)'],
    ],
  },
  {
    title: 'Estadística y regresión',
    stage: ['estadistica-multivariada', 'pca', 'regresion-lineal'],
    rows: [
      ['mean(X, axis=0), var(v, ddof=1), std(v, ddof=1)', 'media por columnas, varianza y desviación muestrales'],
      ['cov(X.T), corrcoef(x, y)', 'matriz de covarianza y correlación'],
      ['PCA(k).fit_transform(X)', 'PCA (sklearn.decomposition)'],
      ['b, *_ = lstsq(X, y, rcond=None)', 'mínimos cuadrados'],
    ],
  },
]

export function Reference() {
  const [q, setQ] = useState('')
  const all = useMemo(() => glossary(), [])
  const norm = (t: string) => t.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
  const items = q ? all.filter((g) => norm(g.meaning + ' ' + g.tex).includes(norm(q))) : all

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Notación y NumPy</h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
        Material de consulta rápida: el significado de cada símbolo, las letras griegas habituales en ML y las funciones de NumPy usadas en el curso.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Símbolos matemáticos</h2>
        <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
          Los mismos significados que aparecen bajo cada fórmula del curso, en el bloque «Notación».
        </p>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar (p. ej. norma, inversa, reales…)"
          aria-label="Buscar en el glosario"
          className="mb-4 w-full max-w-sm rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {items.map((g) => (
            <div key={g.tex} className="flex items-baseline gap-3 rounded-lg border border-slate-100 px-3 py-2 dark:border-slate-800">
              <dt className="w-20 shrink-0 text-center">
                <Tex>{g.tex}</Tex>
              </dt>
              <dd className="text-sm text-slate-600 dark:text-slate-300">{g.meaning}</dd>
            </div>
          ))}
          {items.length === 0 && <p className="text-sm text-slate-500">Sin resultados.</p>}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Alfabeto griego en machine learning</h2>
        <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
          El significado depende del contexto: estos son los usos más habituales.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {GREEK.map(([tex, name, use]) => (
                <tr key={name} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="w-24 py-1.5 text-center">
                    <Tex>{tex}</Tex>
                  </td>
                  <td className="w-20 py-1.5 font-medium">{name}</td>
                  <td className="py-1.5 text-slate-600 dark:text-slate-300">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Hoja de referencia de NumPy</h2>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Supone <code className="font-mono">from numpy import *</code> y <code className="font-mono">from numpy.linalg import *</code>{' '}
          salvo que se indique otra librería.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {CHEATSHEET.map((g) => (
            <div key={g.title} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">{g.title}</h3>
                <span className="flex gap-1 text-xs">
                  {g.stage.map((slug) => (
                    <Link key={slug} to={`/etapa/${slug}`} className="rounded bg-slate-100 px-1.5 py-0.5 hover:bg-brand-50 dark:bg-slate-800" title={stageBySlug(slug).title}>
                      etapa {stageBySlug(slug).n}
                    </Link>
                  ))}
                </span>
              </div>
              <ul className="space-y-1.5">
                {g.rows.map(([code, what]) => (
                  <li key={code} className="text-sm">
                    <code className="block font-mono text-[12.5px] text-brand-700 dark:text-brand-100">{code}</code>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{what}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
