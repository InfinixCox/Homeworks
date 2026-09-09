export interface Medico {
  id: number;
  nombre: string;
  especialidad: string;
}

export class NodoCircularMedico {
  value: Medico;
  next: NodoCircularMedico | null = null;

  constructor(value: Medico) {
    this.value = value;
  }
}

export class ListaCircularMedicos {
  head: NodoCircularMedico | null = null;
  tail: NodoCircularMedico | null = null;
  length: number = 0;

  append(medico: Medico): void {
    const nuevoNodo = new NodoCircularMedico(medico);

    if (!this.head) {
      this.head = nuevoNodo;
      this.tail = nuevoNodo;
      nuevoNodo.next = this.head;
    } else {
      if (this.tail) {
        this.tail.next = nuevoNodo;
        nuevoNodo.next = this.head;
      }
      this.tail = nuevoNodo;
    }
    this.length++;
  }
}