// Nodo del Trie (el Node del profesor pasado a clase).
// Cada nodo guarda su letra (value) y un mapa de hijos: letra -> nodo.
export class NodoTrie {
  value: string | null;
  isEndOfWord: boolean;
  children: { [letra: string]: NodoTrie };
  // Solo tiene sentido en el nodo donde termina un nombre
  popularity: number;

  constructor(value: string | null) {
    this.value = value;
    this.isEndOfWord = false;
    this.children = {};
    this.popularity = 0;
  }
}
