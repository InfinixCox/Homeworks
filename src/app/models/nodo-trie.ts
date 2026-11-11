import { Producto } from './producto';

// Nodo del Trie (el Node del profesor pasado a clase).
// Cada nodo guarda una letra y un mapa de hijos: letra -> nodo.
export class NodoTrie {
  value: string | null;
  isEndOfWord: boolean;
  children: { [letra: string]: NodoTrie };
  // Solo el nodo donde termina un nombre guarda el producto completo
  producto: Producto | null;

  constructor(value: string | null) {
    this.value = value;
    this.isEndOfWord = false;
    this.children = {};
    this.producto = null;
  }
}
