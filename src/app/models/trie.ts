import { NodoTrie } from './nodo-trie';
import { Cancion } from './cancion';

export class Trie {
  root: NodoTrie;

  constructor() {
    this.root = new NodoTrie(null);
  }

  insert(cancion: Cancion): void {
    let current = this.root;
    for (let character of this.normalizar(cancion.titulo)) {
      if (current.children[character] === undefined) {
        current.children[character] = new NodoTrie(character);
      }
      current = current.children[character];
    }
    current.isEndOfWord = true;
    current.cancion = cancion;
  }

  search(word: string): boolean {
    let current = this.root;
    for (let character of this.normalizar(word)) {
      if (current.children[character] === undefined) {
        return false;
      }
      current = current.children[character];
    }
    return current.isEndOfWord;
  }

  searchPrefix(prefix: string): Cancion[] {
    let current = this.root;
    for (let character of this.normalizar(prefix)) {
      if (current.children[character] === undefined) {
        return [];
      }
      current = current.children[character];
    }
    const resultado: Cancion[] = [];
    this.recolectar(current, resultado);
    return resultado;
  }

  private recolectar(nodo: NodoTrie, resultado: Cancion[]): void {
    if (nodo.isEndOfWord && nodo.cancion !== null) {
      resultado.push(nodo.cancion);
    }
    for (let letra in nodo.children) {
      this.recolectar(nodo.children[letra], resultado);
    }
  }

  private normalizar(texto: string): string {
    return texto.trim().toLowerCase();
  }
}
