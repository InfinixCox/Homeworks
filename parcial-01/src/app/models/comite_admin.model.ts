export interface MiembroComite {
  id: number;
  nombre: string;
  cargo: string;
}

export class NodoCircularDobleComite {
  value: MiembroComite;
  next: NodoCircularDobleComite | null = null;
  prev: NodoCircularDobleComite | null = null;

  constructor(value: MiembroComite) {
    this.value = value;
  }
}

export class ListaCircularDobleComite {
  head: NodoCircularDobleComite | null = null;
  tail: NodoCircularDobleComite | null = null;
  length: number = 0;

  append(miembro: MiembroComite): void {
    const nuevoNodo = new NodoCircularDobleComite(miembro);

    if (!this.head) {
      this.head = nuevoNodo;
      this.tail = nuevoNodo;
      nuevoNodo.next = this.head;
      nuevoNodo.prev = this.tail;
    } else {
      if (this.tail) {
        this.tail.next = nuevoNodo;
        nuevoNodo.prev = this.tail;
        nuevoNodo.next = this.head;
        this.head.prev = nuevoNodo;
      }
      this.tail = nuevoNodo;
    }
    this.length++;
  }
}