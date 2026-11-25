import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Giphy } from '../../services/giphy';

@Component({
  selector: 'app-buscador-gifs',
  imports: [FormsModule],
  templateUrl: './buscador-gifs.html',
  styleUrl: './buscador-gifs.scss',
})
export class BuscadorGifs {
  giphy = inject(Giphy);

  texto = signal('');

  cambiarTexto(valor: string): void {
    this.texto.set(valor);
    this.giphy.buscar(valor);
  }
}
