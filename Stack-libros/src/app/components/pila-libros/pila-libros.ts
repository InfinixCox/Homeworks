import { Component } from '@angular/core';

@Component({
  selector: 'app-pila-libros',
  imports: [],
  templateUrl: './pila-libros.html',
  styleUrl: './pila-libros.css'
})
export class PilaLibros {
  nombre = '';
  isbn = '';
  autor = '';
  editorial = '';
  mensaje = '';

  libros = [
    {
      nombre: 'Libro uno',
      isbn: 'ISBN-001',
      autor: 'Autor uno',
      editorial: 'Editorial uno'
    },
    {
      nombre: 'Libro dos',
      isbn: 'ISBN-002',
      autor: 'Autor dos',
      editorial: 'Editorial dos'
    }
  ];

  librosParaMostrar = this.libros.slice().reverse();

  capturarNombre(evento: any): void {
    this.nombre = evento.target.value;
  }

  capturarIsbn(evento: any): void {
    this.isbn = evento.target.value;
  }

  capturarAutor(evento: any): void {
    this.autor = evento.target.value;
  }

  capturarEditorial(evento: any): void {
    this.editorial = evento.target.value;
  }

  pushLibro(): void {
    if (
      this.nombre === '' ||
      this.isbn === '' ||
      this.autor === '' ||
      this.editorial === ''
    ) {
      this.mensaje = 'Completa todos los datos del libro.';
      return;
    }

    for (let i = 0; i < this.libros.length; i++) {
      if (
        this.libros[i].nombre === this.nombre &&
        this.libros[i].isbn === this.isbn &&
        this.libros[i].autor === this.autor &&
        this.libros[i].editorial === this.editorial
      ) {
        this.mensaje = 'Ese libro ya se encuentra en la pila.';
        return;
      }
    }

    this.libros.push({
      nombre: this.nombre,
      isbn: this.isbn,
      autor: this.autor,
      editorial: this.editorial
    });

    this.librosParaMostrar = this.libros.slice().reverse();

    this.nombre = '';
    this.isbn = '';
    this.autor = '';
    this.editorial = '';

    this.mensaje = 'Libro agregado a la pila.';
  }

  popLibro(): void {
    if (this.libros.length === 0) {
      this.mensaje = 'La pila está vacía.';
      return;
    }

    this.libros.pop();
    this.librosParaMostrar = this.libros.slice().reverse();
    this.mensaje = 'Se retiró el libro de la cima.';
  }
}