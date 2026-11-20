import type { Question } from '../../components/quiz/quizEngine'

export const quiz: Question[] = [
  {
    type: 'matrix',
    prompt: 'Escribe el laplaciano $L = D - A$ del grafo con 3 nodos y aristas 1–2 y 2–3 (un camino).',
    answer: [
      [1, -1, 0],
      [-1, 2, -1],
      [0, -1, 1],
    ],
    explanation: 'En la diagonal van los grados (1, 2, 1) y fuera de ella un $-1$ por cada arista.',
  },
  {
    type: 'choice',
    prompt: '¿Cuánto suman siempre las filas de un laplaciano?',
    options: ['1', '0, por eso $L\\mathbf{1} = \\mathbf{0}$ y 0 siempre es valor propio', 'El número de nodos', 'Depende del grafo'],
    answer: 1,
    explanation: 'El grado de cada nodo se compensa con un $-1$ por cada vecino. El vector de unos está en el núcleo de $L$.',
  },
  {
    type: 'numeric',
    prompt: 'Un grafo tiene 10 nodos y su laplaciano tiene 3 valores propios iguales a 0. ¿Cuántas componentes conexas tiene?',
    answer: 3,
    tolerance: 0,
    explanation: 'La multiplicidad del valor propio 0 es el número de componentes: hay un vector constante por cada componente.',
  },
  {
    type: 'numeric',
    prompt: 'Para el camino 1–2–3–4 y $x = (1, 1, -1, -1)$, calcula $x^TLx = \\sum_{(i,j)\\in E}(x_i - x_j)^2$.',
    answer: 4,
    explanation: 'Aristas 1–2: $0$; 2–3: $(1-(-1))^2 = 4$; 3–4: $0$. Solo «cuesta» la arista que cruza entre los dos grupos.',
  },
  {
    type: 'choice',
    prompt: '¿Por qué el laplaciano es semidefinido positivo?',
    options: [
      'Porque es diagonal',
      'Porque $x^TLx = \\sum_{(i,j)\\in E}(x_i - x_j)^2 \\ge 0$ para todo $x$',
      'Porque todos sus elementos son positivos',
    ],
    answer: 1,
    explanation: 'Es una suma de cuadrados, así que nunca es negativa: todos sus valores propios son $\\ge 0$.',
  },
  {
    type: 'choice',
    prompt: '¿Qué es el vector de Fiedler y para qué sirve?',
    options: [
      'El vector de grados del grafo',
      'El vector propio del segundo valor propio más pequeño de $L$; el signo de sus componentes divide el grafo en dos grupos con pocas aristas entre ellos',
      'El vector propio del mayor valor propio',
    ],
    answer: 1,
    explanation: 'Minimiza $x^TLx$ entre los vectores perpendiculares a $\\mathbf{1}$: asigna valores parecidos a nodos conectados. Es la base del clustering espectral.',
  },
  {
    type: 'choice',
    prompt: '¿Por qué el clustering espectral separa bien dos «lunas» entrelazadas y k-means no?',
    options: [
      'Porque usa más iteraciones',
      'Porque agrupa por conexiones en un grafo de vecinos y no por distancia a un centro: los grupos no tienen por qué ser «bolas»',
      'Porque normaliza los datos',
    ],
    answer: 1,
    explanation: 'k-means divide el espacio con fronteras rectas entre centros. El laplaciano del grafo de vecinos sigue la forma de cada grupo.',
  },
  {
    type: 'numeric',
    prompt: 'En un triángulo (3 nodos, todos unidos entre sí), ¿cuántos caminos de longitud 2 van del nodo 1 al nodo 2? Es decir, ¿cuánto vale $(A^2)_{12}$?',
    answer: 1,
    explanation: '$(A^2)_{12} = \\sum_m A_{1m}A_{m2}$: el único nodo intermedio vecino de los dos es el 3 (camino 1 → 3 → 2).',
  },
]
