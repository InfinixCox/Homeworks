import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Buscador } from '../../services/buscador';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-buscador-productos',
  imports: [FormsModule],
  templateUrl: './buscador-productos.html',
  styleUrl: './buscador-productos.scss',
})
export class BuscadorProductos {
  buscador = inject(Buscador);

  // Formulario para agregar
  nombre = signal('');
  popularidad = signal<number | null>(null);
  error = signal('');
  exito = signal('');

  // Búsqueda
  prefijo = signal('air');
  k = signal(3);
  errorK = signal('');
  resultado = signal<Producto[]>([]);

  constructor() {
    this.buscar();
  }

  agregar(): void {
    this.exito.set('');
    const nombre = this.nombre();
    const popularidad = this.popularidad();
    const yaExistia = this.buscador.existe(nombre);
    const mensaje = this.buscador.insert(nombre, popularidad === null ? NaN : popularidad);
    this.error.set(mensaje);
    if (mensaje === '') {
      const texto = nombre.trim().toLowerCase();
      this.exito.set(
        yaExistia
          ? `"${texto}" ya existía: se actualizó su popularidad a ${popularidad}.`
          : `"${texto}" se guardó en el Trie.`
      );
      this.nombre.set('');
      this.popularidad.set(null);
      this.buscar();
    }
  }

  cambiarPrefijo(valor: string): void {
    this.prefijo.set(valor);
    this.buscar();
  }

  cambiarK(valor: number): void {
    this.k.set(valor);
    this.buscar();
  }

  buscar(): void {
    const k = this.k();
    if (k === null || isNaN(k) || k < 1 || !Number.isInteger(k)) {
      this.errorK.set('K debe ser un número entero mayor que 0.');
      return;
    }
    this.errorK.set('');
    this.resultado.set(this.buscador.searchTopK(this.prefijo(), k));
  }
}
