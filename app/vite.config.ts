import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { defineConfig } from 'vite'

export default defineConfig({
  // Rutas relativas: la app funciona en GitHub Pages (/linear_algebra/) y en cualquier otra subruta.
  // Con HashRouter, la URL de la página nunca cambia, así que './' siempre apunta a la raíz de la app.
  base: './',
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex],
        providerImportSource: undefined,
      }),
    },
    react({ include: /\.(mdx|tsx|ts)$/ }),
    tailwindcss(),
  ],
})
