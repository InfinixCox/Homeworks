export interface AtencionHistorial {
  id: number;
  pacienteNombre: string;
  medicoNombre: string;
  horaAtencion: string;
}


export class NodoDobleHistorial {
  value: AtencionHistorial;
  next: NodoDobleHistorial | null = null;
  prev: NodoDobleHistorial | null = null;

  constructor(value: AtencionHistorial) {
    this.value = value;
  }
}


export class ListaDobleHistorial {
  head: NodoDobleHistorial | null = null;
  tail: NodoDobleHistorial | null = null;
  length: number = 0;

  append(atencion: AtencionHistorial): void {
    const nuevoNodo = new NodoDobleHistorial(atencion);
    if (!this.head) {
      this.head = nuevoNodo;
      this.tail = nuevoNodo;
    } else {
      if (this.tail) {
        this.tail.next = nuevoNodo;
        nuevoNodo.prev = this.tail;
      }
      this.tail = nuevoNodo;
    }
    this.length++;
  }
}