import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Musica } from '../../services/musica';
import { Cancion } from '../../models/cancion';

@Component({
  selector: 'app-buscador-canciones',
  imports: [FormsModule],
  templateUrl: './buscador-canciones.html',
  styleUrl: './buscador-canciones.scss',
})
export class BuscadorCanciones {
  musica = inject(Musica);

  // Formulario para insertar
  titulo = signal('');
  artista = signal('');
  reproducciones = signal<number | null>(null);
  error = signal('');
  exito = signal('');

  // Buscador
  texto = signal('');
  sugerencias = signal<Cancion[]>([]);
  resultado = signal('');
  encontrada = signal(false);

  agregar(): void {
    this.exito.set('');
    const titulo = this.titulo().trim();
    const reproducciones = this.reproducciones();
    const mensaje = this.musica.agregar(titulo, this.artista(), reproducciones === null ? NaN : reproducciones);
    this.error.set(mensaje);

    if (mensaje === '') {
      this.exito.set(`"${titulo}" se agregó al catálogo.`);
      this.titulo.set('');
      this.artista.set('');
      this.reproducciones.set(null);
      this.cambiarTexto(this.texto());
    }
  }

  cambiarTexto(valor: string): void {
    this.texto.set(valor);
    this.resultado.set('');
    this.sugerencias.set(valor.trim() === '' ? [] : this.musica.sugerencias(valor));
  }

  buscar(): void {
    const texto = this.texto().trim();

    if (texto === '') {
      this.encontrada.set(false);
      this.resultado.set('Escribe el título que quieres buscar.');
      return;
    }

    const existe = this.musica.existe(texto);
    this.encontrada.set(existe);
    this.resultado.set(existe ? `"${texto}" sí existe.` : `"${texto}" no existe.`);
  }
}
