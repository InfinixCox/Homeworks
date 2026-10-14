import { Nodo } from './nodo';
import { RegistroNodo } from './registro-nodo';

export class Arbol {
  raiz: Nodo;

  constructor() {
    this.raiz = new Nodo(
      'raiz',
      'Mis archivos',
      'carpeta',
      '',
      null
    );
  }

  buscarNodo(id: string, nodo: Nodo = this.raiz): Nodo | null {
    if (nodo.id === id) {
      return nodo;
    }

    for (const hijo of nodo.hijos) {
      const encontrado = this.buscarNodo(id, hijo);

      if (encontrado !== null) {
        return encontrado;
      }
    }

    return null;
  }

  agregarNodo(padreId: string, nuevoNodo: Nodo): boolean {
    const padre = this.buscarNodo(padreId);

    if (padre === null) {
      return false;
    }

    return padre.agregarHijo(nuevoNodo);
  }

  cargar(registros: RegistroNodo[]): boolean {
    this.raiz = new Nodo(
      'raiz',
      'Mis archivos',
      'carpeta',
      '',
      null
    );

    const cantidad = this.cargarHijos(this.raiz, registros);

    return cantidad === registros.length;
  }

  private cargarHijos(
    padre: Nodo,
    registros: RegistroNodo[]
  ): number {
    let cantidad = 0;

    for (const registro of registros) {
      if (registro.padreId === padre.id) {
        const hijo = new Nodo(
          registro.id,
          registro.nombre,
          registro.tipo,
          registro.correoCreador,
          registro.padreId
        );

        if (padre.agregarHijo(hijo)) {
          cantidad++;
          cantidad += this.cargarHijos(hijo, registros);
        }
      }
    }

    return cantidad;
  }
}