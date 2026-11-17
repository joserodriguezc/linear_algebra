# El club de karate de Zachary: el vector de Fiedler predice la división real del club
import networkx as nx
import numpy as np

G = nx.karate_club_graph()
L = nx.laplacian_matrix(G).toarray().astype(float)
valores, vectores = np.linalg.eigh(L)
fiedler = vectores[:, 1]
prediccion = fiedler > 0
real = np.array([G.nodes[v]["club"] == "Mr. Hi" for v in G.nodes])
aciertos = max(np.mean(prediccion == real), np.mean(prediccion != real))   # el signo es arbitrario
print("nodos:", G.number_of_nodes(), " aristas:", G.number_of_edges())
print(f"λ₂ = {valores[1]:.3f}   acierto del vector de Fiedler: {aciertos:.0%}")
