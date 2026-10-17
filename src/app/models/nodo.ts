export class Nodo {
  valor: number;
  izquierda: Nodo | null;
  derecha: Nodo | null;

  constructor(valor: number) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }

  isLeaf(): boolean {
    if (this.izquierda === null && this.derecha === null) {
      return true;
    } else {
      return false;
    }
  }
}