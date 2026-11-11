import { NodoGrafo } from './nodo-grafo';

export class Grafo {
  nodes: NodoGrafo[];
  adjList: { [id: string]: string[] };

  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  addNode(node: NodoGrafo): void {
    if (!this.searchNode(node.id)) {
      this.nodes.push(node);
      this.adjList[node.id] = [];
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

  searchNode(id: string): NodoGrafo | undefined {
    if (!this.nodes.length) return undefined;
    return this.nodes.find(n => n.id === id);
  }

  printAdjacency(id: string): string[] {
    if (!this.searchNode(id)) {
      return [];
    }

    console.log(this.adjList[id]);
    return this.adjList[id];
  }

  isEmpty(): boolean {
    return this.nodes.length === 0;
  }

  removeNode(id: string): boolean {
    if (!this.searchNode(id)) {
      return false;
    }

    const vecinos = this.adjList[id];

    for (let i = 0; i < vecinos.length; i++) {
      const lista = this.adjList[vecinos[i]];
      this.adjList[vecinos[i]] = lista.filter(v => v !== id);
    }

    delete this.adjList[id];
    this.nodes = this.nodes.filter(n => n.id !== id);
    return true;
  }

  printGraph(): void {
    console.log(this.adjList);
  }

  personasDeCiudad(ciudadId: string): NodoGrafo[] {
    const personas: NodoGrafo[] = [];
    const vecinos = this.adjList[ciudadId];

    if (!vecinos) {
      return personas;
    }

    for (let i = 0; i < vecinos.length; i++) {
      const nodo = this.searchNode(vecinos[i]);

      if (nodo && nodo.tipo === 'persona') {
        personas.push(nodo);
      }
    }

    return personas;
  }
}
