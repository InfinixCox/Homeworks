import { Cancion } from './cancion';

export class NodoTrie {
  value: string | null;
  isEndOfWord: boolean;
  children: { [letra: string]: NodoTrie };
  cancion: Cancion | null;

  constructor(value: string | null) {
    this.value = value;
    this.isEndOfWord = false;
    this.children = {};
    this.cancion = null;
  }
}
