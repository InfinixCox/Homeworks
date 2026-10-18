export class Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  realizada: boolean;
  creadorUid: string;
  creadorCorreo: string;

  constructor(
    id: string,
    titulo: string,
    descripcion: string,
    realizada: boolean,
    creadorUid: string,
    creadorCorreo: string
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.realizada = realizada;
    this.creadorUid = creadorUid;
    this.creadorCorreo = creadorCorreo;
  }
}