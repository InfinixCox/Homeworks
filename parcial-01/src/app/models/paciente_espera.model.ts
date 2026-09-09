export interface Paciente {
  id: number;
  nombre: string;
  motivo: string;
  horaLlegada: string;
}


export class NodoSimplePaciente {
  value: Paciente;
  next: NodoSimplePaciente | null = null;

  constructor(value: Paciente) {
    this.value = value;
  }
}


export class ListaSimplePacientes {
  head: NodoSimplePaciente | null = null;
  tail: NodoSimplePaciente | null = null;
  length: number = 0;

  append(paciente: Paciente): void {
    const nuevoNodo = new NodoSimplePaciente(paciente);
    if (!this.head) {
      this.head = nuevoNodo;
      this.tail = nuevoNodo;
    } else {
      if (this.tail) {
        this.tail.next = nuevoNodo;
      }
      this.tail = nuevoNodo;
    }
    this.length++;
  }

  removeHead(): Paciente | null {
    if (!this.head) {
      return null;
    }
    const atendido = this.head.value;
    this.head = this.head.next;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }
    return atendido;
  }
}