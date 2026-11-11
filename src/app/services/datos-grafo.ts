import { Injectable, signal } from '@angular/core';
import { Grafo } from '../models/grafo';
import { NodoGrafo } from '../models/nodo-grafo';

@Injectable({
  providedIn: 'root',
})
export class DatosGrafo {
  grafo = new Grafo();
  version = signal(0);

  private contadorCiudades = 0;
  private contadorPersonas = 0;

  constructor() {
    this.agregarCiudad('Cali');
    this.agregarCiudad('Bogotá');
    this.agregarCiudad('Medellín');

    this.agregarPersona('Juan', 20, 'c1');
    this.agregarPersona('Laura', 22, 'c1');
    this.agregarPersona('Andrés', 25, 'c1');
    this.agregarPersona('Sofía', 21, 'c2');
    this.agregarPersona('Camilo', 24, 'c2');
    this.agregarPersona('Valentina', 19, 'c3');
    this.agregarPersona('Mateo', 23, 'c3');

    this.agregarAmistad('p1', 'p2');
    this.agregarAmistad('p1', 'p4');
    this.agregarAmistad('p3', 'p6');
    this.agregarAmistad('p5', 'p7');
  }

  private actualizar(): void {
    this.version.update(v => v + 1);
  }

  agregarCiudad(nombre: string): string {
    nombre = nombre.trim();

    if (nombre === '') {
      return 'Escribe el nombre de la ciudad.';
    }

    const ciudades = this.ciudades();

    for (let i = 0; i < ciudades.length; i++) {
      if (ciudades[i].nombre.toLowerCase() === nombre.toLowerCase()) {
        return 'Esa ciudad ya existe.';
      }
    }

    this.contadorCiudades++;
    this.grafo.addNode({ id: 'c' + this.contadorCiudades, tipo: 'ciudad', nombre: nombre });
    this.actualizar();
    return '';
  }

  agregarPersona(nombre: string, edad: number, ciudadId: string): string {
    nombre = nombre.trim();

    if (nombre === '') {
      return 'Escribe el nombre de la persona.';
    }

    if (!edad || edad <= 0) {
      return 'La edad debe ser un número mayor que 0.';
    }

    const ciudad = this.grafo.searchNode(ciudadId);

    if (!ciudad || ciudad.tipo !== 'ciudad') {
      return 'Selecciona la ciudad donde vive.';
    }

    this.contadorPersonas++;
    const id = 'p' + this.contadorPersonas;

    this.grafo.addNode({ id: id, tipo: 'persona', nombre: nombre, edad: edad, ciudadId: ciudadId });
    this.grafo.addEdge(id, ciudadId);
    this.actualizar();
    return '';
  }

  agregarAmistad(idA: string, idB: string): string {
    if (idA === '' || idB === '') {
      return 'Selecciona las dos personas.';
    }

    if (idA === idB) {
      return 'Selecciona dos personas distintas.';
    }

    if (!this.grafo.addEdge(idA, idB)) {
      return 'Esas personas ya son amigas.';
    }

    this.actualizar();
    return '';
  }

  eliminar(id: string): string {
    if (id === '') {
      return 'Selecciona el nodo que quieres eliminar.';
    }

    const nodo = this.grafo.searchNode(id);

    if (!nodo) {
      return 'Ese nodo no existe.';
    }

    if (nodo.tipo === 'ciudad' && this.personasDeCiudad(id).length > 0) {
      return 'No puedes eliminar una ciudad donde todavía vive gente.';
    }

    this.grafo.removeNode(id);
    this.actualizar();
    return '';
  }

  ciudades(): NodoGrafo[] {
    return this.grafo.nodes.filter(n => n.tipo === 'ciudad');
  }

  personas(): NodoGrafo[] {
    return this.grafo.nodes.filter(n => n.tipo === 'persona');
  }

  personasDeCiudad(ciudadId: string): NodoGrafo[] {
    return this.grafo.personasDeCiudad(ciudadId);
  }

  conexiones(id: string): NodoGrafo[] {
    const ids = this.grafo.adjList[id] ?? [];
    const vecinos: NodoGrafo[] = [];

    for (let i = 0; i < ids.length; i++) {
      const nodo = this.grafo.searchNode(ids[i]);

      if (nodo) {
        vecinos.push(nodo);
      }
    }

    return vecinos;
  }

  imprimirConexiones(id: string): void {
    this.grafo.printAdjacency(id);
  }

  imprimir(): void {
    this.grafo.printGraph();
  }
}
