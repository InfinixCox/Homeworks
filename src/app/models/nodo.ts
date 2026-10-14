export class Nodo {
  id: string;
  nombre: string;
  tipo: string;
  correoCreador: string;
  padreId: string | null;
  hijos: Nodo[];

  constructor(
    id: string,
    nombre: string,
    tipo: string,
    correoCreador: string,
    padreId: string | null
  ) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.correoCreador = correoCreador;
    this.padreId = padreId;
    this.hijos = [];
  }

  agregarHijo(nodo: Nodo): boolean {
    if (this.tipo !== 'carpeta') {
      return false;
    }

    nodo.padreId = this.id;
    this.hijos.push(nodo);

    return true;
  }
}