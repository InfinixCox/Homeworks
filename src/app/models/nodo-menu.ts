export class NodoMenu {
  titulo: string;
  enlace: string;
  componente: any;
  hijos: NodoMenu[];

  constructor(titulo: string, enlace: string, componente: any) {
    this.titulo = titulo;
    this.enlace = enlace;
    this.componente = componente;
    this.hijos = [];
  }

  agregarHijo(nodo: NodoMenu): void {
    this.hijos.push(nodo);
  }
}