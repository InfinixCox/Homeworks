import { Injectable, signal } from '@angular/core';
import { Cancion } from '../models/cancion';
import { Trie } from '../models/trie';
import { MaxHeap } from '../models/max-heap';
import { Grafo } from '../models/grafo';

@Injectable({
  providedIn: 'root',
})
export class Musica {
  private trie = new Trie();
  private heap = new MaxHeap();
  private grafo = new Grafo();

  // Cantidad de canciones del ranking
  private readonly top = 5;

  canciones = signal<Cancion[]>([]);
  ranking = signal<Cancion[]>([]);

  constructor() {
    this.agregar('Quiero Morir En Tu Piel', 'El Gran Combo De New York', 2895565);
    this.agregar('Ni Siquiera', 'Antonio Cartagena', 40143137);
    this.agregar('Extraño Tu Amor', 'Guayacán Orquesta', 4128566);
    this.agregar('Tres Días', "Alexander Abreu y Havana D'Primera", 3680248);
    this.agregar('Corazon Embustero', 'Carlos Nuño y La Grande De Madrid', 3072669);
    this.agregar('Amanecer Así', "Jhonsy de los Angeles y Alex D'gambo", 1035675);
    this.agregar('En Barranquilla Me Quedo', 'Joe Arroyo y La Verdad', 19892756);
    this.agregar('Carro de Fuego', 'Guayacán Orquesta', 271304);
    this.agregar('El Muñeco de la Ciudad', 'Bobby Valentín', 26124386);
    this.agregar('Amiga Mía', 'Michel El Buenón', 209249070);
    this.agregar('Te Amo', 'Son De Cali', 1463810);
    this.agregar("Pa' Bravo Yo", 'Justo Betancourt', 48421987);
    this.agregar('Pasaporte', "Alexander Abreu y Havana D'Primera", 4722086);

    this.conectar('Quiero Morir En Tu Piel', 'Ni Siquiera');
    this.conectar('Ni Siquiera', 'Extraño Tu Amor');
    this.conectar('Extraño Tu Amor', 'Tres Días');
    this.conectar('Tres Días', 'Corazon Embustero');
    this.conectar('Corazon Embustero', 'Amanecer Así');
    this.conectar('Amanecer Así', 'En Barranquilla Me Quedo');
    this.conectar('En Barranquilla Me Quedo', 'Carro de Fuego');
    this.conectar('Carro de Fuego', 'El Muñeco de la Ciudad');
    this.conectar('El Muñeco de la Ciudad', 'Amiga Mía');
    this.conectar('Amiga Mía', 'Te Amo');
    this.conectar('Te Amo', "Pa' Bravo Yo");
    this.conectar("Pa' Bravo Yo", 'Pasaporte');
    this.conectar('Extraño Tu Amor', 'Carro de Fuego');
    this.conectar('Tres Días', 'Pasaporte');
  }

  agregar(titulo: string, artista: string, reproducciones: number): string {
    titulo = titulo.trim();
    artista = artista.trim();

    if (titulo === '') {
      return 'Escribe el título de la canción.';
    }

    if (artista === '') {
      return 'Escribe el artista de la canción.';
    }

    if (reproducciones === null || isNaN(reproducciones) || reproducciones < 0 || !Number.isInteger(reproducciones)) {
      return 'Las reproducciones deben ser un número entero mayor o igual a 0.';
    }

    if (this.trie.search(titulo)) {
      return 'Esa canción ya existe.';
    }

    const cancion: Cancion = { titulo: titulo, artista: artista, reproducciones: reproducciones };
    this.trie.insert(cancion);
    this.heap.push(cancion);
    this.grafo.addNode(cancion);
    this.actualizar();
    return '';
  }

  existe(titulo: string): boolean {
    return this.trie.search(titulo);
  }

  sugerencias(prefijo: string): Cancion[] {
    return this.trie.searchPrefix(prefijo);
  }

  conectar(tituloA: string, tituloB: string): string {
    if (tituloA === '' || tituloB === '') {
      return 'Selecciona las dos canciones.';
    }

    if (tituloA === tituloB) {
      return 'Selecciona dos canciones distintas.';
    }

    if (!this.grafo.addEdge(tituloA, tituloB)) {
      return 'Esas canciones ya están relacionadas.';
    }

    return '';
  }

  relacionadas(titulo: string): Cancion[] {
    return this.grafo.relacionadas(titulo);
  }

  private topK(k: number): Cancion[] {
    const copia = new MaxHeap();
    copia.heap = [...this.heap.heap];

    const resultado: Cancion[] = [];
    while (resultado.length < k && copia.size() > 0) {
      const cancion = copia.pop();
      if (cancion !== undefined) {
        resultado.push(cancion);
      }
    }
    return resultado;
  }

  private actualizar(): void {
    this.canciones.set([...this.grafo.nodes]);
    this.ranking.set(this.topK(this.top));
  }
}
