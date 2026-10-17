import { Nodo } from './nodo';

export class ArbolBinario {
  raiz: Nodo | null;
  recorrido: number[];

  constructor() {
    this.raiz = null;
    this.recorrido = [];
  }

  insertar(valor: number): boolean {
    if (this.buscar(valor)) {
      return false;
    }

    const nuevoNodo = new Nodo(valor);

    if (!this.raiz) {
      this.raiz = nuevoNodo;
      return true;
    }

    let actual = this.raiz;

    while (true) {
      if (valor < actual.valor) {
        if (!actual.izquierda) {
          actual.izquierda = nuevoNodo;
          return true;
        }
        actual = actual.izquierda;
      } else {
        if (!actual.derecha) {
          actual.derecha = nuevoNodo;
          return true;
        }
        actual = actual.derecha;
      }
    }
  }

  buscar(valor: number): boolean {
    let actual = this.raiz;

    while (actual) {
      if (valor === actual.valor) {
        return true;
      }

      if (valor < actual.valor) {
        actual = actual.izquierda;
      } else {
        actual = actual.derecha;
      }
    }

    return false;
  }

  preorden(nodo: Nodo | null): void {
    if (!nodo) return;
    console.log(nodo.valor);
    this.recorrido.push(nodo.valor);
    this.preorden(nodo.izquierda);
    this.preorden(nodo.derecha);
  }

  inorden(nodo: Nodo | null): void {
    if (!nodo) return;
    this.inorden(nodo.izquierda);
    console.log(nodo.valor);
    this.recorrido.push(nodo.valor);
    this.inorden(nodo.derecha);
  }

  postorden(nodo: Nodo | null): void {
    if (!nodo) return;
    this.postorden(nodo.izquierda);
    this.postorden(nodo.derecha);
    console.log(nodo.valor);
    this.recorrido.push(nodo.valor);
  }
}