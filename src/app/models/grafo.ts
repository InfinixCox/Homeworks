import { Cancion } from './cancion';


export class Grafo {
  nodes: Cancion[];
  adjList: { [id: string]: string[] };

  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  addNode(node: Cancion): void {
    if (!this.searchNode(node.titulo)) {
      this.nodes.push(node);
      this.adjList[node.titulo] = [];
    }
  }

  addEdge(id1: string, id2: string): boolean {
    if (!this.searchNode(id1) || !this.searchNode(id2) || id1 === id2) {
      return false;
    }

    if (this.adjList[id1].includes(id2)) {
      return false;
    }

    this.adjList[id1].push(id2);
    this.adjList[id2].push(id1);
    return true;
  }

  searchNode(id: string): Cancion | undefined {
    if (!this.nodes.length) return undefined;
    return this.nodes.find(n => n.titulo === id);
  }

  relacionadas(id: string): Cancion[] {
    const resultado: Cancion[] = [];
    const vecinos = this.adjList[id];

    if (!vecinos) {
      return resultado;
    }

    for (let i = 0; i < vecinos.length; i++) {
      const nodo = this.searchNode(vecinos[i]);

      if (nodo) {
        resultado.push(nodo);
      }
    }

    return resultado;
  }
}
