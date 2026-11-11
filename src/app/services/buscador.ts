import { Injectable, signal } from '@angular/core';
import { Trie } from '../models/trie';
import { MinHeap } from '../models/min-heap';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class Buscador {
  private trie = new Trie();

  // Lista de productos guardados para mostrar en pantalla
  productos = signal<Producto[]>([]);
  totalNodos = signal(0);

  constructor() {
    // Ejemplo del enunciado
    this.insert('air max', 90);
    this.insert('air force', 95);
    this.insert('air jordan', 85);
    this.insert('adidas boost', 80);
    // Datos extra para tener prefijos con más de K resultados
    this.insert('air zoom', 70);
    this.insert('adidas superstar', 88);
    this.insert('adidas samba', 92);
    this.insert('asics gel', 65);
    this.insert('nike dunk', 87);
    this.insert('nike cortez', 60);
    this.insert('new balance 550', 83);
    this.insert('puma suede', 58);
  }

  // Guarda un producto en el Trie. Devuelve un texto de error o ''.
  insert(name: string, popularity: number): string {
    if (name.trim() === '') {
      return 'Escribe el nombre del producto.';
    }
    if (popularity === null || isNaN(popularity) || popularity < 0 || popularity > 100) {
      return 'La popularidad debe ser un número entre 0 y 100.';
    }
    this.trie.insert({ name: name, popularity: popularity });
    this.actualizarLista();
    return '';
  }

  // true si ya hay un producto con ese nombre
  existe(name: string): boolean {
    return this.trie.search(name);
  }

  // Método del enunciado: los K productos más populares que empiezan por el prefijo
  searchTopK(prefix: string, k: number): Producto[] {
    // 1. El Trie devuelve todas las coincidencias del prefijo
    const coincidencias = this.trie.searchPrefix(prefix);

    // 2. MinHeap de tamaño K: si se pasa de K se saca el menos popular (la raíz)
    const heap = new MinHeap();
    for (let i = 0; i < coincidencias.length; i++) {
      heap.push(coincidencias[i]);
      if (heap.size() > k) {
        heap.pop();
      }
    }

    // 3. pop() saca de menor a mayor; con unshift queda de mayor a menor
    const topK: Producto[] = [];
    while (heap.size() > 0) {
      const producto = heap.pop();
      if (producto !== undefined) {
        topK.unshift(producto);
      }
    }
    return topK;
  }

  private actualizarLista(): void {
    this.productos.set(this.trie.todos());
    this.totalNodos.set(this.trie.contarNodos());
  }
}
