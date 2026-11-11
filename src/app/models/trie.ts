import { NodoTrie } from './nodo-trie';
import { Producto } from './producto';

export class Trie {
  root: NodoTrie;

  constructor() {
    // La raíz no representa ninguna letra
    this.root = new NodoTrie(null);
  }

  // Igual al insert del profesor: se recorre letra por letra y se crean
  // los nodos que falten. Al final se marca isEndOfWord y se guarda el producto.
  // Devuelve true si el nombre era nuevo y false si ya existía (se actualiza).
  insert(producto: Producto): boolean {
    const word = this.normalizar(producto.name);
    let current = this.root;
    for (let character of word) {
      if (current.children[character] === undefined) {
        current.children[character] = new NodoTrie(character);
      }
      current = current.children[character];
    }
    const esNuevo = !current.isEndOfWord;
    current.isEndOfWord = true;
    current.producto = { name: word, popularity: producto.popularity };
    return esNuevo;
  }

  // Igual al search del profesor: true solo si la palabra completa existe
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

  // Busca por prefijo: baja hasta el nodo del prefijo (como en search)
  // y desde ahí junta todos los productos que hay debajo.
  searchPrefix(prefix: string): Producto[] {
    let current = this.root;
    for (let character of this.normalizar(prefix)) {
      if (current.children[character] === undefined) {
        return [];
      }
      current = current.children[character];
    }
    const resultado: Producto[] = [];
    this.recolectar(current, resultado);
    return resultado;
  }

  // Recorrido recursivo por los hijos (como en los árboles)
  private recolectar(nodo: NodoTrie, resultado: Producto[]): void {
    if (nodo.isEndOfWord && nodo.producto !== null) {
      resultado.push(nodo.producto);
    }
    for (let letra in nodo.children) {
      this.recolectar(nodo.children[letra], resultado);
    }
  }

  // Todos los productos guardados (prefijo vacío)
  todos(): Producto[] {
    return this.searchPrefix('');
  }

  // Cantidad de nodos sin contar la raíz
  contarNodos(nodo: NodoTrie = this.root): number {
    let total = 0;
    for (let letra in nodo.children) {
      total = total + 1 + this.contarNodos(nodo.children[letra]);
    }
    return total;
  }

  isEmpty(): boolean {
    return Object.keys(this.root.children).length === 0;
  }

  // "Air Max " y "air max" se guardan y se buscan igual
  private normalizar(texto: string): string {
    return texto.trim().toLowerCase();
  }
}
